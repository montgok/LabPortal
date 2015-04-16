<?php
require_once('/var/www/functions.php');

# time now
$date = date('m-d-Y G:i:s');

# error log
$logfile = '/portal/logs/TR_active_users.php.log';

# ajax vars
$aErrors = array();
$aResults = array();

# connect to db
$link = mysqli_connect("localhost", "liferay-user", "1234567", "lportal");
if(mysqli_connect_errno())
{
        # log error
        $message = $date.' - TR_active_users.php - Cannot connect to database - mysqli_connect_error:'.mysqli_connect_error($link);

        error_log($message, 3, $logfile);

        # handle error 
        $aErrors[] = $message;
        outputJSON($aErrors, $aResults);
        exit;
}

$pingDataQuery = "select firstName, lastName, convert_tz(loginDate, '+00:00', '-04:00') as loginDate, TIMESTAMPDIFF(DAY, loginDate, now()) as 'Day', TIMESTAMPDIFF(HOUR, loginDate, now())+4 as 'Hour', TIMESTAMPDIFF(MINUTE, loginDate, now())+(60*4) as 'Min', TIMESTAMPDIFF(SECOND, loginDate, now())+(60*60*4) as 'Sec' from User_ where userId != '10158' AND userId != '10198' group by emailAddress order by loginDate desc";

$pingDataQueryResult = mysqli_query($link, $pingDataQuery);
if($pingDataQueryResult === false)
{
        # log error
        $message = $date.' - TR_active_users.php - Query error - Query:'.$pingDataQuery.' - mysqli_error:'.mysqli_error($link);
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
		$thisFirstName = $row['firstName'];
		$thisLastName = $row['lastName'];
		$thisLoginDate = $row['loginDate'];
		$thisDay = $row['Day'];
		$thisHour = $row['Hour'];
		$thisMin = $row['Min'];
		$thisSec = $row['Sec'];
		$thisLastSeen = '';
		if($thisSec < 60) { $thisLastSeen = ($thisSec == 1) ? $thisSec.' second ago' : $thisSec.' seconds ago'; }
		elseif($thisMin < 60) { $thisLastSeen = ($thisMin == 1) ? $thisMin.' minute ago' : $thisMin.' minutes ago'; }
		elseif($thisHour < 24) { $thisLastSeen = ($thisHour == 1) ? $thisHour.' hour ago' : $thisHour.' hours ago'; }
		else { $thisLastSeen = ($thisDay == 1) ? $thisDay.' day ago' : $thisDay.' days ago'; } 
                $userInfoArray = array('firstName' => $thisFirstName, 'lastName' => $thisLastName, 'loginDate' => $thisLoginDate, 'lastSeen' => $thisLastSeen);
                array_push($aResults, (array)$userInfoArray);
       	}
}
        
# close db connection
mysqli_close($link);
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
</head>
<body class="bg-img-num8">
    
    <div class="container bg-white">        
	<div class="row">
            <div class="col-md-12">
                <div class="block">
                    <div class="content bg-white text-danger">
                        <table id="ping_info_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered table-striped sortable_simple_col3sorted text-danger13">
			    <thead>
                                <tr>
                                    <th width="34%">Name</th>
                                    <th width="33%">Last Seen</th>
                                    <th width="33%">Last Login Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                for($x=0; $x<count($aResults); $x++)
                                {
                                        echo '<tr>';
                                        echo '<td>'.$aResults[$x]['firstName'].' '.$aResults[$x]['lastName'].'</td>';
                                        echo '<td>'.$aResults[$x]['lastSeen'].'</td>';
                                        echo '<td>'.$aResults[$x]['loginDate'].'</td>';
                                        echo '</tr>';
                                }
                                ?>
                            </tbody>
                        </table>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
