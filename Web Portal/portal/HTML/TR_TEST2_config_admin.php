<?php
require_once('/var/www/functions.php');

# time now
$date = date('m-d-Y G:i:s');

# error log
$logfile = '/portal/logs/TR_config_admin.php.log';

# ajax vars
$aErrors = array();
$aResults = array();
$projectFolders = array();

$baselineIdentified = "__NO__";
$baselineFolder = "";

//--------------- DB Code Below -------------------
        # connect to db
        $link = mysqli_connect("localhost", "liferay-user", "1234567", "lportal");
        if(mysqli_connect_errno())
        {
                # log error
                $message = $date.' - ping.php - Cannot connect to database - mysqli_connect_error:'.mysqli_connect_error($link);

                error_log($message, 3, $logfile);

                # handle error 
                //$aErrors[] = $message;
                exit;
        }

        # fetch db results for post back in JSON 
        $pingDataQuery = "SELECT deviceIP, deviceName, deviceStatus FROM TR_Devices ORDER BY deviceID limit 10";
        //$pingDataQuery = "SELECT deviceIP, deviceName, deviceStatus FROM TR_Devices WHERE deviceName = 'c3750a' ORDER BY deviceID";
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
                                array_push($aResults, (array)$deviceInfoArray);
                        }
                }
        }

        # close db connection
        mysqli_close($link);
//--------------- End DB Code  -------------------

# get a list of existing project folders (if any)
$command = 'find /var/www/portal/Projects/ -mindepth 1 -maxdepth 1 -type d | sort --ignore-case | grep -v "_A"';
exec($command, $output, $return_val);
for($x = 0; $x<count($output); $x++) {
	array_push($projectFolders, $output[$x]);
}

