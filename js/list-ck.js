function MyList(){function e(){if(supports_html5_storage())this.theList=localStorage.getItem("theList");else{$.cookie.json=!0;this.theList=$.cookie("the_list")}}function t(){this.theListString=JSON.stringify(this.theList);supports_html5_storage()?localStorage.setItem("theList",this.theListString):$.cookie("the_list",this.theListString)}function n(){var e=$("<li></li>");$(".list li").length>0}};