function MyList() {
    // A user list
    var existingCookie = $.cookie('my_list');

    if(typeof existingCookie !== 'undefined') {
        this.list = existingCookie;
    }
}

(function( $ ){
    $.fn.colorSlide = function() {
        var trigger = $(this);
        var elWidth = trigger.outerWidth();
        var elHeight = trigger.outerHeight();
        var elPosition = trigger.offset();
        var elColor = trigger.css('border-left-color');

        trigger.find('a').css({
            'position': 'relative',
            'z-index': 51
        });

        var colorSlider = $('<div class="color-slider"></div>');
        colorSlider.css({
            'background': elColor,
            'width': 0,
            'position': 'absolute',
            'z-index': 50
        }).offset(elPosition).appendTo(trigger);

        trigger.on('mouseenter mouseleave click', function(e) {

            if (e.type === 'mouseenter') {
                colorSlider.css({ 'width': elWidth, 'height': elHeight });
            } else if (e.type === 'mouseleave') {
                colorSlider.css('width', 0);
            } else if (e.type === 'click') {
                trigger.siblings(trigger.tagName).removeClass('active');
                trigger.toggleClass('active');
            }
        });
    };
})( jQuery );