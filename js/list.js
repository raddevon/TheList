var currentList;

function setItemText(list, index, text) {
    if (!list.item[index]) {
        list.item[index] = {};
    }
    list.item[index].itemText = text;
}

function makeNewItem(count) {
    var item = $('<li class="new"><form action=""><input type="text" /></form></li>');

    count = count || 1;

    for (var i = 0; i < count; i++) {
        if ($('.list li').length === 0 && $('.list li').first().val()) {
            item.clone().prependTo($('.list ul')).removeClass('new');
        } else {
            $('.list li').css('top', $('.list li').outerHeight());
            item.clone().prependTo($('.list ul')).removeClass('new');
            $('.list li').css('top', 0);
        }
    }
}

function removeItem(index) {
    currentList.item.splice(index, 1);
    $('.list li').eq(index).remove();
}

// newItem plugin allows an element to create new items in the list
(function( $ ){
    $.fn.newItem = function() {
        $(this).bind('click', function() {
            makeNewItem();
            currentList.item.unshift('');
            $('.list ul').find('li').eq(0).find('input').focus();
        });
    };
})( jQuery );

// Bind input change with a 5s delay
$('.list ul, .detail-column form').on('input propertychange', 'input, textarea', function () {
    var currentItem = $(this);
    // If it's the propertychange event, make sure it's the value that changed.
    if (window.event && event.type == 'propertychange' && event.propertyName != 'value')
        return;

    // Clear any previously set timer before setting a fresh one
    window.clearTimeout($(this).data('timeout'));
    $(this).data('timeout', setTimeout(function () {
        var currentIndex = $(this).data('index') || $(this).parent().parent().index(),
            currentValue = $('.list li ').eq(currentIndex).find('input').val(),
            details = $('#details').val() || null;
        setItemText(currentList, currentIndex, currentValue);
        currentList.item[currentIndex].details = details;
        currentList.save();
    }, 5000));
});

// On blur, save the list item and its details. Hide the details textarea and show the intro
$('.list ul, .detail-column form').on('blur', 'input, textarea', function () {
    var currentIndex = $(this).data('index') || $(this).parent().parent().index(),
        currentValue = $('.list li ').eq(currentIndex).find('input').val(),
        details = $('#details').val() || null;


    if (!currentValue && currentList.item.length > 1) {
        removeItem(currentIndex);
    } else {
        setItemText(currentList, currentIndex, currentValue);
        currentList.item[currentIndex].details = details;
    }
    currentList.save();
});

// Save the list before the user leaves the page
$(window).on('beforeunload', function() {
    currentList.save();
});

$('.list ul').on('activated', 'li', function() {
    var currentIndex = $(this).index();

    var details = currentList.item[currentIndex].details || '';

    $('#intro').hide();
    $('#details').show().val(details).data('index', currentIndex);
});

$('.list ul').on('focus', 'input', function() {
    $(this).closest('li').trigger('activated');
});

$(document).ready(function() {
    // Instantiate a new list
    currentList = new MyList();

    // Load the existing list from the hard drive
    currentList.load();

    // Remove the first empty item before loading a saved list
    if (currentList.item) {
        $('.list li').first().remove();
    }

    // For each item in the stored list, create a new item in the on-screen list and load the value into it
    makeNewItem(currentList.item.length);
    $.map(currentList.item, function(item, index) {
        $('.list li ').eq(index).find('input').val(item.itemText);
    });
});