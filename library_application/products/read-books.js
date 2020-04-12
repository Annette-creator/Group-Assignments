$(document).ready(function() {
  // show list of product on first load
  showProductsFirstPage();

  // when a 'read products' button was clicked
  $(document).on("click", ".read-products-button", function() {
    showProductsFirstPage();
  });

  // when a 'page' button was clicked
  $(document).on("click", ".pagination li", function() {
    // get json url
    var json_url = $(this)
      .find("a")
      .attr("data-page");
    // show list of products
    showProducts(json_url);
  });
});

function showProductsFirstPage() {
  var json_url = "http://178.18.138.113:8080/libraryBackend/list";
  //set pagination on block
  document.getElementById("pagination-container").style.display = "block";

  $('#pagination-container').pagination({
    dataSource: json_url,
    locator: 'data',
    totalNumber: 15,
    pageSize: 5,
    callback: function(data, pagination) {
        showProducts(json_url);
        // $('#page-content').html(html);
    }
  })
}

// function to show list of products
function showProducts(json_url) {
  // get list of products from the API
  $.getJSON(json_url, function(data) {
    //html for listing products
    readProductsTemplate(data, "");
    // chage page title
    changePageTitle("Overzicht boeken");
  });
}
