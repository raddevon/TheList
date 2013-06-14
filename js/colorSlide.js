(function( $ ){
    $.fn.colorSlide = function() {
        return this.each( function() {
            var $triggerElement = $(this);
            var $listItem = $triggerElement.closest('li');

            // Capture list item dimensions and border color for slider
            var elWidth = $listItem.outerWidth();
            var elHeight = $listItem.outerHeight();
            var elColor = $listItem.css('border-left-color');

            // Create and inject color slider
            var colorSlider = $('<div class="color-slider"></div>');
            colorSlider.css({
                'background': elColor,
                'width': 0,
                'height': elHeight,
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'z-index': 50
            }).appendTo($listItem);

            /* Slider functions */
            var sliderOn = function($element) {
                $element.find('.color-slider').css('width', elWidth);
            };

            var sliderOff = function($element) {
                $element.find('.color-slider').css('width', 0);
            };

            var sliderToggle = function($element) {
                var currentSlider = $element.find('.color-slider');
                if (currentSlider.css('width') > 0) {
                    sliderOff($element);
                } else {
                    sliderOn($element);
                }
            };

            /* Event bindings */
            $triggerElement.on('mouseenter', function() {
                sliderOn($listItem);
            });

            $triggerElement.on('mouseleave', function() {
                sliderOff($listItem);
            });

            $listItem.on('activated', function() {
                $triggerElement.unbind('mouseleave');
                $listItem.siblings().trigger('deactivated');
                sliderOn($listItem);
            });

            $listItem.on('deactivated', function() {
                $listItem.removeClass('active');
                $triggerElement.bind('mouseleave', function() { sliderOff($listItem); });
                sliderOff($listItem);
            });
        });
    };
})( jQuery );