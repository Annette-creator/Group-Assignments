generateLoginForm();


// GENERATE HTML LOGIN FORM
function generateLoginForm(){
    var loginForm = "<form>";
        loginForm +=    "<label for='username'>User Name:</label>";
        loginForm +=    "<input type='text' id='username' name='username' placeholder='Type username email here...' required >";
        loginForm +=    "<br>";
        loginForm +=    "<label for='password'>Password:</label>";
        loginForm +=    "<input type='password' id='password' name='password' placeholder='Type password here...' required >";
        loginForm +=    "<br>";
        loginForm +=    "<span ><input type='button' value='Login' onclick='sentLoginData()'><a id='register_link' href='javascript:generateRegisterForm()'>Register</a></span>";
        loginForm += "</form>";

    $(".container").html(loginForm); // add html to container html element
}


function sentLoginData(){
    let userData = {
        "username" : document.getElementById("username").value,
        "hashed_pass" : document.getElementById("password").value,
        }
    let updateString = JSON.stringify(userData);
    window.location = "../back-end/login_register_script.php?login="+updateString;
}


// GENERATE HTML REGISTER FORM
function generateRegisterForm(){
    var registerForm = "<form>";
        registerForm +=     "<label for='firstname'>First Name:</label>";
        registerForm +=     "<input type='text' id='firstname' name='firstname' value='' placeholder='Type first name here...' required >";
        registerForm +=     "<label for='lastname'>Last Name:</label>";
        registerForm +=     "<input type='text' id='lastname' name='lastname' value='' placeholder='Type last name here...' required >";
        registerForm +=     "<label for='email'>Email:</label>";
        registerForm +=     "<input type='email' id='email' name='email' value='' placeholder='Type email here...' required >";
        registerForm +=     "<label for='gender'>Gender:</label>";
        registerForm +=     "<span>";
        registerForm +=         "<label class='gender_radio' for='female'><input  type='radio' name='gender' value='1'>Female</label>";
        registerForm +=         "<label class='gender_radio' for='male'><input  type='radio' name='gender' value='2'>Male</label>";
        registerForm +=         "<label class='gender_radio' for='other'><input  type='radio' name='gender' value='3'>Transgender</label>";
        registerForm +=     "</span>";
        registerForm +=     "<br><br><hr><br>";
        registerForm +=     "<label for='username' min>User Name:</label>";
        registerForm +=     "<input type='email' id='username' name='username' value='' placeholder='This must be an email adress' required >";
        registerForm +=     "<label for='password'>Password:</label>";
        registerForm +=     "<input type='password' id='password' name='password' value='' placeholder='Type password here...' minlength='8' required >";
        registerForm +=     "<input type='button' value='Register' onclick='sentRegisterData()'>";
        registerForm += "</form>";

    $(".container").html(registerForm); // add html to container html element
}
   





function sentRegisterData(){
   

    if (document.getElementById("firstname").value == ""){
        alert("Forgot the enter first name!");
       
    }
    else if (document.getElementById("lastname").value == ""){
        alert("Forgot the enter last name!");
        
    }
    else if (document.getElementById("email").value == ""){
        alert("Forgot the enter email!");
       
    }
    else if (document.getElementById("username").value == ""){
        alert("Forgot the enter username!");
    
    }
    else if (document.getElementById("password").value == ""){
        alert("Forgot the enter password!");
      
    }
    else{
        let userData = {
            "first_name" : document.getElementById("firstname").value,
            "last_name" : document.getElementById("lastname").value,
            "email" : document.getElementById("email").value,
            "id_gender" : document.querySelector("input[name='gender']:checked").value,
            "username" : document.getElementById("username").value,
            "hashed_pass" : document.getElementById("password").value,
            }
        let updateString = JSON.stringify(userData);
        window.location = "../back-end/login_register_script.php?register="+updateString;
    }

}