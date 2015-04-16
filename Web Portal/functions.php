<?php

function parse_devices_conf()
{
	$handle = @fopen("/portal/conf/devices.conf", "r");
	if($handle) 
	{
		$device_array = array();
    		while (($buffer = fgets($handle, 4096)) !== false) 
		{
			array_push($device_array, $buffer);		
    		}
    		if (!feof($handle)) 
		{
        		echo "Error: unexpected fgets() fail\n";
    		}
    		fclose($handle);

		if(count($device_array) > 0)
			return $device_array;
		else
			return 1;
	}
	return 2;
}

function outputJSON($aErrors = array(), $aResults = array())
{
        $bFormSent = empty($aErrors) ? true : false;
        $aCombinedData = array(
                'bFormSent' => $bFormSent,
                'aErrors' => $aErrors,
                'aResults' => $aResults
                );

        header('Content-type: application/json');
	echo json_encode($aCombinedData);
        exit;
}

?>
