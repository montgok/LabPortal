<?php
session_start();
require_once('/var/www/databaseFunctions.php');
$responseArray = array();
if(!isset($_GET['id'])) {
	array_push($responseArray, "__FAILURE__");	
}
else {
	$eventQuery = "DELETE FROM TR_Events WHERE eventId = '".$_GET['id']."'";
        $link = connectToDB();
	if($link) { 
		if($result = executeQuery($link, $eventQuery)) {
			array_push($responseArray, "__SUCCESS__");
		} else {
			array_push($responseArray, "__ERROR__");
		}
	} else {
		array_push($responseArray, "__ERROR__");
	}
}
header('Content-type: application/json');
echo json_encode($responseArray);
?>
