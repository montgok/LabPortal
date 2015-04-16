<?php
if(empty($_GET["projectFolderName"]) || empty($_GET["projectTimestamp"])) {
	echo "__ERROR__";
	exit;
}
else {
	$projectFolderName = $_GET["projectFolderName"];
	if(!empty($_GET["existingProjectFolder"])) {
		$projectFolderName = $projectFolderName."_U";
	}

	foreach (glob("/tftpboot/".$_GET["projectTimestamp"]."_*_Cfg") as $fromPath) {
		$filename = explode("/", $fromPath);
		$toPath = "/var/www/portal/Projects/".$projectFolderName."/".$filename[2];
		if(!rename($fromPath, $toPath)) {
			echo "__ERROR__ - Failed to move $fromPath to $toPath";
	                exit;
		}
	}

	echo "__SUCCESS__";
	exit;
}
?>
