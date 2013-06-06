var currentList;

function makeNewItem(bottom) {
    var item = $('<li class="new"><form action=""><input type="text" /></form></li>');
    if (bottom) {
        item.appendTo($('.list ul')).removeClass('new');
    } else if ($('.list li').length === 0 && $('.list li').first().val()) {
        item.prependTo($('.list ul')).removeClass('new');
    } else {
        $('.list li').css('top', $('.list li').outerHeight());
        item.prependTo($('.list ul')).removeClass('new');
        $('.list li').css('top', 0);
    }
}

function removeItem(index) {
    currentList.item.splice(index, 1);
    $('.list li:eq(' + index + ')').remove();
}

// newItem plugin allows an element to create new items in the list
(function( $ ){
    $.fn.newItem = function() {
        $(this).bind('click', function() {
            makeNewItem();
            currentList.item.unshift('');
        });
    };
})( jQuery );

// Bind input change with a 5s delay
$(document).on('input propertychange', 'input', function () {
    var currentItem = $(this);
    // If it's the propertychange event, make sure it's the value that changed.
    if (window.event && event.type == 'propertychange' && event.propertyName != 'value')
        return;

    // Clear any previously set timer before setting a fresh one
    window.clearTimeout($(this).data('timeout'));
    $(this).data('timeout', setTimeout(function () {
        var currentIndex = currentItem.parent().parent().index();
        currentList.item[currentIndex] = currentItem.val();
    }, 5000));
});

// Bind input change with a 5s delay
$(document).on('input propertychange', 'textarea', function () {
    var detailsElement = $(this),
        details = $(this).val();
    // If it's the propertychange event, make sure it's the value that changed.
    if (window.event && event.type == 'propertychange' && event.propertyName != 'value')
        return;

    // Clear any previously set timer before setting a fresh one
    window.clearTimeout($(this).data('timeout'));
    $(this).data('timeout', setTimeout(function () {
        var currentIndex = detailsElement.data('index');
        currentList.item[currentIndex].details = details;
    }, 5000));
});

// On focus, populate the details for the current item and hide the intro
$(document).on('focus', 'input', function (e) {
    var currentIndex = $(this).parent().parent().index(),
        currentItem = $(this);

    currentList.item[currentIndex] = currentItem.val();

    var details = currentList.item[currentIndex].details || '';

    $('#intro').hide();
    $('#details').show().val(details).data('index', currentIndex);
});

// On blur, save the list item and its details. Hide the details textarea and show the intro
$(document).on('blur', 'input', function (e) {
    var currentValue = $(this).val(),
        currentIndex = $(this).parent().parent().index(),
        details = $('#details').val() || null;

    if (!currentValue && currentList.item.length > 1) {
        removeItem(currentIndex);
    } else {
        currentList.item[currentIndex] = currentValue;
        currentList.item[currentIndex].details = details;
    }

    $('#intro').show();
    $('#details').hide().val('');
});

// Save the list before the user leaves the page
$(window).on('beforeunload', function() {
    currentList.save();
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
    // Reverse the list to load the items in the correct order
    reversedList = currentList.item.reverse();
    // For each item in the stored list, create a new item in the on-screen list and load the value into it
    $.map(reversedList, function(item) {
        makeNewItem();
        $('.list li').first().find('input').val(item);
    });
})