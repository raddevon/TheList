(function(e){e.fn.newItem=function(){e(this).bind("click",function(){var t=e('<li class="new-item"><form action=""><input type="text" /></form></li>');if(e(".list li").length===0&&e(".list li").first().val())t.prependTo(e(".list ul")).removeClass("new");else{e(".list li").css("top",e(".list li").outerHeight());t.prependTo(e(".list ul")).removeClass("new");e(".list li").css("top",0)}})}})(jQuery);