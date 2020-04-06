$(document).ready(function(){
    // app html
    var app_html=`
        <div class='container'>
            <div class='page-header'>
                <h1 id='page-title'></h1>
            </div>

            <div>
                <h1 id='page-title-h1-update'>Wijzig <span class='glyphicon glyphicon-arrow-right'></span></h1>
                <h3 id='page-title-update'></h3>
            </div>
            
            <!-- this is where the contents will be shown. -->
            <div id='page-content'></div>

            <div id="pagination-container"></div>
        
        </div>`;
    // inject to 'app' in index.html
    $("#books").html(app_html);
});
 
// change page title
function changePageTitle(page_title){
    //Set update titles to none
    document.getElementById("page-title").style.display = "block";
    document.getElementById("page-title-update").style.display = "none";
    document.getElementById("page-title-h1-update").style.display = "none";
   
    // change page title
    $('#page-title').text(page_title);
    // change title tag
    document.title=page_title;
}

// change page title update
function changePageTitleUpdate(page_title_update){
    //set update titles to block, normal title to none and some styling
    document.getElementById("page-title").style.display = "none";
    document.getElementById("page-title-update").setAttribute("style", "display: block; margin: -40px 0px 50px 127px;");
    document.getElementById("page-title-h1-update").style.display = "block";
    
    // change page title
    $('#page-title-update').text(page_title_update);
    // change title tag
    document.title=page_title_update;
}


// function to make form values to json format
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        console.log(this.name + " <-- 'this.name' in serializeObject");
        console.log(this.value + " <-- 'this.value' in serializeObject");
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || null);
        } else {
            o[this.name] = this.value || null;
        }
    });
    console.log(o.author_id + " <-- o.author_id.value from serializeObject");

    if(o.author_id === 2){
        console.log("o.author_id ==> integer");
    }
    if(o.author_id === "2"){
        console.log("o.author_id ==> string");
    }

    return o;
};