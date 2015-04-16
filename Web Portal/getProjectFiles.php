<?php
$responseArray = array();
if(empty($_GET["projectFolderName"])) {
	array_push($responseArray, "__ERROR__");
        array_push($responseArray, "getProjectFiles.php - projectFolderName value is empty.");
}
else {
	$projectFolderName = $_GET["projectFolderName"];
	$command = 'ls -1 /var/www/portal/Projects/'.$projectFolderName.'/';
	$outputArray = exec($command, $output, $return_val);
	if($return_val != 0) {
		array_push($responseArray, "__ERROR__");
                array_push($responseArray, "getProjectFiles.php - Bad return value, failed to get list of project config files. (return_val:$return_val, output:$output)");
	}
	else {
		if(count($output) <= 0) {
			array_push($responseArray, "__ERROR__");
	                array_push($responseArray, "getProjectFiles.php - There are no config files associated with this project.");
		}
		else {
			array_push($responseArray, "__SUCCESS__");
                	array_push($responseArray, $output);
		}
        }
}
header('Content-type: application/json');
echo json_encode($responseArray);
?>
