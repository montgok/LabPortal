<?php

#----------------------------------------------------------------------------------------
#
# Author:               Peter Zeppieri
# Description:          Get most recent ping info from the db
# Creation Date:        2/5/2014
#
#----------------------------------------------------------------------------------------

require_once('/var/www/functions.php');

# time now
$date = date('m-d-Y G:i:s');

# error log
$logfile = '/portal/logs/pingData.php.log';

# ajax vars
$aErrors = array();
$aResults = array();

	# connect to db
        $link = mysqli_connect("localhost", "liferay-user", "1234567", "lportal");
        if(mysqli_connect_errno())
        {
                # log error
                $message = $date.' - ping.php - Cannot connect to database - mysqli_connect_error:'.mysqli_connect_error($link);

                error_log($message, 3, $logfile);

                # handle error 
                $aErrors[] = $message;
		outputJSON($aErrors, $aResults);
		exit;
        }

	# fetch db results for post back in JSON using Ajax.
	$pingDataQuery = "SELECT pingDate, deviceIP, deviceName, deviceStatus, devicePingDetail FROM TR_Devices ORDER BY deviceID";
        $pingDataQueryResult = mysqli_query($link, $pingDataQuery);
	if($pingDataQueryResult === false)
        {
                # log error
                $message = $date.' - ping.php - Query error - Query:'.$pingDataQuery.' - mysqli_error:'.mysqli_error($link);
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

outputJSON($aErrors, $aResults);
?>
