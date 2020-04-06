<?php
class DBConnect {

	static $db;
    private $dbh;
   
	private function __construct() {
        try {
            $host = 'localhost';
			$user = 'root';
			$password = '';
			$dbname = 'groepsopdracht_rentapet';

			//Set DSN
			$dsn = 'mysql:host='.$host.';dbname='.$dbname;
			 
			 //Checks if machine is mac, if so chance the password to root.
			$os_mac = strpos($_SERVER['HTTP_USER_AGENT'], "Macintosh; Intel Mac OS X");
			if($os_mac) {
				$password = 'root';
			}

			$this->dbh = new PDO($dsn, $user, $password);
			$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

			$this->dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
			$this->dbh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } 
        catch (PDOException $e) {
			echo $e->getMessage();
		}
	}
    public static function getInstance(){ 
		if (!isset(DBConnect::$db)) { 
			DBConnect::$db = new DBConnect() ; 
		} 
		return DBConnect::$db->dbh; 
	} 
}
?>