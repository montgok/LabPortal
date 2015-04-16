<?php
session_start();
require_once('/var/www/databaseFunctions.php');
$responseArray = array();
if(!isset($_GET['id'])) {
	array_push($responseArray, "__FAILURE__");	
}
else {
	$eventQuery = "SELECT * FROM TR_Events WHERE eventId = '".$_GET['id']."'";
        $link = connectToDB();
	if($link) { 
		if($result = executeQuery($link, $eventQuery)) {
			array_push($responseArray, "__SUCCESS__");
                        foreach($result as $row) {
				$thisEventId = $row['eventId'];
				$thisTitle = $row['title'];
				$thisStart = $row['start'];
				$thisStartDate = $thisStart;
				$thisStartTime = "__NONE__";
				if(strstr($thisStart, "T")) {
					$thisStartParts = explode("T", $thisStart);
					$thisStartDate = $thisStartParts[0];	
					$thisStartTime = $thisStartParts[1];	
				}
				// convert yyyy-mm-dd to mm/dd/yyyy
				$thisStartDateParts = explode("-", $thisStartDate);	
				$thisStartDate = $thisStartDateParts[1].'/'.$thisStartDateParts[2].'/'.$thisStartDateParts[0];

				$thisEnd = $row['end'];
				$thisEndDate = $thisEnd;
				$thisEndTime = "__NONE__";
				if(strstr($thisEnd, "T")) {
					$thisEndParts = explode("T", $thisEnd);
					$thisEndDate = $thisEndParts[0];
					$thisEndTime = $thisEndParts[1];
				}
				// convert yyyy-mm-dd to mm/dd/yyyy
				$thisEndDateParts = explode("-", $thisEndDate);	
				$thisEndDate = $thisEndDateParts[1].'/'.$thisEndDateParts[2].'/'.$thisEndDateParts[0];
				$thisCreatedBy = $row['createdBy'];
				$thisDescription = $row['description'];
				$thisResourceDeviceList = $row['resourceDeviceList'];
				if(strstr($thisResourceDeviceList, "|")) {
					$thisResourceDeviceListParts = explode("|", $thisResourceDeviceList);
					$thisResourceDeviceList = "";
					for($x=0; $x<count($thisResourceDeviceListParts); $x++) {
						if($x == 0) {
							$thisResourceDeviceList = " - ".$thisResourceDeviceListParts[$x];
						} else if($thisResourceDeviceListParts[$x] == "") {
							continue;
						} else {
							$thisResourceDeviceList = $thisResourceDeviceList."<br> - ".$thisResourceDeviceListParts[$x];
						}
					}
				}
				$thisResourcePersonList = $row['resourcePersonList'];
				if(strstr($thisResourcePersonList, "|")) {
                                        $thisResourcePersonListParts = explode("|", $thisResourcePersonList);
                                        $thisResourcePersonList = "";
                                        for($x=0; $x<count($thisResourcePersonListParts); $x++) {
                                                if($x == 0) {
                                                        $thisResourcePersonList = " - ".$thisResourcePersonListParts[$x];
                                                } else if($thisResourcePersonListParts[$x] == "") {
                                                        continue;
                                                } else {
                                                        $thisResourcePersonList = $thisResourcePersonList."<br> - ".$thisResourcePersonListParts[$x];
                                                }
                                        }
                                }
				$eventArray = array('eventId' => $thisEventId, 'title' => $thisTitle, 'createdBy' => $thisCreatedBy, 'description' => $thisDescription, 'resourceDeviceList' => $thisResourceDeviceList, 'resourcePersonList' => $thisResourcePersonList, 'startDate' => $thisStartDate, 'startTime' => $thisStartTime, 'endDate' => $thisEndDate, 'endTime' => $thisEndTime);
                                array_push($responseArray, (array)$eventArray);
				break;
			}
		} else {
			array_push($responseArray, "__ERROR__");
		}
	} else {
		array_push($responseArray, "__ERROR__");
	}
	//mysqli_close($link);
}
header('Content-type: application/json');
echo json_encode($responseArray);
?>
