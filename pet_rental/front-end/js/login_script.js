$.get( "../back-end/login_register_script.php", function(data) {
    console.log(typeof data)
    console.log(data)
    data = JSON.parse(data);
    if (data.loginData === "emptyData"){
       console.log("empty");
    }else{
        showUsername(data);
    }
});

function showUsername(response) {
	let username = document.querySelector("li.username") 
	console.log(username) 
	username.style = "display:block;"
	let usernameText = document.querySelector("a.usernameText")
	usernameText.innerText = response[0]

	let account_status = document.querySelector("a.account_status")
	account_status.innerText = "Logout"
	account_status.href = "../back-end/login_register_script.php?logout=1"
}