// product list html
function readProductsTemplate(data, keywords){
    console.log("testing data in books", data)
    var read_products_html=`
        <!-- search products form -->
        <form id='search-book-form' action='s' method='post'>
            <div class='input-group pull-left w-30-pct search-bar'>
                <input type='text' value='` + keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Zoek naar boeken...' />
    
                <span class='input-group-btn'>
                    <button type='submit' class='btn btn-default' type='button'>
                        <span class='glyphicon glyphicon-search'></span>
                    </button>
                </span>
            </div>
        </form>

        <!-- when clicked, it will load the create product form -->
        <div id='create-product' class='btn pull-right create-book-button'>
            <span class='glyphicon glyphicon-plus'></span> Maak een nieuw boek aan
        </div>

        <!-- start table -->
        <table id="sort_tabel" class="table table-curved table-striped">
            <thead>
            <tr>
                <th class='w-5-pct'>ID</th>
                <th onclick="sortTable(1)" class='w-10-pct'>IBSN<span class="glyphicon glyphicon-sort-by-order"></span></th>
                <th onclick="sortTable(2)" class='w-15-pct'>Auteur<span class="glyphicon glyphicon-sort-by-alphabet"></span></th>
                <th onclick="sortTable(3)" class='w-15-pct'>Titel<span class="glyphicon glyphicon-sort-by-alphabet"></span></th>
                <th class='w-10-pct'>Genre</th>
                <th class='w-30-pct'>Synopsis</th>
                <th class='w-10-pct'>Status</th>
                <!-- <th class='w-15-pct'>Omslag</th> --><!-- NEEDED LATER -->
                <th class='w-10-pct text-align-center'></th>
            </tr>
        </thead>`;

        // loop through returned list of data
        $.each(data, function(index, data) {
            // creating new table row per record
            read_products_html+=`
            <tr>
                <td>` + data.book_id + `</td>
                <td>` + data.isbn + `</td>
                <td>` + data.first_name + " " + data.last_name + `</td>
                <td>` + data.title + `</td>
                <td>` + data.genre_id + `</td>
                <td>` + data.description + `</td>
                <td>` + data.status + `</td>
                
                <!-- 'action' buttons -->
                <td>
                    <!-- read product button -->
                    <button class='btn buttons btn-primary m-r-10px read-one-book-button' data-id='` + data.book_id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Details
                    </button>
    
                    <!-- edit button -->
                    <button class='btn buttons btn-info m-r-10px update-book-button' data-id='` + data.book_id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Wijzig
                    </button>
    
                    <!-- delete button -->
                    <button class='btn buttons btn-danger delete-book-button' data-id='` + data.book_id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Verwijder
                    </button>
                </td>
            </tr>`;
        });
        // end table
        read_products_html+=`</table>`;
        
    // inject to 'page-content' of our app
    $("#page-content").html(read_products_html);
    


}                

//NEEDED LATER!!!!
// <td><img src='` + data.cover + `' alt='test cover' width='80px'></td>