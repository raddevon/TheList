// TODO: This whole thing is broke as a joke. Fix it by rewriting.
(function( $ ){
    $.fn.colorSlide = function() {
        return this.each( function() {
            var $triggerElement = $(this);
            var $listItem = $triggerElement.closest('li');
            var elWidth = $listItem.outerWidth();
            var elHeight = $listItem.outerHeight();
            var elColor = $listItem.css('border-left-color');

            $listItem.find('a').css({
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
            }).appendTo($listItem);

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

            var bindMouseenter = function () {
                $triggerElement.on('mouseenter', function() {
                    sliderOn($listItem);
                });
            };

            var bindMouseleave = function () {
                $triggerElement.on('mouseleave', function() {
                    sliderOff($listItem);
                });
            };

            var bindActivated = function () {
                $listItem.on('activated', function() {
                    $triggerElement.unbind('mouseleave');
                    $listItem.siblings().trigger('deactivated');
                    sliderOn($listItem);
                });
            };

            var bindDeactivated = function () {
                $listItem.on('deactivated', function() {
                    $listItem.removeClass('active');
                    $triggerElement.bind('mouseleave', function() { sliderOff($listItem); });
                    sliderOff($listItem);
                });
            };

            bindMouseenter();
            bindMouseleave();
            bindActivated();
            bindDeactivated();
        });
    };
})( jQuery );