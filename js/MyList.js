function MyList() {
    // A user list
    this.item = [];

    function openExisting() {
        if (supports_html5_storage()) {
            this.theList = localStorage.getItem('theList');
        } else {
            $.cookie.json = true;
            this.theList = $.cookie('the_list');
        }
    }

    function saveList() {
        // todo Create the JSON object for the list and store in this.theList
        $.map()
        this.theListString = JSON.stringify(this.theList);
        if (supports_html5_storage()) {
            localStorage.setItem('theList', this.theListString);
        } else {
            $.cookie('the_list', this.theListString);
        }
    }
}