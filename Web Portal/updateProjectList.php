<?php

# get a list of existing project folders (if any)

$projectFolders = array();
$responseArray = array();
$command = 'find /var/www/portal/Projects/ -mindepth 1 -maxdepth 1 -type d | sort --ignore-case | grep -v "_A"';
exec($command, $output, $return_val);
for($x = 0; $x<count($output); $x++) {
        array_push($projectFolders, $output[$x]);
	if($x+1 == count($output)) {
		array_push($responseArray, "__SUCCESS__");
		array_push($responseArray, $projectFolders);
	}
}
header('Content-type: application/json');
echo json_encode($responseArray);
//$array = array("one", "two", "three");
//echo json_encode($array);
?>
