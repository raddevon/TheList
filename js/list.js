var currentList;

function getIndex($field) {
    // Gets the index of either an input field or its corresponding details box
    if ($field.data('index') === undefined) {
        return $field.parent().parent().index();
    } else {
        return $field.data('index');
    }
}

function setItemText(list, index, text) {
    if (!list.item[index]) {
        list.item[index] = {};
    }
    list.item[index].itemText = text;
}

function saveItem($field) {

    var currentIndex = getIndex($field),
        currentValue = $('.list li ').eq(currentIndex).find('input').val(),
        details = $('#details').val() || null;
    setItemText(currentList, currentIndex, currentValue);
    currentList.item[currentIndex].details = details;
    currentList.save();
    displayItemText(currentValue);
}

function displayItemText(newValue) {
    $('#item-text').text(newValue);
}

function showDetails(details, currentIndex) {
    $('#intro').hide();
    $('#details').show().val(details).data('index', currentIndex);

    // Move the details div underneath the current item if the details column is not visible
    if ($('.detail-column').is(':hidden')) {
        $('#details').appendTo($('.list').find('li').eq(currentIndex));
    }
}

function hideDetails() {
    $('#intro').show();
    $('#item-text').text('');
    $('#details').hide();

    // Move the details div back to its original location
    if ($('.detail-column').is(':hidden')) {
        $('#details').appendTo($('.detail-column'));
    }
}

function makeNewItem(count) {
    var item = $('<li class="new"><form action=""><input type="text" /></form><div class="delete"><a href="#"><i class="icon-delete"></i></a></div></li>');

    count = count || 1;

    if (count > 1 || $('.list li').length === 0 || $('.list li').find('input').eq(0).val()) {
        for (var i = 0; i < count; i++) {
            item.clone().prependTo($('.list ul'));
            $('.list').find('li').eq(0).find('.delete a').deleteItem();
            currentList.item.unshift('');
        }
    }

    if (count === 1) {
        $('.list ul').find('li').eq(0).find('input').colorSlide().focus();
    }
}

function removeItem(index) {
    currentList.item.splice(index, 1);
    $('.list li').eq(index).trigger('deactivated').remove();
}

// newItem plugin allows an element to create new items in the list
(function( $ ){
    $.fn.newItem = function() {
        $(this).bind('click', function() {
            makeNewItem();
        });
    };
})( jQuery );

// newItem plugin allows an element to create new items in the list
(function( $ ){
    $.fn.deleteItem = function() {
        var $deleteButton = $(this),
            $currentItem = $deleteButton.closest('li').find('input');
        $deleteButton.bind('click', function() {
            $('#details').val('');
            $('#item-text').text('');
            saveItem($currentItem);
            if ($('.list li').length === 1) {
                $currentItem.val('').focus();
            } else {
                $currentItem.focus().val('').blur();
            }
        });
    };
})( jQuery );

// Bind input change with a 5s delay
$('.list ul, .detail-column form').on('input propertychange', 'input, textarea', function () {
    var $currentItem = $(this);
    // If it's the propertychange event, make sure it's the value that changed.
    if (window.event && event.type == 'propertychange' && event.propertyName != 'value')
        return;

    // Clear any previously set timer before setting a fresh one
    window.clearTimeout($(this).data('timeout'));
    $(this).data('timeout', setTimeout(function () {
        saveItem($currentItem);
    }, 1000));
});

// On blur, save the list item and its details. Hide the details textarea and show the intro
$('.list ul, .detail-column form').on('blur', 'input, textarea', function () {
    var currentIndex = getIndex($(this)),
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

// Show details for activated item
$('.list ul').on('activated', 'li', function() {
    var currentIndex = $(this).index();

    var details = currentList.item[currentIndex].details || '';

    showDetails(details, currentIndex);
});

// Hide details when an item is deactivated
$('.list ul').on('deactivated', 'li', function() {
    var currentIndex = $(this).index();

    hideDetails();
});

// Activate an item when its input field has focus
$('.list ul').on('focus', 'input', function() {
    $(this).closest('li').trigger('activated');
    displayItemText($(this).val());
});

// Suppress form submit
$('body').on('submit', 'form', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(e.target).find('input, textarea').blur();
});

// Suppress add/delete buttons' default actions
$('.delete, .add').on('click', 'a', function(e) {
    e.preventDefault();
    e.stopPropagation();
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
    currentList.cleanup();
    $.map(currentList.item, function(item, index) {
        $('.list li ').eq(index).find('input').val(item.itemText);
    });
});
