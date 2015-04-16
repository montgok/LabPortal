<?php

#----------------------------------------------------------------------------------------
#
# Author:               Peter Zeppieri
# Description:          Parse device list and issue ping command, store results in DB
# Creation Date:        2/1/2014
#
#----------------------------------------------------------------------------------------

require_once('/var/www/functions.php');

# time now
$date = date('m-d-Y G:i:s');

# error log
$logfile = '/portal/logs/ping.php.log';

# ajax vars
$aErrors = array();
$aResults = array();

$pingTableData = array();

# get list of devices
$device_array = parse_devices_conf();
if($device_array == 1)
{
        $aErrors[] = "Nothing to do, no devices found in /portal/conf/devices.conf file";
}
else if($device_array == 2)
{
	$aErrors[] = "Failed to parse /portal/conf/devices.conf file";
}
else
{
	# connect to db
        $link = mysqli_connect("localhost", "liferay-user", "1234567", "lportal");
        if(mysqli_connect_errno())
        {
                # log error
                $message = $date.' - ping.php - Cannot connect to database - mysqli_connect_error:'.mysqli_connect_error($link)."\n";

                error_log($message, 3, $logfile);

                # handle error 
                $aErrors[] = $message;
		outputJSON($aErrors, $aResults);
		exit;
        }

	# iterate through device list, execute ping, store results in db.
	for($x=0; $x<count($device_array); $x++)
	{
		# execute ping on each device
		$this_device_array = explode("|", $device_array[$x]);
		$device_ip = $this_device_array[0];
		$device_name = $this_device_array[1];
		#$command = 'ping -D -c 1 -W 1 '.$device_ip;
		$command = 'ping -D -c 1 '.$device_ip;
		exec($command, $output, $return_val);

		# convert output array to html string
		$output = implode("<br>", $output);

		# store ping results in db
		# create queries
		$deleteQuery = "DELETE from TR_Temp_Devices";
		$insertQuery = "INSERT INTO TR_Temp_Devices (deviceIP, deviceName, deviceStatus, devicePingDetail) VALUES ('$device_ip', '$device_name', '$return_val', '$output')";
		$updateQuery = "UPDATE TR_Temp_Devices SET deviceStatus = '$return_val', devicePingDetail = '$output', deviceName = '$device_name' WHERE deviceIP = '$device_ip'";
		$selectQuery = "SELECT deviceIP from TR_Temp_Devices where deviceIP = '$device_ip'";

		# delete first
		if($x == 0) { $deleteResult = mysqli_query($link, $deleteQuery); }
		
		# determine insert or update for this device
		$selectQueryResult = mysqli_query($link, $selectQuery);
		if($selectQueryResult === false)
		{
			# log error
                        $message = $date.' - ping.php - Query error - Query:'.$selectQuery.' - mysqli_error:'.mysqli_error($link)."\n";
                        error_log($message, 3, $logfile);

                        # handle error 
			# $aErrors[] = $message;
		}			
		else
		{
			if(mysqli_num_rows($selectQueryResult) > 0)
			{
				# update
				$updateQueryResult = mysqli_query($link, $updateQuery);
                                if($updateQueryResult === false)
                                {
                                        # log error
                                        $message = $date.' - ping.php - Query error - Query:'.$updateQuery.' - mysqli_error:'.mysqli_error($link)."\n";
                                        error_log($message, 3, $logfile);

                                        # handle error 
                                }
			}
			else
			{
				# insert
				$insertQueryResult = mysqli_query($link, $insertQuery);
                		if($insertQueryResult === false)
		                {
               		         	# log error
                        		$message = $date.' - ping.php - Query error - Query:'.$insertQuery.' - mysqli_error:'.mysqli_error($link)."\n";
		                        error_log($message, 3, $logfile);

		                        # handle error 
                		}
			}
		}
	}

	# overwrite TR_Devices with data from TR_Temp_Devices
	$deleteQuery = "DELETE FROM TR_Devices";
	$insertQuery = "insert into TR_Devices select * from TR_Temp_Devices";
	$deleteResult = mysqli_query($link, $deleteQuery);
	$insertResult = mysqli_query($link, $insertQuery);
	
	# fetch db results for post back in JSON using Ajax.
	$pingDataQuery = "SELECT pingDate, deviceIP, deviceName, deviceStatus, devicePingDetail FROM TR_Devices ORDER BY pingDate";
        $pingDataQueryResult = mysqli_query($link, $pingDataQuery);
	if($pingDataQueryResult === false)
        {
                # log error
                $message = $date.' - ping.php - Query error - Query:'.$pingDataQuery.' - mysqli_error:'.mysqli_error($link)."\n";
                error_log($message, 3, $logfile);

                # handle error 
                # $aErrors[] = $message;
        }
        else
        {
		while($row = mysqli_fetch_array($pingDataQueryResult, MYSQLI_ASSOC))
		{
			$rows[] = $row;
		}

		foreach($rows as $row)
		{
			$thisPingDate = $row['pingDate'];
			$thisDeviceIP = $row['deviceIP'];
			$thisDeviceName = $row['deviceName'];
			$thisDeviceStatus = $row['deviceStatus'];
			if($thisDeviceStatus == 0) { $thisDeviceStatus = "Up"; } else { $thisDeviceStatus = "Down"; }
			$thisDevicePingDetail = $row['devicePingDetail'];
			$deviceInfoArray = array($thisPingDate, $thisDeviceIP, $thisDeviceStatus, $thisDevicePingDetail, $thisDeviceName);
                        array_push($aResults, (array)$deviceInfoArray);
		}
	}

	# close db connection
	mysqli_close($link);
}

outputJSON($aErrors, $aResults);
?>
