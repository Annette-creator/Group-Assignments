<?php
    class PhpConverter {
        function __construct() {
		}
        public function convertToJson ($phpArray) {
            return json_encode($phpArray);            
        }
    }
?>    