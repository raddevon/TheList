function newItem() {
    var item = $('<li class="new-item"><form action=""><input type="text" /></form></li>');
    if ($('.list li').length === 0) {
        item.prependTo($('.list ul')).removeClass('new');
    } else {
        $('.list li').css('top', $('.list li').outerHeight());
        item.prependTo($('.list ul')).removeClass('new');
        $('.list li').css('top', 0);
    }
}