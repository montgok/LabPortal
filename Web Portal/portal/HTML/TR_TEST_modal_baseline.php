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
