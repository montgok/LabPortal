<?php
$responseArray = array();


//--------------- DB Code Below -------------------
        # connect to db
        $link = mysqli_connect("localhost", "liferay-user", "1234567", "lportal");
        if(mysqli_connect_errno())
        {
		array_push($responseArray, "__ERROR__");
		array_push($responseArray, $date.' - repopulatePhpArray - Cannot connect to database - mysqli_connect_error:'.mysqli_connect_error($link));
        }

        # fetch db results for post back in JSON 
        $pingDataQuery = "SELECT deviceIP, deviceName, deviceStatus FROM TR_Devices ORDER BY deviceID";
        //$pingDataQuery = "SELECT deviceIP, deviceName, deviceStatus FROM TR_Devices WHERE deviceName = 'c3750a' ORDER BY deviceID";
        $pingDataQueryResult = mysqli_query($link, $pingDataQuery);
        if($pingDataQueryResult === false)
        {
		array_push($responseArray, "__ERROR__");
                array_push($responseArray, $date.' - repopulatePhpArray - Query error - Query:'.$pingDataQuery.' - mysqli_error:'.mysqli_error($link));
        }
        else
        {
		array_push($responseArray, "__SUCCESS__");
                while($row = mysqli_fetch_array($pingDataQueryResult, MYSQLI_ASSOC))
                {
                        $rows[] = $row;
                }

                # extract total/up/down numbers from results
                $totalDevices = 0; $devicesUp = 0; $devicesDown = 0;

                foreach($rows as $row)
                {
                        $totalDevices += 1;
                        if($row['deviceStatus'] == 0) { $devicesUp += 1; } else { $devicesDown += 1; }
                }

                foreach($rows as $row)
                {
                        if($row['deviceStatus'] == 0)
                        {
                                $thisDeviceIP = $row['deviceIP'];
                                $thisDeviceName = $row['deviceName'];

                                $deviceInfoArray = array($thisDeviceIP, $thisDeviceName);
                                array_push($responseArray, (array)$deviceInfoArray);
                        }
                }
        }

        # close db connection
        mysqli_close($link);
//--------------- End DB Code  -------------------
header('Content-type: application/json');
echo json_encode($responseArray);
?>
