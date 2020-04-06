$(document).ready(function(){
    $.get( "../back-end/script.php", function(data) {
        $( ".panel" ).html(data);
        showAll(data);
    });
});

//Modal that provides all pet's information
var modal = document.getElementById("myModal");
var textTest = document.getElementById("textTest"); 
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// GENERATE LIST FUNCTION
function showAll(response) {
    var arr = JSON.parse(response); // array from phpToJs.php
    var out = "<div class='main'>";
        out += "<h2>List of animals:</h2>";
        out += "</div>";
        out += "<table>"; // print table in html
        for(i = 0; i < arr.length; i++) { // loop through results form db
        
            modalText = "Naam: " +
                        arr[i].name + 
                        "<br>Ras: " +
                        arr[i].breed + 
                        "<br>Geslacht: " + 
                        arr[i].gender + 
                        "<br><br>Prijs per dag: " + 
                        + arr[i].rent_per_day + 
                        "<br> Omterekenennaarleeftijd: " 
                        + arr[i].date_of_birth; //Fix: deze omrekenen naar leeftijd

            out += 
            //FIX: Details modal doesn't work yet --> doesn't show the right content, just the last one.
            "<tr><td>" 
                + "<image src='images/" +  arr[i].id_pet + ".jpg' style=/>" + 
                "</td></tr><tr><td>" 
                + arr[i].name + "<input type='button' name='button' value='Details' onclick='details(modalText)' />" + // Rent button. FIX: rent function 
            "</td></tr>";
                
            "<div> "
            // print al the results
        }
    out += "</table>"; // end table
     
    $(".panel").html(out); 
    console.log(ageCalculator());   
}

// Opens Modal with information about specific pet. 
//Fix: koppelen aan modal zelf, en niet aan de <p> in de modal 
//Fix: button werkt nog niet, maar daarmee moet doorverwezen worden naar een formulier om te kunnen huren --> shopping cart page
function details(modalText) {
    modal.style.display = "block";
    textTest.innerHTML = modalText; 
    textTest.innerHTML += "<br><input type ='button' name='button' value='rent' />"
}

//Function to calculate pet's age
function ageCalculator(date_of_birth) {
    var dob = new Date(date_of_birth); 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    
    console.log(Math.abs(age_dt.getUTCFullYear() - 1970)); 
}



// Two functions to close hide modal:   
span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

// BACK BUTTON FUNCTIONALITY
function back(){
    window.location.href = "dieren.html";
}