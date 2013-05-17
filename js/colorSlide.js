(function( $ ){
    $.fn.colorSlide = function() {
        var triggerElement = $(this);
        var elWidth = triggerElement.outerWidth();
        var elHeight = triggerElement.outerHeight();
        var elPosition = triggerElement.offset();
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
            'z-index': 50
        }).offset(elPosition).appendTo(triggerElement);

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

        var bindClickOn = function() {
            // to-do By unbinding 'click' altogether, I could interfere with other events bound to it. It would be better to name this function and unbind only it.
            triggerElement.unbind('click').on('click', function() {
                triggerElement.sliderToggle().addClass('active').trigger('activated');
            });
        };

        var bindClickOff = function() {
            triggerElement.unbind('click').on('click', function() {
                triggerElement.sliderToggle().removeClass('active').trigger('deactivated');
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
                bindClickOff();
            });
        };

        var bindDeactivated = function () {
            triggerElement.on('deactivated', function() {
                bindMouseleave();
                bindClickOn();
            });
        };

        bindClickOn();
        bindMouseenter();
        bindMouseleave();
        bindActivated();
        bindDeactivated();

        // triggerElement.on('mouseenter mouseleave click', function(e) {

        //     if (e.type === 'mouseenter') {
        //         sliderOn();
        //     } else if (e.type === 'mouseleave') {
        //         sliderOff();
        //     } else if (e.type === 'click') {
        //         triggerElement.siblings(triggerElement.tagName).removeClass('active');
        //         triggerElement.toggleClass('active');
        //     }
        // });
    };
})( jQuery );