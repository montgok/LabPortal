<?php

#----------------------------------------------------------------------------------------
#
# Author:               Peter Zeppieri
# Creation Date:        2/25/2014
#
#----------------------------------------------------------------------------------------

require_once('/var/www/functions.php');

# time now
$date = date('m-d-Y G:i:s');

# error log
$logfile = '/portal/logs/expect.php.log';

# vars
$response = "";
$command = "";
$portalIP = '192.168.1.251';
$thisDeviceIP = $_GET["deviceIP"];
$thisDeviceHostname = $_GET["deviceHostName"];
$thisDeviceUsername = ""; //$_GET["deviceUsername"];
$thisDevicePassword = ""; //$_GET["devicePassword"];
$thisDeviceCommunicationType = "";
$thisProjectTimestamp = $_GET["projectTimestamp"];
$thisExecutionType = $_GET["executionType"];
$thisSourceFilename = $_GET["sourceFilename"];
$toPath = "";
$cleanupFile = "";

// get username/password/communicationType which is stored in the /portal/conf/devices.conf file.
$file = '/portal/conf/devices.conf';
if(file_exists($file)) {
    	$lines = file($file);
	foreach ($lines as $line_num => $line) {
		if(strstr($line, $thisDeviceHostname)) {
			$thisLineParts = explode("|", $line);
                        $thisDeviceUsername = $thisLineParts[2];
			if(empty($thisDeviceUsername)) {
				echo "\n\n** Error ** expect.php failed to find a Username for device ($thisDeviceHostname) in the /portal/conf/devices.conf file. Please ensure this host entry is set properly to continue.\n\n";
				exit;		
			}
                        $thisDevicePassword = $thisLineParts[3];
			if(empty($thisDevicePassword)) {
				echo "\n\n** Error ** expect.php failed to find a Password for device ($thisDeviceHostname) in the /portal/conf/devices.conf file. Please ensure this host entry is set properly to continue.\n\n";
				exit;		
			}
			$thisDeviceCommunicationType = $thisLineParts[4];
			if(empty($thisDeviceCommunicationType)) {
				echo "\n\n** Error ** expect.php failed to find a Communication Type (scp, tftp, etc.) for device ($thisDeviceHostname) in the /portal/conf/devices.conf file. Please ensure this host entry is set properly to continue.\n\n";
				exit;		
			}
                        break;
                }
        }
}
else {
        echo "\n\n** Error ** expect.php failed to open the /portal/conf/devices.conf file, please ensure this file exists and is readable by the Apache user.\n\n";
        exit;
}

if( ($thisExecutionType == "__RESTORE__") || ($thisExecutionType == "__BASELINE__") ) {
        // if communicationType is scp then the device is most likely a JUNOS device. Move the configuration.gz file from the 
        // projects folder and place into /home/cisco and gunzip it for use by the devices "load override" command.
        if(trim($thisDeviceCommunicationType) == "scp") {
                // move gz file to /home/cisco
                $filenameParts = explode("/", $thisSourceFilename);
                $fromPath = '/var/www/portal/Projects/'.$thisSourceFilename;
                $toPath = '/home/cisco/'.$filenameParts[1].'.gz';
		$cleanupFile = $toPath;

		$thisSourceFilename = $filenameParts[1]; // used later in expectRestore.sh call

                if(!copy($fromPath, $toPath)) {
                        echo "\n\n** Error ** expect.php failed to copy ($fromPath) to ($toPath)\n\n";
                        exit;
                }

                // gunzip file
                $command = 'gunzip -f '.$toPath;
                exec($command, $output, $return_val);
                if($return_val != 0)
                {
                        echo "\n\n** Error ** expect.php failed to gunzip the file ".$toPath = "/home/cisco".$thisSourceFilename.".gz\n\n";
                        exit;
                }
        }
	else {
		$thisSourceFilename = $_GET["sourceFilename"];
		// we must move the sourceFilename to the stfp servers root location (/tftpboot)
		$filenameParts = explode("/", $thisSourceFilename);
		$fromPath = '/var/www/portal/Projects/'.$thisSourceFilename;
		$toPath = '/tftpboot/'.$filenameParts[1];
		$cleanupFile = $toPath;
		$thisSourceFilename = $filenameParts[1]; // used later in expectRestore.sh call
		if(!copy($fromPath, $toPath)) {
			echo "\n\n** Error ** expect.php failed to copy ($fromPath) to ($toPath)\n\n";
			exit;
		}
		else if(!chmod($toPath, 0777)) { 
			echo "\n\n** Error ** expect.php failed to change sourceFilename ($toPath) permissions\n\n";
			exit;
		}
	}
}

// baseline and restore actions do not know the hosts ip so we must find it
// by parsing the /portal/conf/devices.conf file using the hostname as the key
if( ($thisDeviceIP == "__NONE__") || empty($thisDeviceIP) ) {
	$file = '/portal/conf/devices.conf';
	if(file_exists($file)) {
	        $lines = file($file); 
        	foreach ($lines as $line_num => $line) {
			if(strstr($line, $thisDeviceHostname)) {
				$thisLineParts = explode("|", $line);
				$thisDeviceIP = $thisLineParts[0];
				break;
			}
		}
	}
	else {
		echo "\n\n** Error ** expect.php failed to find an IP address for the host ($thisDeviceHostname). Please ensure this host is UP and has a valid IP address and hostname entry in the /portal/conf/devices.conf file.\n\n";
		exit;
	}
}
else if(($thisDeviceHostname == "__NONE__") || empty($thisDeviceHostname)) {
	echo "\n\n** Error ** expect.php failed to find a Hostname for the host at address ($thisDeviceIP). Please ensure this host is UP and has a valid IP address and hostname entry in the /portal/conf/devices.conf file.\n\n";
        exit;	
}

//if($thisExecutionType == "__BASELINE__") {
//        $command = "/usr/bin/expect -f /var/www/expectRestore.sh $thisDeviceIP $thisDeviceHostname $portalIP $thisDeviceUsername $thisDevicePassword $thisSourceFilename";
//}
//else 
if($thisExecutionType == "__BACKUP__") {
	$command = "/usr/bin/expect -f /var/www/expect.sh $thisDeviceIP $thisDeviceHostname $portalIP $thisDeviceUsername $thisDevicePassword $thisProjectTimestamp";
	//echo "\nExecuting command: $command\n\n";
}
//else if( ($thisExecutionType == "__RESTORE__") || ($thisExecutionType == "__BASELINE__") ) {
//        $command = "/usr/bin/expect -f /var/www/expectRestore.sh $thisDeviceIP $thisDeviceHostname $portalIP $thisDeviceUsername $thisDevicePassword $thisSourceFilename";
//}
else {
        $command = "/usr/bin/expect -f /var/www/expectRestore.sh $thisDeviceIP $thisDeviceHostname $portalIP $thisDeviceUsername $thisDevicePassword $thisSourceFilename";
}


$response = "\n\n--> Communicating with $thisDeviceHostname @ $thisDeviceIP\n";
$output = shell_exec($command);
$response = $response.$output;
echo $response;

// cleanup
// remove sourceFilename from /tftpboot directory as it's not needed there anymore
if($thisExecutionType == "__RESTORE__") {
	unlink($cleanupFile);
}
