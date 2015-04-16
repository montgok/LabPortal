<?php
require_once('/var/www/functions.php');

# time now
$date = date('m-d-Y G:i:s');

# error log
$logfile = '/portal/logs/createExpectBackupScript.php.log';

# ajax vars
$aErrors = array();
$aResults = array();

//********** BEGIN DB CODE ***************
        # connect to db
        $link = mysqli_connect("localhost", "liferay-user", "1234567", "lportal");
        if(mysqli_connect_errno())
        {
                # log error
                $message = $date.' - createExpectBackupScript.php - Cannot connect to database - mysqli_connect_error:'.mysqli_connect_error($link);
                error_log($message, 3, $logfile);
                exit;
        }

        # fetch db results for post back in JSON 
        $pingDataQuery = "SELECT deviceIP, deviceName, deviceStatus FROM TR_Devices ORDER BY deviceID limit 1";
        $pingDataQueryResult = mysqli_query($link, $pingDataQuery);
        if($pingDataQueryResult === false)
        {
                # log error
                $message = $date.' - createExpectBackupScript.php - Query error - Query:'.$pingDataQuery.' - mysqli_error:'.mysqli_error($link);
                error_log($message, 3, $logfile);
		exit;
        }
        else
        {
                while($row = mysqli_fetch_array($pingDataQueryResult, MYSQLI_ASSOC))
                {
                        $rows[] = $row;
                }

                foreach($rows as $row)
                {
                        if($row['deviceStatus'] == 0)
                        {
                                $thisDeviceName = $row['deviceName'];
                                array_push($aResults, $thisDeviceName);
                        }
                }
        }

        # close db connection
        mysqli_close($link);
//********** END DB CODE ***************

// expect vars
$expectHeader = '';
$expectBodyArray = array();
$expectFooter = '';

for($x=0; $x<count($aResults); $x++) {
	$thisExpectBody = '';
	$file = '/portal/conf/expect/'.$aResults[$x].'_backup.cmd';
	if(file_exists($file)) {
		$lines = file($file); //, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
print_r($lines); exit;
		foreach ($lines as $line_num => $line) {
echo $line."<br>";
		/*	if(strpos($line, "expect") !== false) {
				echo "expect found - line: ".htmlspecialchars($line)."<br><br>";
			}
			else { echo "no"; }
*/
/*
$pos = strpos($mystring, $findme);

// The !== operator can also be used.  Using != would not work as expected
// because the position of 'a' is 0. The statement (0 != false) evaluates 
// to false.
if ($pos !== false) {
     echo "The string '$findme' was found in the string '$mystring'";
         echo " and exists at position $pos";
} else {
     echo "The string '$findme' was not found in the string '$mystring'";
}
?>
expect "Password:*"
send "${password}\r"
expect "${prompt}"
send "copy running-config tftp:\r"
expect "Address*"
send "${portalIP}\r"
expect "Destination*"
send "${filename}\r"
expect "${prompt}"
send "exit\r"



        tsa {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "copy running-config tftp:\r"
                sleep 1

                expect "Address*"
                send "${portalIP}\r"
                sleep 1

                expect "Destination*"
                send "${filename}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
        }
*/



		}
	}
	else {
	}
}
/*
/portal/conf/expect/
total 4
-rw-r--r-- 1 root root 210 Mar  8 21:56 tsa_backup.cmd
*/

?>
