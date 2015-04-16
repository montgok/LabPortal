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
    <h3 name="restoreScrollDiv_accordion_header_<?php echo trim($aResults[$x][1]); ?>" id="restoreScrollDiv_accordion_header_<?php echo trim($aResults[$x][1]); ?>"><?php echo trim($aResults[$x][1]); ?><img name="restoreScrollDiv_accordion_icon_<?php echo trim($aResults[$x][1]); ?>" id="restoreScrollDiv_accordion_icon_<?php echo trim($aResults[$x][1]); ?>" style="display:none" valign="top" align="right" src="img/loader.gif"/></h3>
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
	<option value="__EMPTY__" name="__EMPTY__"> </option>
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


	<!--div id="restore_restoreProjectFolderListDiv"-->
        <!--div id="restore_restoreProjectFolderListDiv_scrollDiv" class="scroll" style="height:10px;"-->
	<div id="restore_restoreProjectFolderListDiv_loaderMessage"> <center><br><h5><img valign="center" align="center" src="img/loader.gif"/> &nbsp; Fetching Project Contents...</h5></center> </div>
	<div id="restore_restoreProjectFolderListDiv">
	<br>
	<table id="restore_restoreProjectFolderListDiv_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered table-striped sortable" style="BACKGROUND-COLOR: transparent">
            <thead>
                <tr>
                        <th width="10%"><input type="checkbox" class="checkall"/></th>
                        <th width="40%">Device Name</th>
                        <th width="40%">Device IP</th>
                        <th width="10%">Current Status</th>
                </tr>
            </thead>
            <tbody>
	    <?php for($x=0; $x<100; $x++) { 
                echo '<tr id="restore_restoreProjectFolderListRow_'.$x.'" style="display:none">';
	    
			echo '<td name="restore_restoreProjectFolderList_check_'.$x.'" id="restore_restoreProjectFolderList_check_'.$x.'">&nbsp;</td>';
			echo '<td name="restore_restoreProjectFolderList_name_'.$x.'" id="restore_restoreProjectFolderList_name_'.$x.'">&nbsp;</td>';
			echo '<td name="restore_restoreProjectFolderList_ip_'.$x.'" id="restore_restoreProjectFolderList_ip_'.$x.'">&nbsp;</td>';
			echo '<td name="restore_restoreProjectFolderList_status_'.$x.' id="restore_restoreProjectFolderList_status_'.$x.'">&nbsp;</td>';
                echo '</tr>';
	    } ?>
	    </tbody>
	</table>
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
