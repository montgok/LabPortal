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
            <div class="col-md-1"></div>
            <div class="col-md-10">
                    <div class="content">
                        <h6><center>Select the devices you wish to backup.</center></h6>
                        <table id="backup_deviceListDiv_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered table-striped sortable" style="BACKGROUND-COLOR: transparent">
                            <thead>
                                <tr>
                                        <th width="10%"><input type="checkbox" class="checkall"/></th>
                                        <th width="40%">Device Name</th>
                                    	<th width="40%">Device IP</th>
                                    	<th width="10%">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                for($x=0; $x<count($aResults); $x++)
                                {
                                        echo '<tr>';
					echo '<td><input name="'.trim($aResults[$x][1]).'" type="checkbox" /></td><td>'.trim($aResults[$x][1]).'</td>';
                                        echo '<td>'.trim($aResults[$x][0]).'</td><td>Up</td>';
					echo '</tr>';
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
            </div>
            <div class="col-md-1"></div>
        </div>
	<br>
        </div> <!-- end backup_deviceListDiv -->



                    <div id="controlsDiv" class="controls">
                        <div class="form-row">
                            <div class="col-md-12">
                                <h6><center>Choose to create a New Project or update an Existing Project.</h6></center>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-6">
                                <table id="config_admin_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered">
                                    <thead>
                                        <tr>
                                                <th><center><input type="radio" name="backupDiv_radio" id="backupDivRadio_createNew" value="createNew" checked/> Create New Project:</center></th>
                                        </tr>
                                    </thead>
                                    <tbody id="backupDivTbody_createNew">
                                        <tr>
                                                <td>Enter a project name<br>
                                                <input id="backup_newProjectName" name="new_project_name" type="text" value=""/></td>
                                        </tr>
                                    </tbody>
                                    <tfoot id="backupDivTfoot_createNew">
                                        <tr>
                                                <td align="right"><button onclick="submitBackup()" type="button" class="btn btn-default">Submit Backup</button></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <table id="config_admin_table" cellpadding="0" cellspacing="0" width="100%" class="table table-bordered">
                                    <thead>
                                        <tr>
                                                <th><center><input type="radio" name="backupDiv_radio" id="backupDivRadio_updateExisting" value="updateExisting"/> Update Existing Project:</center></th>
                                        </tr>
                                    </thead>
                                    <tbody id="backupDivTbody_updateExisting">
                                        <tr>
                                        <?php
                                        if(count($projectFolders) > 0)
                                        { ?>
                                                <td>Select an existing project<br>
                                                <select id="backup_existingProjectName" name="backup_existingProjectName" class="form-control">
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
                                    <?php
                                    // show table footer (submit button) only if there is 1 or more existing project folders
                                    if(count($projectFolders) > 0)
                                    { ?>
                                    <tfoot id="backupDivTfoot_updateExisting">
                                        <tr>
                                                <td align="right"><button onclick="submitBackup()" type="button" class="btn btn-default">Submit Backup</button></td>
                                        </tr>
                                    </tfoot>
                                    <?php } ?>
                                </table>
                            </div>
                        </div>
                    </div> <!-- end controlsDiv -->
		   

                    <div id="backup_scrollDiv" class="scroll" style="height:200px;"> 
			<div class="accordion accordion-transparent" id="backupScrollDiv_accordion">
			<?php for($x=0; $x<count($aResults); $x++) { ?>
				<h3 id="backupScrollDiv_accordion_header_<?php echo trim($aResults[$x][1]); ?>"><?php echo trim($aResults[$x][1]); ?> <img id="backupScrollDiv_accordion_icon_<?php echo trim($aResults[$x][1]); ?>" style="display:none" valign="top" align="right" src="img/loader.gif"/></h3>	
				<div><textarea style="height:250px" id="backup_deviceTextarea_<?php echo trim($aResults[$x][1]); ?>"></textarea></div>
			<?php } ?>
                        </div>

			<div id="backup_backupStatusDiv"><br></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="backup_cancelButton" class="btn btn-default btn-clean" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
