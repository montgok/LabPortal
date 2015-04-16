<?php
if(empty($_GET["projectFolderName"])) {
	echo "__ERROR__";
	exit;
}
else {
	// if we're updating an existing project...
	// add _U to new project folder, add _A to existing project folder (the old one)
	if(!empty($_GET["existingProjectFolder"])) {
		// create new project with _U
		$newFolderPath = '/var/www/portal/Projects/'.$_GET["projectFolderName"].'_U';
                if(!mkdir($newFolderPath, 0700, true)) {
                        echo "__ERROR__ - Failed to create folder $newFolderPath";
                        exit;
                }

		// archive existing project with _A
		$thisExistingProjectFolder = '/var/www/portal/Projects/'.$_GET["existingProjectFolder"];
		if(!empty($_GET["has_UFlag"])) {
			//$fromPath = '/var/www/portal/Projects/'.$thisExistingProjectFolder.'_U';
			//$toPath = '/var/www/portal/Projects/'.$thisExistingProjectFolder.'_A';
			$fromPath = $thisExistingProjectFolder.'_U';
			$toPath = $thisExistingProjectFolder.'_A';
			if(!rename($fromPath, $toPath)) {
				echo "__ERROR__ - Failed to move folder from $fromPath to $toPath";
				exit;
			}
		}
		else {
			//$fromPath = '/var/www/portal/Projects/'.$thisExistingProjectFolder;
			//$toPath = '/var/www/portal/Projects/'.$thisExistingProjectFolder.'_A';
			$fromPath = $thisExistingProjectFolder;
			$toPath = $thisExistingProjectFolder.'_A';
			if(!rename($fromPath, $toPath)) {
				echo "__ERROR__ - Failed to move folder from $fromPath to $toPath";
				exit;
			}
		}
	}
	else {
	// create new project folder
		$newFolderPath = '/var/www/portal/Projects/'.$_GET["projectFolderName"];
        	if(!mkdir($newFolderPath, 0700, true)) {
                	echo "__ERROR__";
	                exit;
	        }
	}

	echo "__SUCCESS__";
	exit;
}
?>
