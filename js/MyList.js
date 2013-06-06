function MyList() {
    // A user list
    this.item = [];

    this.load = function() {
        var listString;
        if (supports_html5_storage()) {
            listString = localStorage.getItem('theList');
        } else {
            $.cookie.json = true;
            listString = $.cookie('the_list');
        }

        if (listString) {
            this.item.length = 0;
            this.item = JSON.parse(listString);
        }
    };

    this.save = function(index) {
        var listString = JSON.stringify(this.item)
        if (supports_html5_storage()) {
            localStorage.setItem('theList', listString);
        } else {
            $.cookie('the_list', listString);
        }
    };
}