function MyList(){var e=$.cookie("my_list");typeof e!="undefined"&&(this.list=e)}(function(e){e.fn.colorSlide=function(){var t=e(this),n=t.outerWidth(),r=t.outerHeight(),i=t.offset(),s=t.css("border-left-color");t.find("a").css({position:"relative","z-index":51});var o=e('<div class="color-slider"></div>');o.css({background:s,width:0,position:"absolute","z-index":50}).offset(i).appendTo(t);t.on("mouseenter mouseleave",function(e){e.type==="mouseenter"?o.css({width:n,height:r}):e.type==="mouseleave"&&o.css("width",0)})}})(jQuery);