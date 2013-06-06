(function( $ ){
    $.fn.colorSlide = function() {
        var triggerElement = $(this);
        var elWidth = triggerElement.outerWidth();
        var elHeight = triggerElement.outerHeight();
        var elColor = triggerElement.css('border-left-color');

        triggerElement.find('a').css({
            'position': 'relative',
            'z-index': 51
        });

        var colorSlider = $('<div class="color-slider"></div>');
        colorSlider.css({
            'background': elColor,
            'width': 0,
            'height': elHeight,
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'z-index': 50
        }).appendTo(triggerElement);

        $.fn.sliderOn = function() {
            $(this).find('.color-slider').css('width', elWidth);
            return this;
        };

        $.fn.sliderOff = function() {
            $(this).find('.color-slider').css('width', 0);
            $(this).removeClass('active').trigger('deactivated');
            return this;
        };

        $.fn.sliderToggle = function() {
            var currentSlider = $(this).find('.color-slider');
            if (currentSlider.css('width') > 0) {
                $(this).sliderOff();
            } else {
                $(this).sliderOn();
            }
            return this;
        };

        var bindFocus = function() {
            var target = triggerElement.find('input');
            $(document)
                .on('focus', target, function() {
                    triggerElement.sliderToggle().addClass('active').trigger('activated');
                });
        };

        var bindMouseenter = function () {
            triggerElement.on('mouseenter', function() {
                triggerElement.sliderOn();
            });
        };

        var bindMouseleave = function () {
            triggerElement.on('mouseleave', function() {
                triggerElement.sliderOff();
            });
        };

        var bindActivated = function () {
            triggerElement.on('activated', function() {
                triggerElement
                    .unbind('mouseleave')
                    .siblings().sliderOff().trigger('deactivated');
            });
        };

        var bindDeactivated = function () {
            triggerElement.on('deactivated', function() {
                bindMouseleave();
            });
        };

        bindFocus();
        bindMouseenter();
        bindMouseleave();
        bindActivated();
        bindDeactivated();
    };
})( jQuery );