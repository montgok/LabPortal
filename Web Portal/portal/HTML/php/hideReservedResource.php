<?php
session_start();
require_once('/var/www/databaseFunctions.php');
$responseArray = array();
if(!isset($_GET['resource'], $_GET['eventStart'], $_GET['eventEnd']))
{
        array_push($responseArray, "__FAILURE__");
}
else {
	// break up eventStart into pure numbers (used for query where clauses)
	$startParts = explode("T", $_GET['eventStart']);
	$datePart = $startParts[0];
	$dateParts = explode("-", $datePart);
	$eventStartDate = $dateParts[0].$dateParts[1].$dateParts[2];
	$eventStartTime = 0;
	if(count($startParts) > 1) {
		$timePart = $startParts[1];
		$timeParts = explode(":", $timePart);
	        $eventStartTime = $timeParts[0].$timeParts[1].$timeParts[2];
	}

	// break up eventEnd into pure numbers (used for query where clauses)
        $endParts = explode("T", $_GET['eventEnd']);
        $datePart = $endParts[0];
        $dateParts = explode("-", $datePart);
        $eventEndDate = $dateParts[0].$dateParts[1].$dateParts[2];
        $eventEndTime = 0;
        if(count($endParts) > 1) {
                $timePart = $endParts[1];
                $timeParts = explode(":", $timePart);
                $eventEndTime = $timeParts[0].$timeParts[1].$timeParts[2];
        }

	// get all rows that have this device reserved.
	$resourceQuery = "SELECT * from TR_Events WHERE resourceDeviceList LIKE '%".$_GET['resource']."%'";
        $link = connectToDB();
        if($link) {
                if($result = executeQuery($link, $resourceQuery)) {
			$show = true; 
			foreach($result as $row) {
				$thisStart = $row['start'];
				$thisEnd = $row['end'];

				$thisStartParts = explode("T", $thisStart);
				$thisDatePart = $thisStartParts[0];
				$thisDateParts = explode("-", $thisDatePart);
			        $thisEventStartDate = $thisDateParts[0].$thisDateParts[1].$thisDateParts[2];	
				if(count($thisStartParts) > 1) {
			                $thisTimePart = $thisStartParts[1];
       			         	$thisTimeParts = explode(":", $thisTimePart);
			                $thisEventStartTime = $thisTimeParts[0].$thisTimeParts[1].$thisTimeParts[2];
			        }

				$thisEndParts = explode("T", $thisEnd);
                                $thisDatePart = $thisEndParts[0];
                                $thisDateParts = explode("-", $thisDatePart);
                                $thisEventEndDate = $thisDateParts[0].$thisDateParts[1].$thisDateParts[2];
                                if(count($thisEndParts) > 1) {
                                        $thisTimePart = $thisEndParts[1];
                                        $thisTimeParts = explode(":", $thisTimePart);
                                        $thisEventEndTime = $thisTimeParts[0].$thisTimeParts[1].$thisTimeParts[2];
                                }  
				// try to find hide condition
				// compare at day level
				if(($thisEventStartTime == 0) || ($eventStartTime == 0)) {
					$thisResponseArray = array("__HIDE__", $_GET['resource']);
					if( ($thisEventStartDate == $eventStartDate) || ($thisEventEndDate == $eventEndDate) ) {
						array_push($responseArray, (array)$thisResponseArray); $show = false; break;
					} else if( ($thisEventEndDate >= $eventStartDate) && ($thisEventEndDate <= $eventEndDate) ) {
						array_push($responseArray, (array)$thisResponseArray); $show = false; break;
					} else if( ($thisEventStartDate <= $eventEndDate) && ($thisEventStartDate >= $eventStartDate) ) {
						array_push($responseArray, (array)$thisResponseArray); $show = false; break;
					}
				} 
				// compate at day and time level
			}
			if($show) {
				$thisResponseArray = array("__SHOW__", $_GET['resource']);
				array_push($responseArray, (array)$thisResponseArray);
			}
		} else {
			$thisResponseArray = array("__SHOW__", $_GET['resource']);
			array_push($responseArray, (array)$thisResponseArray);
		}
        } else {
		array_push($responseArray, "__ERROR__");
	}
				
        //mysqli_close($link);
}
header('Content-type: application/json');
echo json_encode($responseArray);
?>

