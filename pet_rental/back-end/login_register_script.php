<?php
	include_once("./includes/autoloader.inc.php");
	session_start();
	
	$db_handle = DBConnect::getInstance(); 
	$converter = new PhpConverter;
	$utility = new Utility($db_handle);

	if (!empty($_GET["logout"])){
		$_SESSION["login"] = NULL;
		header('Location: ../front-end/index.html');
	}elseif (!empty($_SESSION["login"])){
		$phpArray = array($_SESSION["login"][0]);
		//after echo, the JSON object can be handled by javascript.
		echo $converter->convertToJson($phpArray);
	}elseif (!empty($_GET["login"])) {
		$object = json_decode($_GET["login"]);
		$userArray = (array)$object;
		$user = new User($userArray["username"], $userArray["hashed_pass"], $db_handle);
		$userArray["hashed_pass"] = md5($userArray["hashed_pass"]);
		if ($utility->findObject("users", $userArray) === FALSE) {
			echo "your username or password is wrong";
		}else{
			$_SESSION["login"] = array($user->getUsername(), $user->getPassword());
			//var_dump ($_SESSION["login"]);
			header('Location: ../front-end/index.html');
		}
	}elseif (!empty($_GET["register"])){
		$object = json_decode($_GET["register"]);
		$userArray = (array)$object;
		$user = new User($userArray["username"], $userArray["hashed_pass"], $db_handle);
		if ($utility->findObject("users", array("username" => $userArray["username"]))) {
			echo "this username allready exists";
		}else {
			$user->createAccount($userArray); 
		}
		header('Location: ../front-end/login.html');
	}else{
		$phpArray = array("loginData" => "emptyData");  
		echo $converter->convertToJson($phpArray);
	}

?>