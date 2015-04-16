<?php
session_start();
$color = "red";
$_SESSION['color']=$color;


require_once('/var/www/functions.php');

# time now
$date = date('m-d-Y G:i:s');

# error log
$logfile = '/portal/logs/TR_component_table_sortable.php.log';

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

        # fetch db results for post back in JSON 
        $pingDataQuery = "SELECT pingDate, deviceIP, deviceName, deviceStatus, devicePingDetail FROM TR_Devices ORDER BY pingDate";
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


        # extract total/up/down numbers from results
        $totalDevices = 0; $devicesUp = 0; $devicesDown = 0;
        for($x=0; $x<count($aResults); $x++)
        {
                $totalDevices += 1;
                if($aResults[$x][2] == "Up") { $devicesUp += 1; } else { $devicesDown += 1; }
        }
?>
<!DOCTYPE html>
<html lang="en">
<head>        
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    
    <link rel="icon" type="image/ico" href="favicon.ico"/>
    
    <link href="css/stylesheets.css" rel="stylesheet" type="text/css" />        
    
    <script type='text/javascript' src='js/plugins/jquery/jquery.min.js'></script>
    <script type='text/javascript' src='js/plugins/jquery/jquery-ui.min.js'></script>   
    <script type='text/javascript' src='js/plugins/jquery/jquery-migrate.min.js'></script>
    <script type='text/javascript' src='js/plugins/jquery/globalize.js'></script>    
    <script type='text/javascript' src='js/plugins/bootstrap/bootstrap.min.js'></script>
    
    <script type='text/javascript' src='js/plugins/uniform/jquery.uniform.min.js'></script>
    <script type='text/javascript' src='js/plugins/datatables/jquery.dataTables.min.js'></script>
    
    <script type='text/javascript' src='js/plugins.js'></script>    
    <script type='text/javascript' src='js/actions.js'></script>
    <!--script type='text/javascript' src='js/settings.js'></script-->
</head>
<body class="bg-img-num8">
    
    <div class="container bg-white">        
        <div class="row">
	<br>
            <div class="col-md-12">
                <div class="block">
                    <div class="content bg-white text-danger">
                        <table id="ping_summary_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered table-striped text-danger13">
			    <thead>
                                <tr>
                                    <th width="33%">Total Devices</th>
                                    <th width="33%">Devices Up</th>
                                    <th width="34%">Devices Down</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><?php echo $totalDevices; ?></td>
                                    <td><?php echo $devicesUp; ?></td>
                                    <td><?php echo $devicesDown; ?></td>
                                </tr>
                            </tbody>
                        </table>                                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container bg-white">        
	<div class="row">
            <div class="col-md-12">
                <div class="block">
                    <div class="content bg-white text-danger">
                        <table id="ping_info_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered table-striped sortable text-danger13">
			    <thead>
                                <tr>
                                    <th width="25%">Last Ping Time</th>
                                    <th width="25%">Device IP</th>
                                    <th width="25%">Device Name</th>
                                    <th width="25%">Device Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                for($x=0; $x<count($aResults); $x++)
                                {
                                        echo "<tr>";
                                        echo "<td>".$aResults[$x][0]."</td>";
                                        echo "<td>".$aResults[$x][1]."</td>";
                                        echo "<td>".$aResults[$x][4]."</td>";
                                        echo "<td>".$aResults[$x][2]."</td>";
                                        echo "</tr>";
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
<br>
    </div>

    <script type="text/javascript" src="/js/portal.js"></script>
    <script type="text/javascript">
        // get db ping data evey 20 seconds and perform ajax screen refresh
        setInterval(function () {
                executePing(); 
        },20000); 
    </script>

</body>
</html>
