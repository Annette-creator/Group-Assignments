$(document).ready(function(){
    // when a 'search products' button was clicked
    $(document).on('submit', '#search-books-form', function(){
 
        // get search keywords
        var keywords = $(this).find(":input[name='keywords']").val();
 
        // get data from the api based on search keywords
        $.getJSON("./MOCK_DATA.json?action=read_books?s=" + keywords, function(data){
            // template in products.js
            readProductsTemplate(data, keywords);
            // chage page title
            changePageTitle("Zoek naar boeken: " + keywords);
        });
 
        // prevent whole page reload
        return false;
    });
});