// get baseline project name
$file = '/portal/conf/baseline.conf';
if(file_exists($file)) {
        $lines = file($file); //, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                
	foreach ($lines as $line_num => $line) {
		if(strstr($line, "baseline=")) {
			$lineParts = explode("=", $line);
			$baselineIdentified = $lineParts[1];
			break;
		}
	}
}
else {
	$baselineIdentified = "__NO__";
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
    <script type='text/javascript' src='js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js'></script>    
    <script type='text/javascript' src='js/plugins/uniform/jquery.uniform.min.js'></script>
    <script type='text/javascript' src='js/plugins/datatables/jquery.dataTables.min.js'></script>
    <script type='text/javascript' src='js/plugins.js'></script>    
    <script type='text/javascript' src='js/actions.js'></script>

</head>
<body class="bg-img-num8">
    <div class="container bg-white">
        <div class="row">
	<br>
            <div class="col-md-12">
                <div class="block">
                    <div class="content controls bg-white text-danger">
			<table id="config_admin_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered text-danger13">
                            <thead>
                                <tr>
                                    <th width="33%"><center>Revert to Base Config</center></th>
                                    <th width="33%"><center>Backup Lab</center></th>
                                    <th width="34%"><center>Restore Lab</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><center>
                                        <!--button type="button" class="btn btn-danger">Baseline</button-->
                                        <a onclick="prepForBaseline()" href="#modal_baseline" data-toggle="modal" class="btn btn-danger">Baseline</a>
                                        <br><br><span>All devices will be brought to the approved baseline configuration.<strong><sup>*</sup></strong>

                                    <td><center>
                                        <!--button type="button" class="btn btn-success">Backup</button-->
                                        <a onclick="prepForBackup()" href="#modal_backup" data-toggle="modal" class="btn btn-success">Backup</a>
                                        <br><br><span>The configuration state of all devices will be backed up and saved into a unique Project folder.<strong><sup>*</sup></strong></span></center></td>
                                    <td><center>
                                        <!--button type="button" class="btn btn-primary">Restore</button-->
                                        <a onclick="prepForRestore()" href="#modal_restore" data-toggle="modal" class="btn btn-primary">Restore</a>
                                        <br><br><span>Select a Project to restore to the environment.<strong><sup>*</sup></strong></span></center></td>
                                </tr>	
				<tr>
                                    <td colspan="3"><center><strong><br><sup>* </sup>Baseline</strong>, <strong>Backup</strong> and <strong>Restore</strong> functionality will be executed on <strong>Up</strong> devices only.<br>Please see device status info list below for more detail.</center><br>
                                        <table id="ping_summary_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered text-danger13">
                                            <thead>
                                                <tr>
                                                    <th width="33%"><center>Total Devices</center></th>
                                                    <th width="33%"><center>Devices Up</center></th>
                                                    <th width="34%"><center>Devices Down</center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><center><?php echo $totalDevices; ?></center></td>
                                                    <td><center><?php echo $devicesUp; ?></center></td>
                                                    <td><center><?php echo $devicesDown; ?></center></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br><br><br><br><br><br><br><br><br><br><br><br>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="modal modal-danger" id="modal_baseline" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Baseline</h4>
                </div>
                <div class="modal-body clearfix">
               	    <div id="baseline_scrollDiv" class="scroll" style="height:400px;">
			    
			<!-- begin baseline_backupDiv -------------------------------------------------------------------------->
			<div id="baseline_backupDiv">
			<!-- begin border table -->
                        <table cellpadding="0" cellspacing="0" width="100%" class="table table-bordered"><tr><td>
                        <!-- begin border table -->
<div class="col-md-12">
<div id="baseline_backupQuestionDiv">
<center><h6>Would you like to backup the environment before<br>submitting the baseline?</h6><label><input type="checkbox" id="baselineDiv_backupCheck" class="baselineDiv_backupCheck"/>Yes</label></center>
</div>
<div id="baseline_backupInfoHeaderDiv">
<center><h6>Backup:</h6></center>
</div>
</div>


<div id="baseline_backupControlsDiv">
<div class="col-md-12">
    <br><center><h6>Choose to create a New Project or update an Existing Project.</h6></center>
</div> <!-- end col -->

<div class="col-md-6">
<table id="config_admin_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered" style="BACKGROUND-COLOR: transparent">
    <thead>
        <tr>
            <th><center><input type="radio" name="baselineDiv_radio" id="baselineDivRadio_createNew" value="createNew" checked/> Create New Project:</center></th>
	</tr>
    </thead>
    <tbody id="baselineDivTbody_createNew">
        <tr>
            <td>Enter a project name<br>
            <input id="baseline_newProjectName" name="new_project_name" type="text" class="form-control"/></td>
        </tr>
    </tbody>
</table>
</div> <!-- end col -->

<div class="col-md-6">
<table id="config_admin_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered" style="BACKGROUND-COLOR: transparent">
    <thead>
        <tr>
                <th><center><input type="radio" name="baselineDiv_radio" id="baselineDivRadio_updateExisting" value="updateExisting"/> Update Existing Project:</center></th>
        </tr>
    </thead>
    <tbody id="baselineDivTbody_updateExisting">
        <tr>
        <?php
        if(count($projectFolders) > 0)
        { ?>
                <td>Select an existing project<br>
                <select id="baseline_existingProjectName" name="baseline_existingProjectName" class="form-control">
                <?php
                for($x=0; $x<count($projectFolders); $x++)
                {
                        $thisProjectFolder = explode("/", $projectFolders[$x]);
                        $thisProjectNameParts = explode("_", $thisProjectFolder[5]);
                        if(strstr($thisProjectFolder[5], "_U")) {
                                echo '<option value="'.$thisProjectFolder[5].'">'.$thisProjectNameParts[0].' (Updated: '.$thisProjectNameParts[1].')</option>';
                        }
                        else {
                                echo '<option value="'.$thisProjectFolder[5].'">'.$thisProjectNameParts[0].' (Created: '.$thisProjectNameParts[1].')</option>';
                        }
                } ?>
                </select></td>
        <?php }
        else
        { ?>
                <td>There are no existing projects to choose from.</td>
        <?php
        } ?>
        </tr>
    </tbody>
</table>
</div> <!-- end col -->
</div> <!-- end baseline_backupControlsDiv -->

<div id="baseline_backupOutputDiv" style="display:none">
<div class="col-md-12">

<div class="accordion accordion-transparent" id="baseline_backupAccordionDiv">
<?php for($x=0; $x<count($aResults); $x++) { ?>
    <h3 id="baselineScrollDiv_accordion_header_<?php echo trim($aResults[$x][1]); ?>"><?php echo trim($aResults[$x][1]); ?> <img id="baselineScrollDiv_accordion_icon_<?php echo trim($aResults[$x][1]); ?>" style="display:none" valign="top" align="right" src="img/loader.gif"/></h3>
    <div><textarea style="height:250px" id="baseline_deviceTextarea_<?php echo trim($aResults[$x][1]); ?>"></textarea></div>
<?php } ?>
</div> <!-- end baseline_backupAccordionDiv -->

<div id="baseline_backupStatusDiv"><br></div>

</div> <!-- end col -->
</div> <!-- end baseline_backupOutputDiv -->


			<!-- end border table -->
                       	</td></tr></table>
                       	<!-- end border table -->
                        </div> <!-- end baseline_backupDiv ---------------------------------------------------------------------->

			<br>

			<!-- begin baseline_baselineDiv -------------------------------------------------------------------------->
                        <div id="baseline_baselineDiv">
                        <!-- begin border table -->
                        <table cellpadding="0" cellspacing="0" width="100%" class="table table-bordered"><tr><td>
                        <!-- begin border table -->


<div id="baseline_baselineInfoHeaderDiv">
<center><h6>Baseline:</h6></center>
</div>

<input type="hidden" id="baselineIdentified" value="<?php echo $baselineIdentified ?>" />

<div id="baseline_baslineProjectFolderInfo">
<div class="col-md-12">
<?php /*
                                <div id="baselineIdentified" style="display:none"><?php echo $baselineIdentified ?></div>
*/ ?>
                                <?php
                                if($baselineIdentified != "__NO__") { ?>
                                        <h6><center><br>Baseline (<?php echo $baselineIdentified ?>) will be used.</center></h6>
                                <?php }
                                else { ?>
                                        <h6><center><br>*** Warning ***<br>A Baseline has not been established.<br>Please modify the /portal/config/baseline.conf file to continue.</center></h6>
                                <?php } ?>

</div>
</div>


<div id="baseline_baselineOutputDiv" style="display:none">
<div class="col-md-12">

<div class="accordion accordion-transparent" id="baseline_baselineAccordionDiv">
<?php
for($x=0; $x<100; $x++) { ?>
        <h3 name="baseline_baselineAccordionDiv_accordionHeader_<?php echo $x; ?>" id="baseline_baselineAccordionDiv_accordionHeader_<?php echo $x; ?>" style="display:none"><?php echo $x; ?><img name="baseline_baselineAccordionDiv_accordionIcon_<?php echo $x; ?>" id="baseline_baselineAccordionDiv_accordionIcon_<?php echo $x; ?>" style="display:none" valign="top" align="right" src="img/loader.gif"/></h3>
        <div><textarea style="height:250px; display:none" name="baseline_baselineAccordionDiv_deviceTextarea_<?php echo $x; ?>" id="baseline_baselineAccordionDiv_deviceTextarea_<?php echo $x; ?>"></textarea></div>
<?php } ?>
</div>

<div id="baseline_baselineStatusDiv">
</div>

</div> <!-- end col -->
</div> <!-- end baseline_baselineOutputDiv -->



                        <!-- end border table -->
                        </td></tr></table>
                        <!-- end border table -->
                        </div> <!-- end baseline_baselineDiv ---------------------------------------------------------------------->

		    </div>
		</div>
		<div class="modal-footer">
                    <button type="button" id="baseline_cancelButton" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button onclick="submitBaseline()" type="button" id="baseline_submitButton" class="btn btn-default">Execute Baseline</button>
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


    <div class="modal modal-success" id="modal_backup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Backup</h4>
                </div>
                <div class="modal-body clearfix">


	<div id="backup_deviceListDiv">
        <div class="row">
            <div class="col-md-12">
                    <div class="content">
			<h6><center>Select the devices you wish to backup.</center></h6>
                        <table id="backup_deviceListDiv_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered table-striped sortable" style="BACKGROUND-COLOR: transparent">
                            <thead>
                                <tr>
					<th width="10%"><input type="checkbox" class="checkall"/></th>
       		             		<th width="70%">Device Name</th>
                                    <th width="10%">Device IP</th>
                                    <th width="10%">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                for($x=0; $x<count($aResults); $x++)
                                {
                        		echo '<tr><td><input name="'.trim($aResults[$x][1]).'" type="checkbox" name="checkbox" /></td><td>'.trim($aResults[$x][1]).'</td>';
					echo '<td>'.trim($aResults[$x][1]).'</td><td>Up</td></tr>';
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
        </div> <!-- end backup_deviceListDiv -->

        <div id="backup_deviceListDiv"> 
        <div class="col-md-1"><!-- side spader --></div><div class="col-md-10">
        <h6><center>Select the devices you wish to backup.</center></h6>
        <table id="backup_deviceListDiv_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered table-striped sortable" style="BACKGROUND-COLOR: transparent">
            <thead>
                <tr>
                    <th width="8%"></th> <!--<input type="checkbox" class="checkall"/></th-->
                    <th width="92%">Device Name</th>
                </tr>
            </thead>
            <tbody>
                <?php
                for($x=0; $x<count($aResults); $x++) {
//                        echo '<tr><td><input name="'.trim($aResults[$x][1]).'" style="height:15px; width:15px" valign="top" type="checkbox" name="checkbox"/></td><td>'.trim($aResults[$x][1]).' @ '.trim($aResults[$x][0]).'</td></tr>';
			echo '<tr><td><input name="'.trim($aResults[$x][1]).'" type="checkbox" name="checkbox" /></td><td>'.trim($aResults[$x][1]).' @ '.trim($aResults[$x][0]).'</td></tr>';
                }
                ?>
            </tbody>
        </table>
        </div><div class="col-md-1"><!-- side spacer --></div>
        </div> <!-- end backup_deviceListDiv -->


		   

                </div>
                <div class="modal-footer">
                    <button type="button" id="backup_cancelButton" class="btn btn-default btn-clean" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-primary" id="modal_restore" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Restore</h4>
                </div>
                <div class="modal-body clearfix">
               	    <div id="restore_scrollDiv" class="scroll" style="height:400px;">
			    
			<!-- begin restore_backupDiv -------------------------------------------------------------------------->
			<div id="restore_backupDiv">
			<!-- begin border table -->
                        <table cellpadding="0" cellspacing="0" width="100%" class="table table-bordered"><tr><td>
                        <!-- begin border table -->
<div class="col-md-12">
<div id="restore_backupQuestionDiv">
<center><h6>Would you like to backup the environment before<br>submitting the restore?</h6><label><input type="checkbox" id="restoreDiv_backupCheck" class="restoreDiv_backupCheck"/>Yes</label></center>
</div>
<div id="restore_backupInfoHeaderDiv">
<center><h6>Backup:</h6></center>
</div>
</div>


<div id="restore_backupControlsDiv">
<div class="col-md-12">
    <br><center><h6>Choose to create a New Project or update an Existing Project.</h6></center>
</div> <!-- end col -->

<div class="col-md-6">
<table id="config_admin_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered" style="BACKGROUND-COLOR: transparent">
    <thead>
        <tr>
            <th><center><input type="radio" name="restoreDiv_radio" id="restoreDivRadio_createNew" value="createNew" checked/> Create New Project:</center></th>
	</tr>
    </thead>
    <tbody id="restoreDivTbody_createNew">
        <tr>
            <td>Enter a project name<br>
            <input id="restore_newProjectName" name="new_project_name" type="text" class="form-control"/></td>
        </tr>
    </tbody>
</table>
</div> <!-- end col -->

<div class="col-md-6">
<table id="config_admin_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered" style="BACKGROUND-COLOR: transparent">
    <thead>
        <tr>
                <th><center><input type="radio" name="restoreDiv_radio" id="restoreDivRadio_updateExisting" value="updateExisting"/> Update Existing Project:</center></th>
        </tr>
    </thead>
    <tbody id="restoreDivTbody_updateExisting">
        <tr>
        <?php
        if(count($projectFolders) > 0)
        { ?>
                <td>Select an existing project<br>
                <select id="restore_existingProjectName" name="restore_existingProjectName" class="form-control">
                <?php
                for($x=0; $x<count($projectFolders); $x++)
                {
                        $thisProjectFolder = explode("/", $projectFolders[$x]);
                        $thisProjectNameParts = explode("_", $thisProjectFolder[5]);
                        if(strstr($thisProjectFolder[5], "_U")) {
                                echo '<option value="'.$thisProjectFolder[5].'">'.$thisProjectNameParts[0].' (Updated: '.$thisProjectNameParts[1].')</option>';
                        }
                        else {
                                echo '<option value="'.$thisProjectFolder[5].'">'.$thisProjectNameParts[0].' (Created: '.$thisProjectNameParts[1].')</option>';
                        }
                } ?>
                </select></td>
        <?php }
        else
        { ?>
                <td>There are no existing projects to choose from.</td>
        <?php
        } ?>
        </tr>
    </tbody>
</table>
</div> <!-- end col -->
</div> <!-- end restore_backupControlsDiv -->

<div id="restore_backupOutputDiv" style="display:none">
<div class="col-md-12">

<div class="accordion accordion-transparent" id="restore_backupAccordionDiv" name="restore_backupAccordionDiv">
<?php for($x=0; $x<count($aResults); $x++) { ?>
    <h3 name="restoreScrollDiv_accordion_header_<?php echo trim($aResults[$x][1]); ?>" id="restoreScrollDiv_accordion_header_<?php echo trim($aResults[$x][1]); ?>"><?php echo trim($aResults[$x][1]); ?><img name="estoreScrollDiv_accordion_icon_<?php echo trim($aResults[$x][1]); ?>" id="restoreScrollDiv_accordion_icon_<?php echo trim($aResults[$x][1]); ?>" style="display:none" valign="top" align="right" src="img/loader.gif"/></h3>
    <div><textarea style="height:250px" name="restore_deviceTextarea_<?php echo trim($aResults[$x][1]); ?>" id="restore_deviceTextarea_<?php echo trim($aResults[$x][1]); ?>"></textarea></div>
<?php } ?>
</div> <!-- end restore_backupAccordionDiv -->

<div id="restore_backupStatusDiv"><br></div>

</div> <!-- end col -->
</div> <!-- end restore_backupOutputDiv -->


			<!-- end border table -->
                       	</td></tr></table>
                       	<!-- end border table -->
                        </div> <!-- end restore_backupDiv ---------------------------------------------------------------------->

			<br>

			<!-- begin restore_restoreDiv -------------------------------------------------------------------------->
                        <div id="restore_restoreDiv">
                        <!-- begin border table -->
                        <table cellpadding="0" cellspacing="0" width="100%" class="table table-bordered"><tr><td>
                        <!-- begin border table -->

<div class="col-md-12">
<div id="restore_restoreQuestionDiv"> <h6><center>Please select a project to restore to the enviornment.</center></h6>
</div>
<div id="restore_restoreInfoHeaderDiv">
<center><h6>Restore:</h6></center>
</div>
</div>

<div id="restore_restoreControlsDiv">
<div class="col-md-12">
<?php
    if(count($projectFolders) > 0)
    { ?>
    	<select onchange="getRestoreList()" id="restore_restoreExistingProjectName" name="restore_restoreExistingProjectName" class="form-control">
        <?php
        for($x=0; $x<count($projectFolders); $x++)
        {
                $thisProjectFolder = explode("/", $projectFolders[$x]);
                $thisProjectNameParts = explode("_", $thisProjectFolder[5]);
                if(strstr($thisProjectFolder[5], "_U")) {
                        echo '<option value="'.$thisProjectFolder[5].'">'.$thisProjectNameParts[0].' (Updated: '.$thisProjectNameParts[1].')</option>';
                }
                else {
                        echo '<option value="'.$thisProjectFolder[5].'">'.$thisProjectNameParts[0].' (Created: '.$thisProjectNameParts[1].')</option>';
                }
        } ?>
        </select>


	<div id="restore_restoreProjectFolderListDiv">
	<br>
        <div id="restore_restoreProjectFolderListDiv_scrollDiv" class="scroll" style="height:10px;">
	<div id="restore_restoreProjectFolderListDiv_loaderMessage"> <center><h5><img valign="center" align="center" src="img/loader.gif"/> &nbsp; Fetching Project Contents...</h5></center> </div>
	<table id="restore_restoreProjectFolderListDiv_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered table-striped sortable" style="BACKGROUND-COLOR: transparent">
            <thead>
                <tr>
                    <th width="8%"></th> <!--<input type="checkbox" class="checkall"/></th-->
                    <th width="92%">Device Name</th>
                </tr>
            </thead>
            <tbody>
	    </tbody>
	</table>
	</div>
	</div>
<?php }
else
{ ?>
        <p><center>There are no existing projects to choose from.</center></p>
<?php
} ?>
</div> <!-- end col -->
</div> <!-- end restore_restoreControlsDiv -->

<div id="restore_restoreOutputDiv" style="display:none">
<div class="col-md-12">

<div class="accordion accordion-transparent" id="restore_restoreAccordionDiv">
<?php
for($x=0; $x<100; $x++) { ?>
	<h3 name="restore_restoreAccordionDiv_accordionHeader_<?php echo $x; ?>" id="restore_restoreAccordionDiv_accordionHeader_<?php echo $x; ?>"><?php echo $x; ?><img name="restore_restoreAccordionDiv_accordionIcon_<?php echo $x; ?>" id="restore_restoreAccordionDiv_accordionIcon_<?php echo $x; ?>" valign="top" align="right" src="img/loader.gif"/></h3>
    	<div><textarea style="height:250px" name="restore_restoreAccordionDiv_deviceTextarea_<?php echo $x; ?>" id="restore_restoreAccordionDiv_deviceTextarea_<?php echo $x; ?>"></textarea></div>
<?php } ?>
</div>

<div id="restore_restoreStatusDiv">
</div>

</div> <!-- end col -->
</div> <!-- end restore_restoreOutputDiv -->



                        <!-- end border table -->
                        </td></tr></table>
                        <!-- end border table -->
                        </div> <!-- end restore_restoreDiv ---------------------------------------------------------------------->

		    </div>
		</div>
		<div class="modal-footer">
                    <button type="button" id="restore_cancelButton" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button onclick="submitRestore()" type="button" id="restore_submitButton" class="btn btn-default">Execute Restore</button>
                </div>
	    </div>
	</div>
    </div>

    <script type="text/javascript" src="/js/TEST_portal.js"></script>
    <script type="text/javascript">
	// set baseline modal defaults
	$('.baselineDivRadio_createNew').prop('checked',true);
        $("#baselineDivTbody_createNew").show();
        $("#baselineDivTbody_updateExisting").hide();

	// set backup modal defaults
	$('.backupDivRadio_createNew').prop('checked',true);
        $("#backupDivTbody_createNew").show();
        $("#backupDivTfoot_createNew").show();
        $("#backupDivTbody_updateExisting").hide();
        $("#backupDivTfoot_updateExisting").hide();

	// set restore modal defaults
	$('.restoreDivRadio_createNew').prop('checked',true);
	$("#restoreDivTbody_createNew").show();
        $("#restoreDivTbody_updateExisting").hide();

	<?php
	echo "var phpArray = ".json_encode($aResults).";\n";
	?>
    </script>

</body>
</html>
