// Instantiate a new list
var currentList = new MyList();

// newItem plugin allows an element to create new items in the list
(function( $ ){
    $.fn.newItem = function() {
        $(this).bind('click', function() {
            var item = $('<li class="new-item"><form action=""><input type="text" /></form></li>');
            if ($('.list li').length === 0 && $('.list li').first().val()) {
                item.prependTo($('.list ul')).removeClass('new');
            } else {
                $('.list li').css('top', $('.list li').outerHeight());
                item.prependTo($('.list ul')).removeClass('new');
                $('.list li').css('top', 0);
            }
        });
    };
})( jQuery );

// Bind input change with a 5s delay
$('input').bind('input propertychange', function (e) {
    var triggerElement = $(this);
    // If it's the propertychange event, make sure it's the value that changed.
    if (window.event && event.type == 'propertychange' && event.propertyName != 'value')
        return;

    // Clear any previously set timer before setting a fresh one
    window.clearTimeout($(this).data('timeout'));
    $(this).data('timeout', setTimeout(function () {
        var triggerIndex = triggerElement.parent().parent().index();
        currentList.item[triggerIndex].name = triggerElement.val();
    }, 5000));
});


$('input').bind('focus', function (e) {
    var currentItem = $(this).val();
    currentList.item[currentItem].previousValue = currentItem;
});