$(document).ready(function(){
    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-book-button', function(){
        // get product id
        var id = $(this).attr('data-id');
        
        //set pagination on none
        document.getElementById("pagination-container").style.display = "none";

        // read one record based on given product id
        $.getJSON("http://178.18.138.113:8080/libraryBackend/list/"+id, function(data){
            // Function for displaying new book cover image
            // function readURL(input) {
            //     if (input.files && input.files[0]) {
            //         var reader = new FileReader();
            //         reader.onload = function (e) {
            //             $(input).next('img').attr('src', e.target.result);
            //         }
            //         reader.readAsDataURL(input.files[0]);
            //     }
            // }
            
            // $(function(){   
            //     $(".upld").change(function () { //set up a common class
            //         readURL(this);
            //     });
            // });

            var isbn = data.isbn;
            var first_name = data.first_name;
            var last_name = data.last_name;
            var author_id = -1;
            var title = data.title;
            var category = data.category;
            var description = data.description;
            var genre_id = -1;

            // store 'update book' html to this variable
            var update_product_html=`

            <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button button-margin'>
                <span class='glyphicon glyphicon-list'></span> Terug naar boeken
            </div>

            <!-- product data will be shown in this table -->
            <div class="container">
                <table class="read-one-book-image">
                    <tr>
                        <th class='w100-pct'>
                            <img src="assets/images/book-cover_images/zonder-gezicht_robert-bryndza.jpg" alt="Books" height="400" width="250">
                            
                            <!--
                            <input class="joint upld" type='file' id="imgInp" />
                            <img id="book-cover" src="#" alt="your image" height="400" width="250/>
                            -->
                            
                        </th>
                    </tr>
                    <tr>
                        <th class='w100-pct'>
                            <div class='btn btn-primary pull-right change-image'>
                                <span class='glyphicon glyphicon-picture'></span> Wijzig afbeelding
                                <input class="joint upld" type='file' id="imgInp"/>
                            </div>
                        </th>
                    </tr>
                </table>

                <!-- we used the 'required' html5 property to prevent empty fields -->
                <form id='update-book-form' action='#' method='PUT' border='0'>
                    <table class="table table-curved table-striped table-split">
                        <!-- ID field -->
                        <tr>
                            <td>ISBN</td>
                            <td><input value=\"` + isbn + `\" type='text' name='isbn' class='form-control' required/></td>
                        </tr>
                        <!-- Schrijver name field -->
                        <tr>
                            <td>Voornaam auteur</td>
                            <td><input value=\"` + first_name + `\" type='text' name='first_name' class='form-control'  />
                            <input value=\"` + author_id + `\" type='hidden' name='author_id' class='form-control'  />
                        </tr>
                        <!-- schrijver name field -->
                        <tr>
                            <td>Achternaam auteur</td>
                            <td><input value=\"` + last_name + `\" type='text' name='last_name' class='form-control' /></td>
                        </tr>
                        <tr>
                            <td>Titel</td>
                            <td><input value=\"`+ title + `\" type='text' name='title' class='form-control'required /></td>
                        </tr>                    
                        <tr>
                            <td>Genre</td>
                            <td><input value=\"` + category + `\" type='text' name='category' class='form-control' required />
                            <input value=\"` + genre_id + `\" type='hidden' name='genre_id' class='form-control' /></td>
                        </tr>
                        <tr>
                            <td>Samenvatting</td>
                            <td><input value=\"` + description + `\" type='text' name='description' class='form-control' rows="5" required /></td>
                        </tr>                                       
                    </table>
                    <button type='submit' class='btn btn-confirm pull-right'>
                        <span class='glyphicon  glyphicon-ok'></span> Update boek
                    </button>
                </form>
            </div>`;

            // inject to 'page-content' of our app
            $("#page-content").html(update_product_html);
            // chage page title
            changePageTitleUpdate(title + " - " + first_name + " " + last_name);
        });

        // will run if 'create product' form was submitted
        $(document).on('submit', '#update-book-form', function(){
            // get form data
            var form_data=JSON.stringify($(this).serializeObject());
            console.log(form_data);

            // submit form data to api
            $.ajax({
                url: "http://178.18.138.113:8080/libraryBackend/list/"+id,
                type : "PUT",
                contentType : 'application/json',
                data : form_data,
                success : function(result) {
                    console.log("Succes");

                    // product was created, go back to products list
                    showProductsFirstPage();
                },
                error: function(xhr, resp, text) {
                    // show error to console
                    console.log("iets gaat fout");
                    // console.log(xhr, resp, text);
                },
            });
            return false;
        });
    });
});