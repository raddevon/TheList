(function( $ ){
    $.fn.colorSlide = function() {
        var trigger = $(this);
        var elWidth = trigger.outerWidth();
        var elHeight = trigger.outerHeight();
        var elPosition = trigger.offset();
        var elColor = trigger.css('border-left-color');

        var colorSlider = $('<div class="color-slider"></div>');
        trigger.css('z-index', 51);
        colorSlider.css({
            'background': elColor,
            'width': 0,
            'position': 'absolute',
            'z-index': 50
        }).offset(elPosition).appendTo(trigger);

        trigger.on('mouseenter mouseleave', function(e) {
            if (e.type === 'mouseenter') {
                colorSlider.css({ 'width': elWidth, 'height': elHeight });
            } else if (e.type === 'mouseleave') {
                colorSlider.css('width', 0);
                colorSlider.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
                    colorSlider.remove();
                });
            }
        });
    };
})( jQuery );