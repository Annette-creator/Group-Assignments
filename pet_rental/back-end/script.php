<?php
	include_once("./includes/autoloader.inc.php");
	$db_handle = DBConnect::getInstance(); 
	$animal = new Animal($db_handle);
	$utility = new Utility($db_handle);
	$converter = new PhpConverter;

	if (!empty($_GET)) {
		$object = json_decode($_GET["update"]);
		$phpArray = (array)$object;
		var_dump ($phpArray);
		$table_name = "pets";
		$utility->updateRow("pets", $phpArray);
		header('Location: ../front-end/dieren.html');
	}
	//get the parameter from URL
	elseif(isset($_POST["id_pet"])) {
		$phpArray = $animal->getAnimalById($_POST["id_pet"]);
		echo $converter->convertToJson($phpArray);
	} else {
		$phpArray = $animal->getAllAnimals();
		echo $converter->convertToJson($phpArray);
	}
?>