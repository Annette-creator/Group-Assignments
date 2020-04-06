$(document).ready(function() {
  // handle 'read one' button click
  $(document).on("click", ".read-one-book-button", function() {
    // get product id
    var id = $(this).attr("data-id");
    //set pagination on none
    document.getElementById("pagination-container").style.display = "none";

    $.getJSON("http://178.18.138.113:8080/libraryBackend/list/" + id, function(data) {
      
      // start html
      var read_one_product_html =`
        <!-- when clicked, it will show the product's list -->
        <div id='read-product' class='btn btn-primary pull-right m-b-15px read-products-button button-margin'>
          <span class='glyphicon glyphicon-list'></span> Terug naar overzicht
        </div>

        <!-- product data will be shown in this table -->
        <div class="container">
        
        <table class="read-one-book-image">
          <tr>
            <th class='w100-pct'>
              <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="Smiley face" height="400" width="250">
            </th>
          </tr>
          <tr>
            <th class='w100-pct'>
              <div class='btn btn-confirm pull-right'>
                <span class='glyphicon glyphicon-pencil'></span> Reserveren
              </div>
            </th>
          </tr>
          <tr>
            <th class='w100-pct'>
              <div class='btn btn-danger pull-right'>
                <span class='glyphicon glyphicon-remove'></span> Annuleren
              </div>
            </th>
          </tr>
        </table>

        <table class="table table-curved table-striped table-split">
          <tr>
              <th class='w-30-pct'>ISBN</td>
              <td class='w-70-pct'>` +data.isbn +`</td>
          </tr>
          <tr>
              <th class='w-15-pct'>Naam schrijver</th>
              <td>` +data.author_id +`</td>
              <!-- NEEDED WHEN JOINS ARE FIXED <td>` + data.first_name + " " + data.last_name + `</td>-->
          </tr>
          <tr>
              <th class='w-15-pct'>Titel boek</th>
              <td>` +data.title +`</td>
          </tr>
          <tr>
              <th class='w-15-pct'>Genre</th>
              <td>` +data.genre_id +`</td>
          </tr>
          <tr>
              <th class='w-15-pct'>Status</th>
              <td>` +data.status +`</td>
          </tr>
          <tr>
              <th class='w-10-pct'>Samenvatting</th>
              <td>` +data.description +`</td>
          </tr>
        </table>`;

      // inject html to 'page-content' of our app
      $("#page-content").html(read_one_product_html);

      // chage page title
      changePageTitle(data.title + " - " + data.author_id);
    });
  });
});