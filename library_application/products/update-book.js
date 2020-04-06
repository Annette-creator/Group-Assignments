


$(document).ready(function(){
    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-book-button', function(){
        // get product id
        var id = $(this).attr('data-id');
        
        //set pagination on none
        document.getElementById("pagination-container").style.display = "none";

        // read one record based on given product id
        $.getJSON("http://178.18.138.113:8080/libraryBackend/list/"+id, function(data){
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $(input).next('img').attr('src', e.target.result);
                    }
                    reader.readAsDataURL(input.files[0]);
                }
            }
            
            $(function(){   
                $(".upld").change(function () { //set up a common class
                    readURL(this);
                });
            });

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
                            <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="Smiley face" height="400" width="250">
                            
                            <!--
                            <input class="joint upld" type='file' id="imgInp" />
                            <img id="book-cover" src="#" alt="your image" height="400" width="250/>
                            -->
                            
                        </th>
                    </tr>
                    <tr>
                        <th class='w100-pct'>
                            <div class='btn btn-primary pull-right'>
                                <span class='glyphicon glyphicon-picture'></span> Wijzig afbeelding
                                <input class="joint upld" type='file' id="imgInp"/>
                            </div>
                        </th>
                    </tr>
                </table>

                <!-- we used the 'required' html5 property to prevent empty fields -->
                <form name="validate_Adminform" id='update-book-form' action='#' method='post' border='0' onsubmit="return validateForm();" novalidate>
                    <table class="table table-curved table-striped table-split">
                        <!-- ID field -->
                        <tr>
                            <td>ISBN</td>
                            <td><input value=` + data.isbn + ` type='text' name='book_id' class='form-control' required/></td>
                        </tr>
                        <!-- Schrijver name field -->
                        <tr>
                            <td>Voornaam auteur</td>
                            <td><input value=` + data.first_name + ` type='text' name='first_name' class='form-control' required /></td>
                            <input type='hidden' name='author_id' value=` + data.author_id + `" /> 
                        </tr>
                        <!-- schrijver name field -->
                        <tr>
                            <td>Achternaam auteur</td>
                            <td><input value=` + data.last_name + ` type='text' name='last_name' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>Titel</td>
                            <td><input value=` + data.title + ` type='text' name='title' class='form-control'required /></td>
                        </tr>                    
                        <tr>
                            <td>Genre</td>
                            <td><input value=` + data.genre_id + ` type='text' name='genre_id' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td><input value=` + data.status + ` type='text' name='status' class='form-control' required /></td>
                        </tr> 
                        <tr>
                            <td>Samenvatting</td>
                            <td><input value=` + data.description + ` type='text' name='description' class='form-control'required /></td>
                        </tr>                                       
                        <tr>
                            <!-- hidden 'book id' to identify which record to delete -->
                            <td class="display-none"><input value=` + data.book_id + ` name='book_id' type='hidden' /></td>
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
            changePageTitleUpdate(data.title + " - " + data.first_name + " " + data.last_name);
        });
    });
     
    // will run if 'create product' form was submitted
    $(document).on('submit', '#update-boek-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());
		
		console.log(form_data); 
        // submit form data to api
        $.ajax({
            url: "http://178.18.138.113:8080/libraryBackend/list/?action=update_boek",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // product was created, go back to products list
                showProductsFirstPage();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        return false;
    });
});