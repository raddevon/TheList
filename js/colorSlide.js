(function( $ ){
    $.fn.colorSlide = function() {
        return this.each(function() {
            // var $(this) = $(this);
            var elWidth = $(this).outerWidth();
            var elHeight = $(this).outerHeight();
            var elColor = $(this).css('border-left-color');

            $(this).find('a').css({
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
            }).appendTo($(this));

            $.fn.sliderOn = function() {
                $(this).find('.color-slider').css('width', elWidth);
                return this;
            };

            $.fn.sliderOff = function() {
                $(this).find('.color-slider').css('width', 0);
                $(this).closest('li').trigger('deactivated');
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

            var bindMouseenter = function () {
                $(this).on('mouseenter', function() {
                    $(this).sliderOn();
                });
            };

            var bindMouseleave = function () {
                $(this).on('mouseleave', function() {
                    $(this).sliderOff();
                });
            };

            var bindActivated = function () {
                $(this).on('activated', function() {
                    $(this)
                        .unbind('mouseleave').sliderOn()
                        .siblings().trigger('deactivated');
                });
            };

            var bindDeactivated = function () {
                $(this).on('deactivated', function() {
                    $(this).sliderOff().removeClass('active')
                    .bind('mouseleave', function() { $(this).sliderOff(); });
                });
            };

            bindMouseenter();
            bindMouseleave();
            bindActivated();
            bindDeactivated();
        });
    };
})( jQuery );