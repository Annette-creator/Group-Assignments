<?php 
class Animal {
	public $dbh;
    public function __construct($db_handle) { 
		$this->dbh = $db_handle; 
    } 

    //Get animal based on ID
    public function getAnimalById($id) {  
        $sql = "SELECT pets.id_pet, pets.name, breeds.breed, genders.gender, pets.rent_per_day, pets.date_of_birth, pets.description  
        FROM pets, breeds, genders 
        WHERE pets.id_breed = breeds.id_breed AND pets.id_gender = genders.id_gender AND pets.id_pet=:id";

        $stmt = $this->dbh->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $animal = $stmt->fetch();

        //Single result
        return $animal;
    }

    //Get all animals
    public function getAllAnimals() {   
        $sql = "SELECT pets.id_pet, pets.name, breeds.breed, genders.gender, pets.rent_per_day, pets.date_of_birth, pets.description 
        FROM pets, breeds, genders
        WHERE pets.id_breed = breeds.id_breed AND pets.id_gender = genders.id_gender";

        $stmt = $this->dbh->prepare($sql);
        $stmt->execute();
        $animals = $stmt->fetchAll();

        //Multuple results
        return $animals;
    } 
}
?>