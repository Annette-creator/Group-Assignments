<?php 
class Utility {
	public $dbh;
    public function __construct($db_handle) { 
		$this->dbh = $db_handle; 
    } 

    function deleteRow($table_name, $form_data) {
        //SETUP prepared statment
        $where = "WHERE ".$table_name.".".array_keys($form_data)[0]."=:".array_keys($form_data)[0];
        $sql = "DELETE FROM ".$table_name." ".$where;
        echo $sql;
        $stmt = $this->dbh->prepare($sql);

        foreach($form_data as $column => $value) {
            $bind= ":".$column;
            $stmt->bindValue($bind, $value);
        }
        $stmt->execute();
    }

    function updateRow($table_name, $form_data) {
        //SETUP prepared statment
        $sql = "UPDATE ".$table_name." SET ";
        // loop and build the column /
        $sets = array();
        //Splits the Array into strings to create a prepared statement query
        foreach(array_slice($form_data,1) as $column => $value) {
            $sets[] = $table_name.".".$column."=:".$column;
        }
        //Splits the arrays to create the SET for the query
        $sql .= implode(', ', $sets);

        $where = "WHERE ".$table_name.".".array_keys($form_data)[0]."=:".array_keys($form_data)[0];

        //Add WHERE to the query
        $sql .= " ".$where;
        $stmt = $this->dbh->prepare($sql);
        //Bind perpared statement to values
        foreach($form_data as $column => $value) {
            $bind= ":".$column;
            $stmt->bindValue($bind, $value);
        }
        //Executes query
        $stmt->execute();
    }


    function findObject($table_name, $form_data) {
        //Check is the variable form_data contains a password
        $where = "WHERE ".$table_name.".".array_keys($form_data)[0]."=:".array_keys($form_data)[0];

        //Change this keyword to password or pass, whatever comes back from the form.
        if(array_key_exists('hashed_pass', $form_data)) {
            $where .= " AND ".$table_name.".hashed_pass =:hashed_pass";
        } 
        // prepare statement  
        $sql = "SELECT ".$table_name.".".array_keys($form_data)[0]." FROM ".$table_name." ".$where;
        $stmt = $this->dbh->prepare($sql);
        #echo "<br>".$sql."<br>";
    
        //loop through all prepared statement and set the value
        foreach($form_data as $column => $value) {
            $bind= ":".$column;
            #echo $bind.":".$value;
            $stmt->bindValue($bind, $value);
        }

        $stmt->execute();

        // retrieve result
        $result = $stmt->fetch();
        if ($result) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
}
?>