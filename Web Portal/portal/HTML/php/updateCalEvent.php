<?php
session_start();
require_once('/var/www/databaseFunctions.php');
$responseArray = array();
if(!isset($_GET['eventTitle']) && !isset($_GET['eventStartDate']) && !isset($_GET['eventEndDate'])) {
	array_push($responseArray, "__FAILURE__");	
}
else {
	// insert event into database
	$TR_EventsQuery = "UPDATE TR_Events SET
		title = '".$_GET['eventTitle']."',
		start = '".$_GET['eventStartDate']."',
		end = '".$_GET['eventEndDate']."',
		description = '".$_GET['eventDescription']."',
		resourceDeviceList = '".$_GET['eventResourceDeviceList']."',
		resourcePersonList = '".$_GET['eventResourcePersonList']."'
		WHERE eventId = '".$_GET['thisEventId']."'";
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
