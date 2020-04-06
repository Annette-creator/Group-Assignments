$.get( "../back-end/script.php", function(data) {
    console.log(data);
    showAll(data);
});
var arr;
var i; // var for loop
// GENERATE LIST FUNCTION
function showAll(response) {
    var arr = JSON.parse(response); // array from script.php
    var out = "<div class='animals'>";
        out = "<h2 class='animals'>List of animals:</h2>";
        out += "</div>";
        out += "<table>";
        out +=      "<tr>";
        out +=          "<th style='width: 230px;'>Afbeelding</th>";
        out +=          "<th>Naam</th>";
        out +=          "<th>Breed</th>";
        out +=          "<th>Gender</th>";
        out +=          "<th>Price</th>";
        out +=          "<th>Age</th>";
        out +=          "<th>Description</th>";
        out +=          "<th></th>";
        out +=      "</tr>";
        out += "</table>";
    
        out += "<table>"; // print table in html
        for(i = 0; i < arr.length; i++) { // loop through results form db
            out += 
                "<tr><td><img id='myImg' src='images/"+arr[i].id_pet+".jpg' width='160' height='auto'></img></td>" +
                "<td>"+ arr[i].name + "</td>" +
                "<td>"+ arr[i].breed + "</td>" +
                "<td>"+ arr[i].gender + "</td>" +
                "<td>"+ arr[i].rent_per_day + "</td>" +
                "<td>"+ arr[i].date_of_birth + "</td>" +
                "<td>"+ arr[i].description + "</td>" +
                "<td><input type='button' value='Details' id='" + arr[i].id_pet + "' onclick='edit("+JSON.stringify(arr[i])+")'></td>" // Edit button at end of row with edit() function connected
            "</tr>"; // print al the results
        }
    out += "</table>"; // end table

    $(".panel").html(out); 
}
// GENERATE DETAILS PAGE (by id)
function edit(pet){
    var data_array = jQuery.parseJSON(JSON.stringify(pet));
    var female = "";
    var male = "";
    if (data_array.gender === "Female"){
       var female = "selected = selected";
    }else {
       var male = "selected = selected";
    }
    
    var kunekune = "";
    var african = "";
    var celestial = "";
    var loxodonta = "";
    var husky = "";
    var eurasian = "";
    var red = "";
    if(data_array.breed_id === "KuneKune"){
        var kunekune = "selected = selected";
    }else if (data_array.breed_id === "african") {
        var african = "selected = selected";
    }else if (data_array.breed_id === "celestial"){
        var celestial = "selected = selected";
    }else if (data_array.breed_id === "loxodonta"){
        var loxodonta = "selected = selected";
    }else if (data_array.breed_id === "husky"){
        var husky = "selected = selected";
    }else if (data_array.breed_id === "eurasian"){
        var eurasian = "selected = selected";
    }else (data_array.breed_id === "red");{
        var red = "selected = selected";
    }
    console.log(data_array);

    var output = "<form>";
    output += "<label for='id'>ID</label> <input type='text' name='id_pet' value=" + data_array.id_pet + ">";
    output += "<label for='Name'>Name</label> <input type='text' name='name' value=" + data_array.name + ">";
    output += "<label for='breed'>Breed</label>";
    output += "<select name='breed_id'>";
    output += "<option "+kunekune+" value='1'>Kunekune</option>";
    output += "<option "+african+" value='2'>African Pygmy</option>";
    output += "<option "+celestial+" value='3'>Celestial Eye Goldfish</option>";
    output += "<option "+loxodonta+" value='4'>Loxodonta Africana</option>";
    output += "<option "+husky+" value='5'>Husky</option>";
    output += "<option "+eurasian+" value='6'>Eurasian Wolf</option>";
    output += "<option "+red+" value='7'>Red Fox</option>";
    output += "</select>";
    output += "<label for='gender'>Gender</label>";
    output += "<select name='gender'>";
    output += "<option "+female+" value='1'>Female</option>";
    output += "<option "+male+" value='2'>Male</option>";
    output += "</select>";
    output += "<label for='price_per_day' style='margin-top: 20px'>Price per day</label> <input type='text' name='rent_per_day' value=" + data_array.rent_per_day + ">";
    output += "<label for='date_of_birth'>Date of birth</label> <input type='text' name='date_of_birth' value=" + data_array.date_of_birth + ">";
    output += "<label for='description'>Description</label><textarea rows='4' cols='50' name='description' form='detailsform' >" + data_array.description + "</textarea>";
    output += "<input type='button' value='Submit' onclick='updateData()' >";
    output += "<input type='button' value='back' onclick='back()'>";
    output += "</form>";
    $(".panel").html(output);     
}
function updateData(){
    let updateData = {
        "id_pet" : document.getElementsByName("id_pet")[0].value,
        "name" : document.getElementsByName("name")[0].value,
        "id_breed" : document.getElementsByName("breed_id")[0].value,
        "id_gender" : document.getElementsByName("gender")[0].value,
        "rent_per_day" : document.getElementsByName("rent_per_day")[0].value,
        "date_of_birth" : document.getElementsByName("date_of_birth")[0].value,
        "description" : document.getElementsByName("description")[0].value,
        }
    let updateString = JSON.stringify(updateData);
    window.location = "../back-end/script.php?update="+updateString;
}
// BACK BUTTON FUNCTIONALITY
function back(){
    window.location.href = "dieren.html";
}