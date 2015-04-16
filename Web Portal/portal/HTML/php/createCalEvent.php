<?php
session_start();
require_once('/var/www/databaseFunctions.php');
$responseArray = array();
if(!isset($_GET['eventTitle']) && !isset($_GET['eventStartDate']) && !isset($_GET['eventEndDate'])) {
	array_push($responseArray, "__FAILURE__");	
}
else {
	// insert event into database
	$TR_EventsQuery = "INSERT INTO TR_Events (
		title, 
		start, 
		end, 
		createdBy, 
		description,
		resourceDeviceList,
		resourcePersonList
	) values (
		'".$_GET['eventTitle']."', 
		'".$_GET['eventStartDate']."', 
		'".$_GET['eventEndDate']."', 
		'".$_GET['thisUserName']."', 
		'".$_GET['eventDescription']."',
		'".$_GET['eventResourceDeviceList']."',
		'".$_GET['eventResourcePersonList']."'
	)";
        $link = connectToDB();
	if($link) { 
		if($result = executeQuery($link, $TR_EventsQuery)) {
    			mysqli_free_result($result);
			array_push($responseArray, "__SUCCESS__");
		} else {
			array_push($responseArray, "__ERROR__");
		}
	} else {
		array_push($responseArray, "__ERROR__");
	}
	mysqli_close($link);
}
header('Content-type: application/json');
echo json_encode($responseArray);
?>
