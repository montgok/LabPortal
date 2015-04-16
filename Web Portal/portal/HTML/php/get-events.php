<?php
require_once('/var/www/databaseFunctions.php');
$responseArray = array();
$TR_EventsQuery = "SELECT * FROM TR_Events";
$link = connectToDB();
if($link) {
        $result = executeQuery($link, $TR_EventsQuery);
	foreach($result as $row) {
		$thisEventId = $row['eventId'];
		$thisEventTitle = $row['title'];
		$thisEventStart = $row['start'];
		$thisEventEnd = $row['end'];
		$thisEventCreatedBy = $row['createdBy'];
		$thisEventDescription = $row['description'];
		$thisEvent = array('id' => $thisEventId, 'title' => $thisEventTitle, 'start' => $thisEventStart, 'end' => $thisEventEnd, 'createdBy' => $thisEventCreatedBy, 'description' => $thisEventDescription);
		array_push($responseArray, (array)$thisEvent);
	}
	//mysqli_close($link);
}
header('Content-type: application/json');
echo json_encode($responseArray);
?>
