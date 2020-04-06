// Define global variables
var options = "";
var authorOptionList = "";
var genreOptionList = "";
var authorListLoaded = false;
var genreListLoaded = false;
var create_product_html;
var conProm;

$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-book-button', function(){
        //set pagination on none
        document.getElementById("pagination-container").style.display = "none";

        // https://javascript.info/promise-api
       conProm = Promise.all([
            fetch('http://178.18.138.113:8080/libraryBackend/authors'),
            fetch('http://178.18.138.113:8080/libraryBackend/genres')
        ])
    	.then(function (responses) {
    		// Get a JSON object from each of the responses
    		return responses.map(function (response) {
    			return response.json();
    		});
    	}).then(function (data) {
    		// Log the data to the console
            // You would do something with both sets of data here
            console.log(data);
            options = data;

            // return authorOptions
            getAuthorOptions(options[0])
            .then(function(){
                authorListLoaded = true;
                console.log("authorListLoaded --> " + authorListLoaded);
            });
            
            // return genreOptions
            getGenreOptions(options[1])
            .then(function(){
                genreListLoaded = true;
                console.log("genreListLoaded --> " + genreListLoaded);
            });
        }).then(function(){
            render()
        }).catch(function (error) {
    		// if there's an error, log it
    		console.log(error);
        });
    });
});



// INPUT FIELD TOGGLE
//  --> Refactor possible
function checkOptionAuthor(obj) {
    var input = document.getElementsByClassName("new-author-input");
    for(var i=0; i < input.length; i++) {
     input[i].disabled = !(obj.value == "create_new")
     input[i].enabled = (obj.value == "create_new")
    }
}
// INPUT FIELD TOGGLE
function checkOptionGenre(obj) {
    var input = document.getElementsByClassName("new-genre-input");
    for(var i=0; i < input.length; i++) {
     input[i].disabled = !(obj.value == "create_new")
     input[i].enabled = (obj.value == "create_new")
    }
}


	
// will run if create book form was submitted
$(document).on('submit', '#create-book-form', function(){
    
    // get form data
    var form_data=JSON.stringify($(this).serializeObject());

    console.log(form_data + " <-- form_data in create book");

    // submit form data to api
    $.ajax({
        url: "http://178.18.138.113:8080/libraryBackend/list/",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            console.log(result + " <-- result of ajax call");
            console.log("Ajax call returns succes!");
            // book was created, go back to products list
            showProductsFirstPage();
        },
        error: function(xhr, resp, text) {
            // show error to console
            console.log(xhr, resp, text);
            console.log("Ajax call returns FAIL!");
        }
    });
    showProductsFirstPage();
    return false;
});

// loop trough author options array 
async function getAuthorOptions(authors) {
    await Promise.all([authors]).then((arrList)=>{
      arrList.forEach((array)=>{
        array.forEach((ar)=>{
          console.log("name = "+ar.last_name) ;
          authorOptionList += "<option value='"+ar.author_id+"'>"+ ar.first_name + " " + ar.last_name + "</option>";
        })
      })
    });
    
    //return authorOptionList;
    console.log("authorOptionList = " + authorOptionList);
}


// loop trough author options array 
async function getGenreOptions(genres) {
    await Promise.all([genres]).then((arrList)=>{
      arrList.forEach((array)=>{
        array.forEach((ar)=>{
          console.log("name = "+ar.category) ;
          genreOptionList += "<option value='"+ar.genre_id+"'>"+ar.category+"</option>";
        })
      })
    });
    
    //return authorOptionList;
     console.log("genreOptionList = " + genreOptionList);
}


async function render(authorListLoaded, genreListLoaded){
    console.log(authorListLoaded);

    await Promise.all((authorListLoaded === true) && (genreListLoaded === true)).then(
        
        renderHtml(authorOptionList, genreOptionList),

        // inject html to 'page-content' of our app
        $("#page-content").html(create_product_html),

        // chage page title
        changePageTitle("Nieuw boek toevoegen") 
    );
}



// RENDER HTML FUNCTION async await
function renderHtml(authorOptionList, genreOptionList){
    create_product_html=`
            <!-- 'back to books' button to show list of books -->
            <div id='read-product' class='btn btn-primary pull-right m-b-15px read-products-button button-margin'>
                <span class='glyphicon glyphicon-list'></span> Terug naar boeken
            </div>

            <!-- books data will be shown in this table --> <!--  insert this: onsubmit="return validateForm(); -> after method in next line -->
            <form name='validate_Adminform' id='create-book-form' action='#' method='post' " border='0'>
                <table class="table table-curved table-striped">
                
                    <!-- Cover Image -->
                    <tr>
                        <td>Boek Omslag !NIET FUNCTIONEEL!</td>
                        <td><input value='' type='file' name='cover' id='cover' accept='image/*' class='form-control' /></td>
                    </tr>

                    <!-- Titel -->
                    <tr>
                        <td>Titel</td>
                        <td><input value='' type='text' name='title' id='title' class='form-control'required /></td>
                    </tr>

                    <!-- ISBN -->
                    <tr>
                        <td>ISBN</td>
                        <td><input value='' type='text' name='isbn' id='isbn' class='form-control' required/></td>
                    </tr>

                    <!-- Author selector -->
                    <tr>
                        <td>Auteur</td>
                        <td>
                            <select id="menu" onChange="checkOptionAuthor(this)" required>
                                <option value="">Selecteer een auteur</option>
                                <option value="create_new">Nieuwe auteur</option>
                                `
                                + authorOptionList + console.log(authorOptionList + " <--authorOption IN html template") + 
                                `
                            </select>
                        </td>
                    </tr>

                    <!-- Nieuwe auteur name fields -->
                    <tr>
                        <td>Nieuwe auteur voornaam</td>
                        <td><input value='' type='text' name='author_id' id='first_name' class='form-control new-author-input' disabled required /></td>
                        <input type='hidden' name='author_id' value='-1' />
                    </tr>
                    <tr>
                        <td>Nieuwe auteur achternaam</td>
                        <td><input value='' type='text' name='last_name' id='last_name' class='form-control new-author-input' disabled required /></td>
                    </tr>

                    <!-- Genre selector -->
                    <tr>
                        <td>Genre</td>
                        <td>
                            <select id="menu" onChange="checkOptionGenre(this)" required>
                                <option value="">Selecteer een genre</option>
                                <option value="create_new">Nieuw genre</option>
                                `
                                + genreOptionList + console.log(genreOptionList + " <--genreOption IN html template") + 
                                `
                            </select>
                        </td>
                    </tr>

                    <!-- Nieuw Genre -->
                    <tr>
                        <td>Nieuw genre</td>
                        <td><input value='' type='text' name='genre' id='genre' class='form-control new-genre-input' disabled required /></td>
                        <input type='hidden' name='genre_id' value='-1' />
                    </tr>

                    <!-- Synopsis -->
                    <tr>
                        <td>Synopsis</td>
                        <td><textarea form='create-book-form' value='' name='description' id='description' class='form-control' rows="5" required /></textarea>
                    </tr>                     
                </table>

                <!-- Submit button -->
                <button type='submit' class='btn create-book-button-confirm'>
                    <span class='glyphicon glyphicon-plus'></span> Voeg boek toe
                </button>
            </form>`;

            return create_product_html;
}
