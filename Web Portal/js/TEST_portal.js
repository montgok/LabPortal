// this action type and backup status var (all actions have the ability to take a backup) 
var actionType
var preAction
var backupStatus
// variable to hold request
var request
// variable to pause exepct execution
var expectStatus
var restoreExpectStatus
// phpArray vars
var phpArrayLength 
var phpArrayCounter
var multiDeviceArray = new Array();
var projectConfigFilesLength 
var projectConfigFilesCounter
// textArea output string from expect execution
var htmlString
// indicator of last iteration 
var lastIteration
// indicator if expect process encountered an error
var expectErrorFound
// counter for total expect errors and successes
var expectErrorCounter
var expectSuccessCounter
// project folder and file vars
var projectName 
var projectFolder
var existingProjectName 
var existingProjectFolder
var has_UFlag
var projectType 
var projectConfigFiles = new Array();
var haveProjectFileList;
var backupClickPreviousAccordionName;
// project folder names
var restore_existingProjectName;
var baseline_existingProjectName;
var restore_restoreExistingProjectName;
var baselineIdentified
// date and time vars
var date
var projectTimestamp

function initVars()
{
	date = new Date;
	expectStatus = "__RUN__";
	restoreExpectStatus = "__RUN__";
        htmlString = '';
        lastIteration = "__NO__"
        expectErrorFound = "__NO__"
        expectErrorCounter = 0;
        expectSuccessCounter = 0;
        projectName = '';
        projectFolder = '';
        existingProjectName = '';
        existingProjectFolder = '';
        projectType = '';
	has_UFlag = '';
	haveProjectFileList = "__NO__";
	preAction = "__YES__";
        multiDeviceArray.length = 0;
}

function prepForBaseline()
{
        initVars();
        updateProjectList();
	resetBaselineAccordionDiv();

        actionType = "__BASELINE__";
        backupStatus = "";
	backupClickPreviousAccordionName = "";

        // show/hide initial divs
        $("#baseline_backupQuestionDiv").show();
        $("#baseline_backupControlsDiv").hide();
        $("#baseline_backupOutputDiv").hide();
        $("#baseline_baselineQuestionDiv").show();
        $("#baseline_baselineControlsDiv").show();
        $("#baseline_baselineOutputDiv").hide();
        $("#baseline_backupInfoHeaderDiv").hide();
        $("#baseline_baselineInfoHeaderDiv").hide();
        $("#baseline_baselineStatusDiv").hide();
	$("#baseline_baslineProjectFolderInfo").show();
        $("#baseline_baselineInfoHeaderDiv").hide();

        // set initial div element settings
        $("#baselineDiv_backupCheck").prop("checked", false); $("#baselineDiv_backupCheck").click(); $("#baselineDiv_backupCheck").click();
        $("#baselineDivRadio_createNew").prop("checked", true);
        $("#baselineDivTbody_createNew").show();
        $("#baselineDivTbody_updateExisting").hide();

        $('[id^="baselineScrollDiv_accordion_icon_"]').attr("src", "img/loader.gif");
        $('[id^="baselineScrollDiv_accordion_icon_"]').css('display','none');
        $('[id^="baselineScrollDiv_accordion_icon_"]').hide();
        $('[id^="baseline_deviceTextarea_"]').html("");

        $("#baseline_backupStatusDiv").html("<br>");
        $("#baseline_newProjectName").attr('value', '');
        $("#baseline_submitButton").show();
        $("#baseline_cancelButton").html('Cancel');

        $("#baseline_baselineAccordionDiv").hide();
        $('[id^="baseline_baselineAccordionDiv_accordionHeader_"]').hide();
        $('[id^="baseline_baselineAccordionDiv_accordionIcon_"]').attr("src", "img/loader.gif");
        $('[id^="baseline_baselineAccordionDiv_accordionIcon_"]').hide();
        $('[id^="baseline_baselineAccordionDiv_deviceTextarea_"]').html("");
        $('[id^="baseline_baselineAccordionDiv_deviceTextarea_"]').hide();

}

function prepForBackup()
{
	initVars();
	updateProjectList();

	actionType = "__BACKUP__";
	backupStatus = "";

	$("#backupDivRadio_createNew").prop("checked", true);
	$("#backup_deviceListDiv_table_checkall").prop("checked", false); $("#backup_deviceListDiv_table_checkall").click(); $("#backup_deviceListDiv_table_checkall").click();
        $("#backupDivTbody_createNew").show();
        $("#backupDivTfoot_createNew").show();
        $("#backupDivTbody_updateExisting").hide();
        $("#backupDivTfoot_updateExisting").hide();
	$("#controlsDiv").show();
        $("#backup_deviceListDiv").show();
	$("#backup_scrollDiv").css('height','200px');
	$("#backup_scrollDiv").hide();
	$('[id^="backup_deviceTextarea_"]').hide();
        $('[id^="backupScrollDiv_accordion_header_"]').hide();
	$('[id^="backupScrollDiv_accordion_icon_"]').attr("src", "img/loader.gif");
	$('[id^="backupScrollDiv_accordion_icon_"]').css('display','none');
	$('[id^="backupScrollDiv_accordion_icon_"]').hide();
	$('[id^="backup_deviceTextarea_"]').html("");
	$("#backup_backupStatusDiv").html("<br>");
        $("#backup_backupStatusDiv").hide();
	$("#backup_newProjectName").attr('value', '');
	$("#backup_cancelButton").html('Cancel');

	if(phpArray.length < 1) { repopulatePhpArray(); }
}

function prepForRestore()
{
	initVars();
        updateProjectList();
	resetRestoreAccordionDiv();

        actionType = "__RESTORE__";
	backupStatus = "";

	// show/hide initial divs
	$("#restore_restoreProjectFolderListDiv_table").hide();
    	$("#restore_restoreProjectFolderListDiv").hide();
	$("#restore_restoreProjectFolderListDiv_loaderMessage").hide();
	$("#restore_backupQuestionDiv").show();
	$("#restore_backupControlsDiv").hide();
	$("#restore_backupOutputDiv").hide();
	$("#restore_restoreQuestionDiv").show();
	$("#restore_restoreControlsDiv").show();
	$("#restore_restoreOutputDiv").hide();
	$("#restore_backupInfoHeaderDiv").hide();
        $("#restore_restoreInfoHeaderDiv").hide();
	$("#restore_restoreStatusDiv").hide();

	// set initial div element settings
	$("#restoreDiv_backupCheck").prop("checked", false); $("#restoreDiv_backupCheck").click(); $("#restoreDiv_backupCheck").click();
        $("#restoreDivRadio_createNew").prop("checked", true);
        $("#restoreDivTbody_createNew").show();
        $("#restoreDivTbody_updateExisting").hide();

        $('[id^="restoreScrollDiv_accordion_icon_"]').attr("src", "img/loader.gif");
        $('[id^="restoreScrollDiv_accordion_icon_"]').css('display','none');
        $('[id^="restoreScrollDiv_accordion_icon_"]').hide();
        $('[id^="restore_deviceTextarea_"]').html("");

        $("#restore_backupStatusDiv").html("<br>");
        $("#restore_newProjectName").attr('value', '');
        $("#restore_submitButton").show();
        $("#restore_cancelButton").html('Cancel');

	$("#restore_restoreAccordionDiv").hide();
        //$("#restore_restoreProjectFolderListDiv_scrollDiv").css('height', '10');
	$('[id^="restore_restoreAccordionDiv_accordionHeader_"]').hide();
	$('[id^="restore_restoreAccordionDiv_accordionIcon_"]').attr("src", "img/loader.gif");
	$('[id^="restore_restoreAccordionDiv_accordionIcon_"]').hide();
	$('[id^="restore_restoreAccordionDiv_deviceTextarea_"]').html("");
	$('[id^="restore_restoreAccordionDiv_deviceTextarea_"]').hide();
}

function resetRestoreAccordionDiv()
{
	for(var i=0; i<100; i++) {
		// find by name and reset id
		$('h3[name=restore_restoreAccordionDiv_accordionHeader_'+i+']').attr('id', 'restore_restoreAccordionDiv_accordionHeader_'+i);
		$('img[name=restore_restoreAccordionDiv_accordionIcon_'+i+']').attr('id', 'restore_restoreAccordionDiv_accordionIcon_'+i);
		$('textarea[name=restore_restoreAccordionDiv_deviceTextarea_'+i+']').attr('id', 'restore_restoreAccordionDiv_deviceTextarea_'+i);
	}
}

function resetBaselineAccordionDiv()
{
        for(var i=0; i<100; i++) {
                // find by name and reset id
                $('h3[name=baseline_baselineAccordionDiv_accordionHeader_'+i+']').attr('id', 'baseline_baselineAccordionDiv_accordionHeader_'+i);
                $('img[name=baseline_baselineAccordionDiv_accordionIcon_'+i+']').attr('id', 'baseline_baselineAccordionDiv_accordionIcon_'+i);
                $('textarea[name=baseline_baselineAccordionDiv_deviceTextarea_'+i+']').attr('id', 'baseline_baselineAccordionDiv_deviceTextarea_'+i);
        }
}

function getMonth(date) { var month = date.getMonth(); month = month + 1; return month < 10 ? '0' + month : month; }
function getDay(date) { var day = date.getDate(); return day < 10 ? '0' + day : day; }
function getHour(date) { var hour = date.getHours(); return hour < 10 ? '0' + hour : hour; }
function getMinute(date) { var minutes = date.getMinutes(); return minutes < 10 ? '0' + minutes : minutes; }
function getSecond(date) { var seconds = date.getSeconds(); return seconds < 10 ? '0' + seconds : seconds; }
function getProjectTimestamp() { var seconds = getSecond(date); var minutes = getMinute(date); var hour = getHour(date); var year = date.getFullYear(); var month = getMonth(date); var day = getDay(date); return year+''+month+''+day+''+hour+''+minutes+''+seconds; }

function repopulatePhpArray() {
	console.log('submitting ajax repopulatePhpArray.php');
        request = $.ajax({
                type: "GET",
                url: "/repopulatePhpArray.php",
                cache: false,
        });
        request.done(function (response, textStatus, jqXHR){
		if(response[0] == "__SUCCESS__") {
			phpArray.length = 0;
			var counter = 0;
                        if(response[1].length > 0) {
				for(var x=1; x<response.length; x++) {
					phpArray[counter] = new Array();
					phpArray[counter][0] = response[x][0];
					phpArray[counter][1] = response[x][1];
					counter = counter + 1;
				}
for(var x=0; x<phpArray.length; x++) { 
console.log(x+' : '+phpArray[x]);
}
                        }
                        else {
                                console.error("repopulatePhpArray() -- in request.done however no devices were returned from the query..");
                        }
                }
                else {
                        console.error("repopulatePhpArray() -- in request.done however  __SUCCESS__ not found -- The following error occured: " + textStatus, jqXHR);
                }
	});
        request.fail(function (jqXHR, textStatus, errorThrown){
                console.error("repopulatePhpArray() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
        });
}

function getProjectFiles(projectFolderToRestore)
{
	// empty array
	projectConfigFiles.length = 0;

	console.log('submitting ajax getProjectFiles.php w/ projectFolderName='+projectFolderToRestore);
        request = $.ajax({
                type: "GET",
                url: "/getProjectFiles.php",
                cache: false,
                data: "projectFolderName="+projectFolderToRestore
        });
        request.done(function (response, textStatus, jqXHR){
                if(response[0] == "__SUCCESS__") {
                        if(response[1].length > 0) {
                                for(var i in response[1]) {
					var thisFileName = response[1][i];
					var thisDeviceName = thisFileName.split("_");
					// if the call to getProjectFiles is from executeRestore and we have a selected subset of devices to restore...
                                        // ensure we restore the selected (checked) subset and not the entire contents of the project folder.
					if(multiDeviceArray.length > 0) {
                                            	for(var z=0; z<multiDeviceArray.length; z++) {
                                              		if(multiDeviceArray[z][1] == thisDeviceName[1]) {
                                                		projectConfigFiles.push(thisFileName);
                                              		}
                                      	    	}
					}
					else {
						projectConfigFiles.push(thisFileName);
					}
                        	}
				haveProjectFileList = "__YES__";
			}
			else {
				console.error("getProjectFiles() -- in request.done however there are no config files in the project folder.");
			}
                } 
		else {
                        console.error("getProjectFiles() -- in request.done however  __SUCCESS__ not found -- The following error occured: " + textStatus, jqXHR);
                }
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
                console.error("getProjectFiles() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
        });
}

function updateProjectList()
{
	console.log('submitting ajax updateProjectList.php');
	request = $.ajax({
                type: "GET",
                url: "/updateProjectList.php",
                cache: false
        });
        request.done(function (response, textStatus, jqXHR){	
		if(response[0] == "__SUCCESS__") {
			if(response[1].length > 0) {
				var htmlString = '';
				for(var i in response[1]) {
					var thisProjectFolderParts = response[1][i].split("/") 
					var thisPrjectNameParts = thisProjectFolderParts[5].split("_");
					if(i == 0) {
						htmlString = htmlString+'<option value="__EMPTY__" name="__EMPTY__"></option>';	
					}

					if(thisProjectFolderParts[5].indexOf("_U") >= 0) {
						htmlString = htmlString+'<option name="projectName" value="'+thisProjectFolderParts[5]+'">'+thisPrjectNameParts[0]+' (Updated: '+thisPrjectNameParts[1]+')</option>';	
					} else {
						htmlString = htmlString+'<option name="projectName" value="'+thisProjectFolderParts[5]+'">'+thisPrjectNameParts[0]+' (Created: '+thisPrjectNameParts[1]+')</option>';	
					}
				}
				if(actionType == "__BASELINE__") {
					$("#baseline_existingProjectName").html(htmlString);
			        }
			        else if(actionType == "__BACKUP__") {
					$("#backup_existingProjectName").html(htmlString);
			        }
			        else if(actionType == "__RESTORE__") {
					$("#restore_existingProjectName").html(htmlString);
					$("#restore_restoreExistingProjectName").html(htmlString);
        			}
			}
		} else {
         		console.error("updateProjectList() -- in request.done however  __SUCCESS__ not found -- The following error occured: " + textStatus, jqXHR);
		}
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
         	console.error("updateProjectList() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
	});
}

function submitBaseline()
{
        if(validInput() === false) {
                return;
        }

        baseline_existingProjectName = $("#baseline_existingProjectName option:selected").val();
        baselineIdentified = $("#baselineIdentified").val();

console.log('baseline_existingProjectName = '+baseline_existingProjectName);
console.log('baselineIdentified = '+baselineIdentified);

	if(baselineIdentified == "__NO__") {
		alert('Error - Cannot Continue.\n\nA Baseline has not been established.\nPlease modify the /portal/config/baseline.conf file to continue.');
		return;
        }

        // update backup section
        $("#baseline_backupQuestionDiv").hide();
        $("#baseline_backupControlsDiv").hide();

	// show baseline section
      	$("#baseline_baslineProjectFolderInfo").hide();
        $("#baseline_baselineInfoHeaderDiv").show();
	$("#baseline_baselineOutputDiv").show(); 

        if($("#baselineDiv_backupCheck").attr("checked") != "undefined" && $("#baselineDiv_backupCheck").attr("checked") == "checked") {
                // update backup section
                $("#baseline_backupOutputDiv").show();
                $("#baseline_backupAccordionDiv").show();
                $("#baseline_backupStatusDiv").show();
                $("#baseline_backupInfoHeaderDiv").show();

                // perform backup
                backupStatus = "";
                submitBackup();

                var refreshID = setInterval(function() {
                        if(backupStatus == "__ERROR__") {
                                clearInterval(refreshID);
                                $("#baseline_scrollDiv").mCustomScrollbar("update");
                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
                        }
                        else {
                                if(backupStatus == "__SUCCESS__")
                                {
                                        clearInterval(refreshID);

                                        // perform baseline
                                        //executeBaseline();
					executeRestore();
                                }
                        }
                },2000);
        }
        else {
                // update backup section
                $("#baseline_backupOutputDiv").show();
                $("#baseline_backupAccordionDiv").hide();
                $("#baseline_backupStatusDiv").show();
                $("#baseline_backupStatusDiv").html("<h6><center><br>Backup option not selected.</center></h6>");

                // perform baseline
                //executeBaseline();
		executeRestore();
        }

        // update buttons and scroll
        $("#baseline_submitButton").hide();
        $("#baseline_scrollDiv").mCustomScrollbar("update");
}

//function executeBaseline()
//{
//}

function validInput()
{
	if(actionType == "__BACKUP__") {
		if( (phpArray.length < 1) || (multiDeviceArray.length < 1) ) {
	                alert('You must select at least 1 device to execute this job.');
	                backupStatus = "__ERROR__";
	                return false;
	        }
	}
	else if(actionType == "__RESTORE__") {
		if( (phpArray.length < 1) || (multiDeviceArray.length < 1) ) {
	                alert('You must select at least 1 device to execute this job.');
	                return false;
	        }
	}

	// perform sanity checks before continuing
        if(actionType == "__BASELINE__") {
            if($("#baselineDiv_backupCheck").attr("checked") != "undefined" && $("#baselineDiv_backupCheck").attr("checked") == "checked") {
                if($("#baselineDivRadio_createNew").attr("checked") != "undefined" && $("#baselineDivRadio_createNew").attr("checked") == "checked") {
                        projectName = $("#baseline_newProjectName").val();
                        projectType = "__NEW__";
                        if(! /^[0-9A-Za-z-]+$/.test(projectName)) {
                                alert('Error, the project name cannot be empty and can only contain letters, numbers and dashes.');
                                backupStatus = "__ERROR__";
                                return false;
                        }
			else {
				return true;
			}
                }
                else if($("#baselineDivRadio_updateExisting").attr("checked") != "undefined" && $("#baselineDivRadio_updateExisting").attr("checked") == "checked") {
                        projectName = $("#baseline_existingProjectName").val();
                        projectType = "__EXISTING__";
			return true;
                }
                else {
                        alert('Please select from one of the two options: Create a New project -or- Update an Existing project.');
                        backupStatus = "__ERROR__";
                        return false;
                }
	    }
	    else {
		preAction = "";
		return true;
	    }
        }
        else if(actionType == "__BACKUP__") {
                if($("#backupDivRadio_createNew").attr("checked") != "undefined" && $("#backupDivRadio_createNew").attr("checked") == "checked") {
                        projectName = $("#backup_newProjectName").val();
                        projectType = "__NEW__";
                        if(! /^[0-9A-Za-z-]+$/.test(projectName)) {
                                alert('Error, the project name cannot be empty and can only contain letters, numbers and dashes.');
                                backupStatus = "__ERROR__";
                                return false;
                        }
			else {
				return true;
			}
                }
                else if($("#backupDivRadio_updateExisting").attr("checked") != "undefined" && $("#backupDivRadio_updateExisting").attr("checked") == "checked") {
                        projectName = $("#backup_existingProjectName").val();
                        projectType = "__EXISTING__";
			return true;
                }
                else {
                        alert('Please select from one of the two options: Create a New project -or- Update an Existing project.');
                        backupStatus = "__ERROR__";
                        return false;
                }
        }
        else if(actionType == "__RESTORE__") {
            if($("#restoreDiv_backupCheck").attr("checked") != "undefined" && $("#restoreDiv_backupCheck").attr("checked") == "checked") {
                if($("#restoreDivRadio_createNew").attr("checked") != "undefined" && $("#restoreDivRadio_createNew").attr("checked") == "checked") {
                        projectName = $("#restore_newProjectName").val();
                        projectType = "__NEW__";
                        if(! /^[0-9A-Za-z-]+$/.test(projectName)) {
                                alert('Error, the project name cannot be empty and can only contain letters, numbers and dashes.');
                                backupStatus = "__ERROR__";
                                return false;
                        }
			else {
				return true;
			}
                }
                else if($("#restoreDivRadio_updateExisting").attr("checked") != "undefined" && $("#restoreDivRadio_updateExisting").attr("checked") == "checked") {
                        projectName = $("#restore_existingProjectName").val();
                        projectType = "__EXISTING__";
			return true;
                }
                else {
                        alert('Please select from one of the two options: Create a New project -or- Update an Existing project.');
                        backupStatus = "__ERROR__";
                        return false;
                }
	    }
	    else {
		preAction = "";
		return true;
	    }
        }

        if(projectName == "undefined" || projectName == "") {
                alert('You must create a project name or choose an existing one to continue!');
                backupStatus = "__ERROR__";
                return false;
        }	
}

function executeRestore()
{
	// reset counters
        expectSuccessCounter = 0;
        expectErrorCounter = 0;

	// get current date/time
	projectTimestamp = getProjectTimestamp(date);

	// locate project folder and get config file names, build array	
	if(actionType == "__BASELINE__") { getProjectFiles(baselineIdentified); }
	else if(actionType == "__RESTORE__") { getProjectFiles(restore_restoreExistingProjectName); }

	// setInterval, wait for getProjectFiles to finish
	var refreshID = setInterval(function() {
		if(haveProjectFileList == "__YES__") {
                 	clearInterval(refreshID);

			projectConfigFilesLength = projectConfigFiles.length;
			projectConfigFilesCounter = 0;	
//			var htmlString = "";

			if(actionType == "__BASELINE__") { $("#baseline_baselineAccordionDiv").show(); }
                        else if(actionType == "__RESTORE__") { $("#restore_restoreAccordionDiv").show(); }

			// setInterval, itterate through config files and execute restoreExpect.php for each one
			var refreshID2 = setInterval(function() {
				if(actionType == "__BASELINE__")        { $("#baseline_scrollDiv").mCustomScrollbar("update"); }
			        else if(actionType == "__RESTORE__")    { $("#restore_scrollDiv").mCustomScrollbar("update"); }
				

               			if(restoreExpectStatus == "__RUN__") {
					var thisprojectConfigFileParts = projectConfigFiles[projectConfigFilesCounter].split("_");
					var thisFileDeviceName = thisprojectConfigFileParts[1];
	
					if(actionType == "__BASELINE__") {
						// get html contents of h3 tab before updating it's name (get the <img> info)
                                                var thisImgTabindex = 1000+projectConfigFilesCounter;
                                                var thisH3Html = '<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>'+thisFileDeviceName+'<img tabindex="'+thisImgTabindex+'" name="baseline_baselineAccordionDiv_accordionIcon_'+projectConfigFilesCounter+'" id="baseline_baselineAccordionDiv_accordionIcon_'+projectConfigFilesCounter+'" valign="top" align="right" src="img/loader.gif"/>';
                                                $("#baseline_baselineAccordionDiv_accordionHeader_"+projectConfigFilesCounter).html(thisH3Html);

                                                // update show and click the rest 
                                                $("#baseline_baselineAccordionDiv_accordionHeader_"+projectConfigFilesCounter).show();
                                                $("#baseline_baselineAccordionDiv_deviceTextarea_"+projectConfigFilesCounter).show();
                                                $("#baseline_baselineAccordionDiv_accordionIcon_"+projectConfigFilesCounter).attr("src", "img/loader.gif");
                                                $("#baseline_baselineAccordionDiv_accordionIcon_"+projectConfigFilesCounter).show();
                                                $("#baseline_baselineAccordionDiv_accordionHeader_"+projectConfigFilesCounter).click();

                                                // change ids numbers with device names
                                                $("#baseline_baselineAccordionDiv_accordionHeader_"+projectConfigFilesCounter).attr('id', 'baseline_baselineAccordionDiv_accordionHeader_'+thisFileDeviceName);
                                                $("#baseline_baselineAccordionDiv_deviceTextarea_"+projectConfigFilesCounter).attr('id', 'baseline_baselineAccordionDiv_deviceTextarea_'+thisFileDeviceName);
                                                $("#baseline_baselineAccordionDiv_accordionIcon_"+projectConfigFilesCounter).attr('id', 'baseline_baselineAccordionDiv_accordionIcon_'+thisFileDeviceName);
                                        }
                                        else if(actionType == "__RESTORE__") {
						// get html contents of h3 tab before updating it's name (get the <img> info)
						var thisImgTabindex = 2000+projectConfigFilesCounter;	
						var thisH3Html = '<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>'+thisFileDeviceName+'<img tabindex="'+thisImgTabindex+'" name="restore_restoreAccordionDiv_accordionIcon_'+projectConfigFilesCounter+'" id="restore_restoreAccordionDiv_accordionIcon_'+projectConfigFilesCounter+'" valign="top" align="right" src="img/loader.gif"/>';
						$("#restore_restoreAccordionDiv_accordionHeader_"+projectConfigFilesCounter).html(thisH3Html);

						// update show and click the rest 
	                                        $("#restore_restoreAccordionDiv_accordionHeader_"+projectConfigFilesCounter).show();
	                                        $("#restore_restoreAccordionDiv_deviceTextarea_"+projectConfigFilesCounter).show();
	                                        $("#restore_restoreAccordionDiv_accordionIcon_"+projectConfigFilesCounter).attr("src", "img/loader.gif");
	                                        $("#restore_restoreAccordionDiv_accordionIcon_"+projectConfigFilesCounter).show();
	                                        $("#restore_restoreAccordionDiv_accordionHeader_"+projectConfigFilesCounter).click();

	                                        // change ids numbers with device names
	                                        $("#restore_restoreAccordionDiv_accordionHeader_"+projectConfigFilesCounter).attr('id', 'restore_restoreAccordionDiv_accordionHeader_'+thisFileDeviceName);
	                                        $("#restore_restoreAccordionDiv_deviceTextarea_"+projectConfigFilesCounter).attr('id', 'restore_restoreAccordionDiv_deviceTextarea_'+thisFileDeviceName);
	                                        $("#restore_restoreAccordionDiv_accordionIcon_"+projectConfigFilesCounter).attr('id', 'restore_restoreAccordionDiv_accordionIcon_'+thisFileDeviceName);
                                        }

/*					$("#restore_restoreAccordionDiv_accordionHeader_"+projectConfigFilesCounter).html(thisFileDeviceName);
					$("#restore_restoreAccordionDiv_accordionHeader_"+projectConfigFilesCounter).show();
					$("#restore_restoreAccordionDiv_deviceTextarea_"+projectConfigFilesCounter).show();
					$("#restore_restoreAccordionDiv_accordionIcon_"+projectConfigFilesCounter).attr("src", "img/loader.gif");
					$("#restore_restoreAccordionDiv_accordionIcon_"+projectConfigFilesCounter).show();
					$("#restore_restoreAccordionDiv_accordionHeader_"+projectConfigFilesCounter).click();

					// change ids numbers with device names
					$("#restore_restoreAccordionDiv_accordionHeader_"+projectConfigFilesCounter).attr('id', 'restore_restoreAccordionDiv_accordionHeader_'+thisFileDeviceName);
					$("#restore_restoreAccordionDiv_deviceTextarea_"+projectConfigFilesCounter).attr('id', 'restore_restoreAccordionDiv_deviceTextarea_'+thisFileDeviceName);
					$("#restore_restoreAccordionDiv_accordionIcon_"+projectConfigFilesCounter).attr('id', 'restore_restoreAccordionDiv_accordionIcon_'+thisFileDeviceName);
*/

			 	        if(actionType == "__BASELINE__") {
                				$("#baseline_scrollDiv").mCustomScrollbar("update");
				                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
				        }
				        else if(actionType == "__RESTORE__") {
				                $("#restore_scrollDiv").mCustomScrollbar("update");
				                $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
				        }

					htmlString = '----------------------------------------------------\n';
					if(actionType == "__BASELINE__") {
                        			htmlString = htmlString + '----------- Starting Baseline Process ----------\n';
                			}
			                else {
		                        	htmlString = htmlString + '----------- Starting Restore Process ----------\n';
			                }
		                        htmlString = htmlString + '----------------------------------------------------\n';

		                        if(actionType == "__BASELINE__") {
		                                $("#baseline_restoreAccordionDiv_deviceTextarea_"+thisFileDeviceName).html(htmlString);
		                        }
		                        else if(actionType == "__RESTORE__") {
		                                $("#restore_restoreAccordionDiv_deviceTextarea_"+thisFileDeviceName).html(htmlString);
		                        }

					if(projectConfigFilesLength == 0) {
						if(actionType == "__BASELINE__") {
							htmlString = htmlString + '\n\n Nothing to Baseline!! \n\n';
						}
						else {
							htmlString = htmlString + '\n\n Nothing to Restore!! \n\n';
						}
		                                htmlString = htmlString + '------------------------------------------------------\n';
						if(actionType == "__BASELINE__") {
                        				htmlString = htmlString + '----------- Finished Baseline Process ----------\n';
						}
						else {
               			                	htmlString = htmlString + '----------- Finished Restore Process ----------\n';
						}
		                                htmlString = htmlString + '------------------------------------------------------\n';
						if(actionType == "__BASELINE__") {
	                                                $("#baseline_restoreAccordionDiv_deviceTextarea_"+thisFileDeviceName).html(htmlString);
	                                        }
	                                        else if(actionType == "__RESTORE__") {
	                                                $("#restore_restoreAccordionDiv_deviceTextarea_"+thisFileDeviceName).html(htmlString);
	                                        }
						clearInterval(refreshID2);
						return;
					}

					if(actionType == "__BASELINE__") {
                                                $("#baseline_scrollDiv").mCustomScrollbar("update");
                                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
                                        }
                                        else if(actionType == "__RESTORE__") {
                                                $("#restore_scrollDiv").mCustomScrollbar("update");
                                                $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
                                        }

					// call executeExpect() to trigger expect.php action
					if(actionType == "__BASELINE__") {
						var sourceFilename = baselineIdentified+'/'+projectConfigFiles[projectConfigFilesCounter];
		                        	executeExpect("__NONE__", thisFileDeviceName, "__BASELINE__", sourceFilename);
                                        }
                                        else if(actionType == "__RESTORE__") {
						var sourceFilename = restore_restoreExistingProjectName+'/'+projectConfigFiles[projectConfigFilesCounter];
		                        	executeExpect("__NONE__", thisFileDeviceName, "__RESTORE__", sourceFilename);
                                        }

					// increment +1 for next itteration
                       			projectConfigFilesCounter = projectConfigFilesCounter + 1; 

					// cancel interval on last itteration
					if(projectConfigFilesCounter >= projectConfigFilesLength) {
                                		lastIteration = "__YES__";
                        			clearInterval(refreshID2);
					} 
                		}
        		},2000);
		}
      	},2000);
}

function submitBackup()
{
console.log('in submitBackup() BEFORE, phpArray='+phpArray);
console.log('in submitBackup() BEFORE, multiDeviceArray='+multiDeviceArray);

	// if actionType is __BACKUP__ then get the granular backup list  and store it in multiDeviceArray
	// Note: __BASELINE__ and __RESTORE__ backups do not offer granularity, it's everything that is UP
        if(actionType == "__BACKUP__") {
		var phpArrayLength = phpArray.length;
		multiDeviceArray.length = 0;
		var checkboxCounter = 0;
                $('input[type=checkbox]', '#backup_deviceListDiv_table').each(function () {
                        if(this.checked) {
				for(var x=0; x<phpArrayLength; x++) {
					if($(this).attr('name') == phpArray[x][1]) {
						multiDeviceArray[checkboxCounter] = new Array();
						multiDeviceArray[checkboxCounter].length = 0;
						multiDeviceArray[checkboxCounter][0] = phpArray[x][0];
						multiDeviceArray[checkboxCounter][1] = $(this).attr('name');
						checkboxCounter = checkboxCounter + 1;
						break;
					}	
				}
                        }
        	});
	}

console.log('in submitBackup() AFTER, phpArray='+phpArray);
console.log('in submitBackup() AFTER, multiDeviceArray='+multiDeviceArray);
		
	// validate all inputs before we go futher
	if(validInput() === false) {
                return;
        }

	// get current date/time
	projectTimestamp = getProjectTimestamp(date);

	// if we're updating an existing project then preserve the original project folder name (name_date or name_date_U)
	// we'll need this info when saving the new project folder name with an _U appeneded to it's name
	if(projectType == "__EXISTING__") {
		if(projectName.indexOf("_U") >= 0) {
			has_UFlag = "__YES__";
			var thisProjectFolderParts = projectName.split("_U", 1);
			existingProjectFolder = thisProjectFolderParts[0];
			var thisProjectNameParts = existingProjectFolder.split("_", 1);
			existingProjectName = thisProjectNameParts[0];
		}
		else {
			existingProjectFolder = projectName;
			var thisProjectNameParts = existingProjectFolder.split("_", 1);
			existingProjectName = thisProjectNameParts[0];
		}

		projectName = existingProjectName;
		projectFolder = projectName+'_'+projectTimestamp;
	}
	else {
	        projectFolder = projectName+'_'+projectTimestamp;
	}
	
	if(actionType == "__BASELINE__") {
		$("#baseline_scrollDiv").mCustomScrollbar("update");
        }
        else if(actionType == "__BACKUP__") {
		$("#controlsDiv").hide();
		$("#backup_deviceListDiv_scrollDiv").mCustomScrollbar("disable");
		$("#backup_deviceListDiv").hide();

		$("#backup_scrollDiv").css('height','400px');
		$("#backup_scrollDiv").show();
		$("#backup_scrollDiv").mCustomScrollbar("update");
        }
        else if(actionType == "__RESTORE__") {
                $("#restore_scrollDiv").mCustomScrollbar("update");
        }

	// baseline uses all devices, backup and restore uses a subset which is determined by the user 
	// by selecting (checking off) the devices on the dropdown before execution.
	if(actionType == "__BACKUP__") {
		phpArrayLength = multiDeviceArray.length;
	}
	else { // __BASELINE__ or __RESTORE__ (because here we dont offer granular backup, it's everything
		phpArrayLength = phpArray.length;
	}
	phpArrayCounter = 0;

	var refreshID = setInterval(function() {
        	if(actionType == "__BASELINE__") 	{ $("#baseline_scrollDiv").mCustomScrollbar("update"); }
	        else if(actionType == "__BACKUP__") 	{ $("#backup_scrollDiv").mCustomScrollbar("update"); }
       	 	else if(actionType == "__RESTORE__") 	{ $("#restore_scrollDiv").mCustomScrollbar("update"); }

		if(expectStatus == "__RUN__")
                {
			// expand accordion header section currently being processed into focus
        		if(actionType == "__BASELINE__") {
				$("#baselineScrollDiv_accordion_header_"+phpArray[phpArrayCounter][1]).click();
				$("#baselineScrollDiv_accordion_icon_"+phpArray[phpArrayCounter][1]).show();
				$("#baseline_scrollDiv").mCustomScrollbar("update");
                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
		        }
		        else if(actionType == "__BACKUP__") {
				$("#backupScrollDiv_accordion_header_"+multiDeviceArray[phpArrayCounter][1]).show();
				$("#backup_deviceTextarea_"+multiDeviceArray[phpArrayCounter][1]).show();
				$("#backupScrollDiv_accordion_header_"+multiDeviceArray[phpArrayCounter][1]).click();
				$("#backupScrollDiv_accordion_icon_"+multiDeviceArray[phpArrayCounter][1]).show();
				$("#backup_scrollDiv").mCustomScrollbar("update");
                                //$("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
				if(backupClickPreviousAccordionName != "") {
					if(lastIteration == "__YES__") {
	                                	$("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
					}
					else {
	                                	$("#backup_scrollDiv").mCustomScrollbar("scrollTo","#backupScrollDiv_accordion_header_"+backupClickPreviousAccordionName);
					}
				}
				else {
	                                $("#backup_scrollDiv").mCustomScrollbar("scrollTo","top");
				}
		        }       
		        else if(actionType == "__RESTORE__") {
                                $("#restoreScrollDiv_accordion_header_"+phpArray[phpArrayCounter][1]).click();
                                $("#restoreScrollDiv_accordion_icon_"+phpArray[phpArrayCounter][1]).show();
				$("#restore_scrollDiv").mCustomScrollbar("update");
                                //$("#restore_scrollDiv").mCustomScrollbar("scrollTo", "last");
				if(backupClickPreviousAccordionName != "") {
                                        $("#restore_scrollDiv").mCustomScrollbar("scrollTo","#restoreScrollDiv_accordion_header_"+backupClickPreviousAccordionName);
                                }
                                else {
                                        $("#restore_scrollDiv").mCustomScrollbar("scrollTo","#restore_restoreAccordionDiv_accordionHeader_"+backupClickPreviousAccordionName);
                                        //$("#restore_scrollDiv").mCustomScrollbar("scrollTo","top");
                                }
		        }

			if(actionType == "__BACKUP__") {
				backupClickPreviousAccordionName = multiDeviceArray[phpArrayCounter][1];
        		}
		        else { // __BASELINE__ or __RESTORE__ (because here we dont offer granular backup, it's everything
				backupClickPreviousAccordionName = phpArray[phpArrayCounter][1];
		        }

                	htmlString = '----------------------------------------------------\n';
			htmlString = htmlString + '----------- Starting Backup Process ----------\n';
                	htmlString = htmlString + '----------------------------------------------------\n';
		        if(actionType == "__BASELINE__") {
				$("#baseline_deviceTextarea_"+phpArray[phpArrayCounter][1]).html(htmlString);
		        }
		        else if(actionType == "__BACKUP__") {
				$("#backup_deviceTextarea_"+multiDeviceArray[phpArrayCounter][1]).html(htmlString);
		        }
		        else if(actionType == "__RESTORE__") {
				$("#restore_deviceTextarea_"+phpArray[phpArrayCounter][1]).html(htmlString);
		        }

			if(phpArrayLength == 0) {
                		htmlString = htmlString + '\n\n Nothing to Backup!! \n\n';
                		htmlString = htmlString + '------------------------------------------------------\n';
				htmlString = htmlString + '----------- Finished Backup Process ----------\n';
                		htmlString = htmlString + '------------------------------------------------------\n';
			        if(actionType == "__BASELINE__") {
					$("#baseline_deviceTextarea_"+phpArray[phpArrayCounter][1]).html(htmlString);
        			}
        			else if(actionType == "__BACKUP__") {
					$("#backup_deviceTextarea_"+multiDeviceArray[phpArrayCounter][1]).html(htmlString);
        			}
        			else if(actionType == "__RESTORE__") {
					$("#restore_deviceTextarea_"+phpArray[phpArrayCounter][1]).html(htmlString);
        			}
				clearInterval(refreshID);
				return;
			}
			if(actionType == "__BACKUP__") {
                        	executeExpect(multiDeviceArray[phpArrayCounter][0], multiDeviceArray[phpArrayCounter][1], "__BACKUP__", "x");
        		}
		        else if(actionType == "__RESTORE__") {
                        	executeExpect(phpArray[phpArrayCounter][0], phpArray[phpArrayCounter][1], "__BACKUP__", "x");
		        }
		        else { // __BASELINE__
                        	executeExpect(phpArray[phpArrayCounter][0], phpArray[phpArrayCounter][1], "__BACKUP__", "x");
		        }
			phpArrayCounter = phpArrayCounter + 1;

			if(phpArrayCounter >= phpArrayLength) { 
				lastIteration = "__YES__";
				// stop execution
				clearInterval(refreshID);
			}
                }
	},2000);
}

function submitRestore()
{
	lastIteration = "__NO__";

	// get granular list of devices to restore (checked devices) from the selected project folder
        if(actionType == "__RESTORE__") {
                var phpArrayLength = phpArray.length;
                multiDeviceArray.length = 0;
                var checkboxCounter = 0;
                $('input[type=checkbox]', '#restore_restoreProjectFolderListDiv_table').each(function () {
                        if(this.checked) {
                                for(var x=0; x<phpArrayLength; x++) {
                                        if($(this).attr('name') == phpArray[x][1]) {
                                                multiDeviceArray[checkboxCounter] = new Array();
                                                multiDeviceArray[checkboxCounter].length = 0;
                                                multiDeviceArray[checkboxCounter][0] = phpArray[x][0];
                                                multiDeviceArray[checkboxCounter][1] = $(this).attr('name');
                                                checkboxCounter = checkboxCounter + 1;
                                                break;
                                        }
                                }
                        }
                });
        }

	if(validInput() === false) {
                return;
        }

        restore_existingProjectName = $("#restore_existingProjectName option:selected").val();
        restore_restoreExistingProjectName = $("#restore_restoreExistingProjectName option:selected").val();

	// update backup section
        $("#restore_backupQuestionDiv").hide();
	$("#restore_backupControlsDiv").hide();
		
	// update restore section
	$("#restore_restoreQuestionDiv").hide();
	$("#restore_restoreControlsDiv").hide();
	$("#restore_restoreOutputDiv").show();
        $("#restore_restoreInfoHeaderDiv").show();

        if($("#restoreDiv_backupCheck").attr("checked") != "undefined" && $("#restoreDiv_backupCheck").attr("checked") == "checked") {
		// update backup section
		$("#restore_backupOutputDiv").show();
		$("#restore_backupAccordionDiv").show();
		$("#restore_backupStatusDiv").show();
		$("#restore_backupInfoHeaderDiv").show();

		// perform backup
                backupStatus = "";
                submitBackup();

                var refreshID = setInterval(function() {
                        if(backupStatus == "__ERROR__") {
                                clearInterval(refreshID);
				$("#restore_scrollDiv").mCustomScrollbar("update");
				$("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
                        }
                        else {
                                if(backupStatus == "__SUCCESS__")
                                {
                                        clearInterval(refreshID);
				
					// perform restore
					executeRestore();
                                }
                        }
                },2000);
        }
        else {
		// update backup section
		$("#restore_backupOutputDiv").show();
		$("#restore_backupAccordionDiv").hide();
		$("#restore_backupStatusDiv").show();
		$("#restore_backupStatusDiv").html("<h6><center><br>Backup option not selected.</center></h6>");
		
		// perform restore
		executeRestore();
        }

	// update buttons and scroll
        $("#restore_submitButton").hide();
	$("#restore_scrollDiv").mCustomScrollbar("update");
}


function executeExpect(deviceIP, deviceHostName, executionType, sourceFilename)
{
	if(preAction == "__YES__") {
      		executionType = "__BACKUP__";                                          
	}

	// prevent submitBackup from triggering executeExpect until we are done with current processing
	expectStatus = "__PAUSE__";
	restoreExpectStatus = "__PAUSE__";
	console.log("submitting ajax expect.php w/ deviceIP="+deviceIP+"&deviceHostName="+deviceHostName+"&deviceUsername=cisco"+"&devicePassword=cisco"+"&projectTimestamp="+projectTimestamp+"&executionType="+executionType+"&sourceFilename="+sourceFilename);
        request = $.ajax({
		type: "GET",
                url: "/expect.php",
		cache: false,
            	data: "deviceIP="+deviceIP+"&deviceHostName="+deviceHostName+"&deviceUsername=cisco"+"&devicePassword=cisco"+"&projectTimestamp="+projectTimestamp+"&executionType="+executionType+"&sourceFilename="+sourceFilename,
		dataType: "html"
        });

        // callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
		htmlString = htmlString + response;
                htmlString = htmlString + '\n\n------------------------------------------------------\n';
		if(actionType == "__BASELINE__") {
			htmlString = htmlString + '----------- Finished Baseline Process ----------\n';
                }
                else if(actionType == "__BACKUP__") {
			htmlString = htmlString + '----------- Finished Backup Process ----------\n';
                }
                else if(actionType == "__RESTORE__") {
			if(preAction == "__YES__") {
				htmlString = htmlString + '----------- Finished Backup Process ----------\n';
			}
			else {
				htmlString = htmlString + '----------- Finished Restore Process ----------\n';
			}
                }
                htmlString = htmlString + '------------------------------------------------------\n';
	        if(actionType == "__BASELINE__") {
			if(preAction == "__YES__") {
                                $("#baseline_deviceTextarea_"+deviceHostName).html(htmlString);
                        }
                        else {
                                $("#baseline_baselineAccordionDiv_deviceTextarea_"+deviceHostName).html(htmlString);
                        }
        	}
	        else if(actionType == "__BACKUP__") {
       	         	$("#backup_deviceTextarea_"+deviceHostName).html(htmlString);
	        }
        	else if(actionType == "__RESTORE__") {
			if(preAction == "__YES__") {
                                // output in backup section
                                $("#restore_deviceTextarea_"+deviceHostName).html(htmlString);
                        }
                        else {
                                // backup in restore section
                                $("#restore_restoreAccordionDiv_deviceTextarea_"+deviceHostName).html(htmlString);
                        }
        	}
		
		// test success messages
		if(response.indexOf("100%") < 0) {
			if(response.indexOf("bytes copied") < 0) { 
			    if(response.indexOf("Export Done") < 0) { 
			      if(response.indexOf("Import Done") < 0) { 
				if(response.indexOf("lines built in") < 0) { 
					if(response.indexOf("[OK") < 0) { 
						expectErrorFound = "__YES__"; 
					}
				}
			      }
			    }
			}
		}
		else {
			// test failure messages
			if(response.search(/error/i) > 0) { expectErrorFound = "__YES__"; }
			else if(response.search(/failed/i) > 0) { expectErrorFound = "__YES__"; }
			else if(response.search(/failure/i) > 0) { expectErrorFound = "__YES__"; }
			else if(response.search(/login incorrect/i) > 0) { expectErrorFound = "__YES__"; }
			else if(response.search(/connection refused/i) > 0) { expectErrorFound = "__YES__"; }
		}

		if(expectErrorFound == "__YES__") { 
			expectErrorCounter = expectErrorCounter + 1;
		        if(actionType == "__BASELINE__") {
                		$("#baselineScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
				if(preAction == "__YES__") {
                                        $("#baselineScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
                                }
                                else {
                                        $("#baseline_baselineAccordionDiv_accordionIcon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
                                }
		        }
		        else if(actionType == "__BACKUP__") {
                		$("#backupScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
		        }
		        else if(actionType == "__RESTORE__") {
				if(preAction == "__YES__") {
                                	// output in backup section
                			$("#restoreScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
	                        }
	                        else {
	       	                         // output in restore section
                			$("#restore_restoreAccordionDiv_accordionIcon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
	                        }
        		}
		}
		else {
			expectSuccessCounter = expectSuccessCounter + 1;
		        if(actionType == "__BASELINE__") {
				if(preAction == "__YES__") {
                                        // output in backup section
                                        $("#baselineScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_152_check.png");
                                }
                                else {
                                        $("#baseline_baselineAccordionDiv_accordionIcon_"+deviceHostName).attr("src", "img/glyphicons_152_check.png");
                                }
        		}
		        else if(actionType == "__BACKUP__") {
	                	$("#backupScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_152_check.png");
       			}
		        else if(actionType == "__RESTORE__") {
                                if(preAction == "__YES__") {
                                        // output in backup section
		                	$("#restoreScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_152_check.png");
				}
				else {
	       	                         // output in restore section
		                	$("#restore_restoreAccordionDiv_accordionIcon_"+deviceHostName).attr("src", "img/glyphicons_152_check.png");
				}
        		}
		}

		if(lastIteration == "__YES__") {
			// update button text
			if(actionType == "__BASELINE__") {
				$("#baseline_cancelButton").html("Close");
                        }
                        else if(actionType == "__BACKUP__") {
				$("#backup_cancelButton").html("Close");
                        }
                        else if(actionType == "__RESTORE__") {
				$("#restore_cancelButton").html("Close");
                        }

			// build completion text and show
			var completionMessage = "";
			if(actionType == "__BASELINE__") {
                                if(preAction == "__YES__") {
                                        // output in backup section
					completionMessage = completionMessage+'<center><h6>Finished Collecting Switch/Router Configs!</h6>';
                                        if(expectSuccessCounter == 1) { completionMessage = completionMessage+'1 device backed up successfully.<br>'; }
                                        else { completionMessage = completionMessage+expectSuccessCounter+' devices backed up successfully.<br>'; }
                                        if(expectErrorCounter == 1) { completionMessage = completionMessage+'1 device encountered an error.<br><br>'; }
                                        else { completionMessage = completionMessage+expectErrorCounter+' devices encountered an error.<br><br>'; }
                                        if(projectType == "__NEW__") { completionMessage = completionMessage+'Creating project folder ( '+projectName+' )...'; }
                                        else { completionMessage = completionMessage+'Updating project folder ( '+projectName+' )...</center>'; }
                                }
                                else {
					// output in baseline section
                                        completionMessage = completionMessage+'<center><h6>Finished Running Baseline Job!</h6>';
                                        if(expectSuccessCounter == 1) { completionMessage = completionMessage+'1 device baselined successfully.<br>'; }
                                        else { completionMessage = completionMessage+expectSuccessCounter+' devices baselined successfully.<br>'; }
                                        if(expectErrorCounter == 1) { completionMessage = completionMessage+'1 device encountered an error.<br><br>'; }
                                        else { completionMessage = completionMessage+expectErrorCounter+' devices encountered an error.<br><br>'; }
					if(expectErrorCounter > 0) {
                                                completionMessage = completionMessage+'<h6>Baseline Has Completed With Partial Success!</h6>Please check the devices that have failed and re-run the baseline if necessary.</h6><br></center>';
                                        }
                                        else {
                                                completionMessage = completionMessage+'<h6>Baseline Has Completed Successfully!</h6><br></center>';
                                        }
                                }
                        }
                        else if(actionType == "__BACKUP__") {
				completionMessage = completionMessage+'<center><h6>Finished Collecting Switch/Router Configs!</h6>';	
				if(expectSuccessCounter == 1) { completionMessage = completionMessage+'1 device backed up successfully.<br>'; }
	                        else { completionMessage = completionMessage+expectSuccessCounter+' devices backed up successfully.<br>'; }
	                        if(expectErrorCounter == 1) { completionMessage = completionMessage+'1 device encountered an error.<br><br>'; }
	                        else { completionMessage = completionMessage+expectErrorCounter+' devices encountered an error.<br><br>'; }
	                        if(projectType == "__NEW__") { completionMessage = completionMessage+'Creating project folder ( '+projectName+' )...</center>'; }
	                        else { completionMessage = completionMessage+'Updating project folder ( '+projectName+' )...</center>'; }
                        }
                        else if(actionType == "__RESTORE__") {
                                if(preAction == "__YES__") {
                                        // output in backup section
					completionMessage = completionMessage+'<center><h6>Finished Collecting Switch/Router Configs!</h6>';
	                                if(expectSuccessCounter == 1) { completionMessage = completionMessage+'1 device backed up successfully.<br>'; }
	                                else { completionMessage = completionMessage+expectSuccessCounter+' devices backed up successfully.<br>'; }
	                                if(expectErrorCounter == 1) { completionMessage = completionMessage+'1 device encountered an error.<br><br>'; }
	                                else { completionMessage = completionMessage+expectErrorCounter+' devices encountered an error.<br><br>'; }
	                                if(projectType == "__NEW__") { completionMessage = completionMessage+'Creating project folder ( '+projectName+' )...</center>'; }
	                                else { completionMessage = completionMessage+'Updating project folder ( '+projectName+' )...</center>'; }
                                }
                                else {
					// output in restore section
                                        completionMessage = completionMessage+'<center><h6>Finished Running Restore Job!</h6>';
                                        if(expectSuccessCounter == 1) { completionMessage = completionMessage+'1 device restored successfully.<br>'; }
                                        else { completionMessage = completionMessage+expectSuccessCounter+' devices restored successfully.<br>'; }
                                        if(expectErrorCounter == 1) { completionMessage = completionMessage+'1 device encountered an error.<br><br>'; }
                                        else { completionMessage = completionMessage+expectErrorCounter+' devices encountered an error.<br><br>'; }
					if(expectErrorCounter > 0) {
                                                completionMessage = completionMessage+'<h6>Restore Has Completed With Partial Success!</h6>Please check the devices that have failed and re-run the restore if necessary.</h6><br></center>';
                                        }
                                        else {
                                                completionMessage = completionMessage+'<h6>Restore Has Completed Successfully!</h6><br></center>';
                                        }
                                }
                        }	
/*
			var completionMessage = '<center><h6>Finished Collecting Switch/Router Configs!</h6>';
			if(expectSuccessCounter == 1) { completionMessage = completionMessage+'1 device backed up successfully.<br>'; }
			else { completionMessage = completionMessage+expectSuccessCounter+' devices backed up successfully.<br>'; }
			if(expectErrorCounter == 1) { completionMessage = completionMessage+'1 device encountered an error.<br><br>'; }
                        else { completionMessage = completionMessage+expectErrorCounter+' devices encountered an error.<br><br>'; }
			if(projectType == "__NEW__") { completionMessage = completionMessage+'Creating project folder ( '+projectName+' )...</center>'; }
			else { completionMessage = completionMessage+'Updating project folder ( '+projectName+' )...</center>'; }
*/

//			$("[id$=_backupStatusDiv]").html(completionMessage); 
//			$("[id$=_backupStatusDiv]").show();

			// update scrollbar length to accommodate new text and scroll to bottom
			if(actionType == "__BASELINE__") {
				if(preAction == "__YES__") {
                                        // output in backup section
                                        $("#baseline_backupStatusDiv").html(completionMessage);
                                        $("#baseline_backupStatusDiv").show();
                                }
                                else {
                                        $("#baseline_baselineStatusDiv").html(completionMessage);
                                        $("#baseline_baselineStatusDiv").show();
                                }
				$("#baseline_scrollDiv").mCustomScrollbar("update");
				$("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
                        }
                        else if(actionType == "__BACKUP__") {
				$("[id$=_backupStatusDiv]").html(completionMessage);
				$("[id$=_backupStatusDiv]").show();
				$("#backup_scrollDiv").mCustomScrollbar("update");
				$("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
                        }
			else if(actionType == "__RESTORE__") {
                                if(preAction == "__YES__") {
                                        // output in backup section
					$("#restore_backupStatusDiv").html(completionMessage);
                                        $("#restore_backupStatusDiv").show();
                                }
                                else {
                                        $("#restore_restoreStatusDiv").html(completionMessage);
                                        $("#restore_restoreStatusDiv").show();
                                }
                                $("#restore_scrollDiv").mCustomScrollbar("update");
                                $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
                        }


// go here because preAction is to do a backup first, preAction set to "" after a successful.
// this will prevent the next loop through and block a Restore or Baseline from going any further
if(preAction == "__YES__") {
			// create project folder and report success/fail
			console.log("submitting ajax createProjectFolders.php w/ projectFolderName="+projectFolder+"&has_UFlag="+has_UFlag+"&existingProjectFolder="+existingProjectFolder);
			request = $.ajax({
		                type: "GET",
		                url: "/createProjectFolder.php",
               		 	cache: false,
		                data: "projectFolderName="+projectFolder+"&has_UFlag="+has_UFlag+"&existingProjectFolder="+existingProjectFolder,
                		dataType: "html"
		        });
		        request.done(function (response, textStatus, jqXHR){
				if(response == "__SUCCESS__") {
					// append folder creation success message to completionMessage
					if(projectType == "__NEW__") { completionMessage = completionMessage+'<center>Success, project folder ( '+projectName+' ) was created!<br><br>Copying configuration files to the project...</center>'; }
					else { completionMessage = completionMessage+'<center>Success, project folder ( '+projectName+' ) was updated!<br><br>Copying configuration files to the project...</center>'; }
//					$("[id$=_backupStatusDiv]").html(completionMessage);

					// update scrollbar length to accommodate new text and scroll to bottom
					if(actionType == "__BASELINE__") {
						if(preAction == "__YES__") {
                                                        $("#baseline_backupStatusDiv").html(completionMessage);
                                                }
                                                else {
                                                        $("#baseline_restoreStatusDiv").html(completionMessage);
                                                }
		                                $("#baseline_scrollDiv").mCustomScrollbar("update");
		                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }
		                        else if(actionType == "__BACKUP__") {
						$("[id$=_backupStatusDiv]").html(completionMessage);
		                                $("#backup_scrollDiv").mCustomScrollbar("update");
		                                $("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }
		                        else if(actionType == "__RESTORE__") {
						if(preAction == "__YES__") {
							$("#restore_backupStatusDiv").html(completionMessage);
						}
						else {
							$("#restore_restoreStatusDiv").html(completionMessage);
						}
			                        $("#restore_scrollDiv").mCustomScrollbar("update");
			                        $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
                        		}
				}
				else {
					// append folder creation success message to completionMessage
					completionMessage = completionMessage+'<center>Error (type:unknown) - There was a problem creating project folder ('+projectName+').<br>Please check the console for more information.<br><h6>Backup Failed! Exiting.</h6></center>';
//					$("[id$=_backupStatusDiv]").html(completionMessage);

		                	console.error("Entered request.done with error -- The following error occured: " + textStatus, jqXHR);

					// update scrollbar length to accommodate new text and scroll to bottom
					if(actionType == "__BASELINE__") {
						if(preAction == "__YES__") {
                                                        $("#baseline_backupStatusDiv").html(completionMessage);
                                                }
                                                else {
                                                        $("#baseline_restoreStatusDiv").html(completionMessage);
                                                }
		                                $("#baseline_scrollDiv").mCustomScrollbar("update");
		                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }
		                        else if(actionType == "__BACKUP__") {
						$("[id$=_backupStatusDiv]").html(completionMessage);
		                                $("#backup_scrollDiv").mCustomScrollbar("update");
		                                $("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }
		                        else if(actionType == "__RESTORE__") {
                                                if(preAction == "__YES__") {
							$("#restore_backupStatusDiv").html(completionMessage);
                                                }
                                                else {
                                                        $("#restore_restoreStatusDiv").html(completionMessage);
                                                }
		                                $("#restore_scrollDiv").mCustomScrollbar("update");
		                                $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }

					// update backupStatus var. Used to prevent execution of a Restore or Baseline action in the event of a backup failure.
					backupStatus = "__ERROR__";

					return;
				}
        		});
        		request.fail(function (jqXHR, textStatus, errorThrown){
				// append folder creation success message to completionMessage
				completionMessage = completionMessage+'<center>Error (type:request.fail) - There was a problem creating project folder ('+projectName+').<br>Please check the console for more information.<br><h6>Backup Failed! Exiting.</h6></center>';
//				$("[id$=_backupStatusDiv]").html(completionMessage);

		                console.error("Entered request.fail -- The following error occured: " + textStatus, errorThrown);

				// update scrollbar length to accommodate new text and scroll to bottom
				if(actionType == "__BASELINE__") {
					if(preAction == "__YES__") {
                                                $("#baseline_backupStatusDiv").html(completionMessage);
                                        }
                                        else {
                                                $("#baseline_restoreStatusDiv").html(completionMessage);
                                        }
	                                $("#baseline_scrollDiv").mCustomScrollbar("update");
	                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
	                        }
	                        else if(actionType == "__BACKUP__") {
					$("[id$=_backupStatusDiv]").html(completionMessage);
	                                $("#backup_scrollDiv").mCustomScrollbar("update");
	                                $("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
	                        }
	                        else if(actionType == "__RESTORE__") {
                                                if(preAction == "__YES__") {
							$("#restore_backupStatusDiv").html(completionMessage);
                                                }
                                                else {
                                                        $("#restore_restoreStatusDiv").html(completionMessage);
                                                }

	                                $("#restore_scrollDiv").mCustomScrollbar("update");
	                                $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
	                        }
					
				// update backupStatus var. Used to prevent execution of a Restore or Baseline action in the event of a backup failure.
				backupStatus = "__ERROR__";

				return;
        		});


			// move backup files to project folder and report success/fail
			console.log("submitting ajax populateProjectFolder.php w/ projectFolderName="+projectFolder+"&projectTimestamp="+projectTimestamp+"&existingProjectFolder="+existingProjectFolder);
			request = $.ajax({
                                type: "GET",
                                url: "/populateProjectFolder.php",
                                cache: false,
                                data: "projectFolderName="+projectFolder+"&projectTimestamp="+projectTimestamp+"&existingProjectFolder="+existingProjectFolder,
                                dataType: "html"
                        });
                        request.done(function (response, textStatus, jqXHR){
				if(response == "__SUCCESS__") {
                                        // append folder creation success message to completionMessage
					if(expectErrorCounter > 0) {
	                                        completionMessage = completionMessage+'<center>Success, copy has finished!.<br><br><h6>Backup Has Completed With Partial Success!</h6>Please check the devices that have failed and re-run the backup if necessary.<br><br></center>';
						backupStatus = "__ERROR__";
					}
					else {
	                                        completionMessage = completionMessage+'<center>Success, copy has finished!.<br><br><h6>Backup Has Completed Successfully!</h6></center>';
						backupStatus = "__SUCCESS__";
					}

//                                        $("[id$=_backupStatusDiv]").html(completionMessage);

					// update scrollbar length to accommodate new text and scroll to bottom
					if(actionType == "__BASELINE__") {
						if(preAction == "__YES__") {
                                                	$("#baseline_backupStatusDiv").html(completionMessage);
                                        	}       
                                        	else {  
                                                	$("#baseline_restoreStatusDiv").html(completionMessage);
                                        	}
		                                $("#baseline_scrollDiv").mCustomScrollbar("update");
		                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }
		                        else if(actionType == "__BACKUP__") {
						$("[id$=_backupStatusDiv]").html(completionMessage);
		                                $("#backup_scrollDiv").mCustomScrollbar("update");
		                                $("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }
		                        else if(actionType == "__RESTORE__") {
                                                if(preAction == "__YES__") {
							$("#restore_backupStatusDiv").html(completionMessage);
                                                }
                                                else {
                                                        $("#restore_restoreStatusDiv").html(completionMessage);
                                                }

		                                $("#restore_scrollDiv").mCustomScrollbar("update");
		                                $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
                        		}

					preAction = "";
                                }
                                else {
                                        // append folder creation success message to completionMessage
                                        completionMessage = completionMessage+'<center>Error (type:unknown) - There was a problem copying the configuration files.<br>Please check the console for more information.<br><br><h6>Backup Failed! Exiting.</h6></center>';
//                                        $("[id$=_backupStatusDiv]").html(completionMessage);

                                        console.error("Entered request.done with error -- The following error occured: " + textStatus, jqXHR);

					// update scrollbar length to accommodate new text and scroll to bottom
					if(actionType == "__BASELINE__") {
						if(preAction == "__YES__") {
                                                        $("#baseline_backupStatusDiv").html(completionMessage);
                                                }
                                                else {
                                                        $("#baseline_restoreStatusDiv").html(completionMessage);
                                                }
		                                $("#baseline_scrollDiv").mCustomScrollbar("update");
		                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }
		                        else if(actionType == "__BACKUP__") {
						$("[id$=_backupStatusDiv]").html(completionMessage);
		                                $("#backup_scrollDiv").mCustomScrollbar("update");
		                                $("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
		                        }
		                        else if(actionType == "__RESTORE__") {
                                                if(preAction == "__YES__") {
							$("#restore_backupStatusDiv").html(completionMessage);
                                                }
                                                else {
                                                        $("#restore_restoreStatusDiv").html(completionMessage);
                                                }

		                                $("#restore_scrollDiv").mCustomScrollbar("update");
		                                $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
                        		}
				
					// update backupStatus var. Used to prevent execution of a Restore or Baseline action in the event of a backup failure.
					backupStatus = "__ERROR__";

					return;
                                }
			});
			request.fail(function (jqXHR, textStatus, errorThrown){
				// append folder creation success message to completionMessage
                                        completionMessage = completionMessage+'<center>Error (type:request.fail) - There was a problem copying the configuration files.<br>Please check the console for more information.<br><br><h6>Backup Failed! Exiting.</h6></center>';
//                                $("[id$=_backupStatusDiv]").html(completionMessage);

				console.error("Entered request.fail -- The following error occured: " + textStatus, errorThrown);

                                // update scrollbar length to accommodate new text and scroll to bottom
				if(actionType == "__BASELINE__") {
					if(preAction == "__YES__") {
                                                $("#baseline_backupStatusDiv").html(completionMessage);
                                        }
                                        else {
                                                $("#baseline_restoreStatusDiv").html(completionMessage);
                                        }
	                                $("#baseline_scrollDiv").mCustomScrollbar("update");
	                                $("#baseline_scrollDiv").mCustomScrollbar("scrollTo","last");
	                        }
	                        else if(actionType == "__BACKUP__") {
					$("[id$=_backupStatusDiv]").html(completionMessage);
	                                $("#backup_scrollDiv").mCustomScrollbar("update");
	                                $("#backup_scrollDiv").mCustomScrollbar("scrollTo","last");
	                        }
	                        else if(actionType == "__RESTORE__") {
                                                if(preAction == "__YES__") {
                                                        $("#restore_backupStatusDiv").html(completionMessage);
                                                }
                                                else {
                                                        $("#restore_restoreStatusDiv").html(completionMessage);
                                                }

		                        $("#restore_scrollDiv").mCustomScrollbar("update");
		                        $("#restore_scrollDiv").mCustomScrollbar("scrollTo","last");
                        	}
					
				// update backupStatus var. Used to prevent execution of a Restore or Baseline action in the event of a backup failure.
				backupStatus = "__ERROR__";

				return;
			});
} // end if preAction == "__YES__"
		}

		// prep for next iteration
		expectStatus = "__RUN__";
		restoreExpectStatus = "__RUN__";
		expectErrorFound = "__NO__";
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
		expectStatus = "__RUN__";
		restoreExpectStatus = "__RUN__";
                console.error("The following error occured: " + textStatus, errorThrown);

		// add some into to this devices textArea
		htmlString = htmlString+'*** Error *** Caught request.fail when executing expect for this device.';
		if(actionType == "__BASELINE__") {
			if(preAction == "__YES__") {
				$("#baseline_deviceTextarea_"+deviceHostName).html(htmlString);
			}
                        else {
                                $("#baseline_baselineAccordionDiv_deviceTextarea_"+deviceHostName).html(completionMessage);
                        }
			$("#baseline_deviceTextarea_"+deviceHostName).html(htmlString);
                }
                else if(actionType == "__BACKUP__") {
			$("#backup_deviceTextarea_"+deviceHostName).html(htmlString);
                }
                else if(actionType == "__RESTORE__") {
			if(preAction == "__YES__") {
				// output in backup section
				$("#restore_deviceTextarea_"+deviceHostName).html(htmlString);
			}
			else {
				// backup in restore section
				$("#restore_restoreAccordionDiv_deviceTextarea_"+deviceHostName).html(htmlString);
			}
                }
               
		// increment counter and show error icon         
		expectErrorCounter = expectErrorCounter + 1;
		if(actionType == "__BASELINE__") {
			if(preAction == "__YES__") {
                                $("#baselineScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
                        }
                        else {
                                $("#baseline_baselineAccordionDiv_accordionIcon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
                        }
                }
                else if(actionType == "__BACKUP__") {
                	$("#backupScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
                }
                else if(actionType == "__RESTORE__") {
                        if(preAction == "__YES__") {
                		$("#restoreScrollDiv_accordion_icon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
                        }
                        else {
				$("#restore_restoreAccordionDiv_accordionIcon_"+deviceHostName).attr("src", "img/glyphicons_207_remove_2.png");
                        }
                }

		// update backupStatus var. Used to prevent execution of a Restore or Baseline action in the event of a backup failure.
                backupStatus = "__ERROR__";
        });
}

function executePing()
{
	request = $.ajax({
               	url: "/pingData.php"
	});

	// callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
	      	if(response.aResults[0].length > 0) {
			displayPingData(response);
		}
		else
		{
			console.log("no results in reponse");
		}
    	});

	// callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
                // log the error to the console
                console.error(
                        "The following error occured: "+
                        textStatus, errorThrown
                );
        });
}

function displayPingData(response) {
               
	jQuery('.ajax-response').empty();

	if(response.aResults[0].length > 0) {
			var totalDevices = 0, upDevices = 0, downDevices = 0;

			$.each(response.aResults, function() {
				// build summary table results (total devices, devices up, devices down)
				totalDevices += 1;	
				if(this[2] == "Up") { upDevices += 1; } else { downDevices += 1; }
			});

			// update summary table
			$('#ping_summary_table > tbody:first').find('td:first').html(totalDevices).next().html(upDevices).next().html(downDevices);
	

			// update info table
			// iterate through each tr
                        $('#ping_info_table tr').each(function(i) {                                
				var $data = [];                                
				var x = $(this);                                
				var cells = x.find('td');
				// iterate through each td
                                $(cells).each(function(i) {
                                        var $d = $(this).val() || $(this).text();
				
					// iterate through ajax result set
					$.each(response.aResults, function() {
						// if we find a matching ip (i.e. tr ip = response ip), then update it's associated
						// pingDate, deviceName and deviceStatus on tables ajacent td's within same tr
						if($d == this[1])
						{
							// update date
							$(x).find('td:eq(0)').html(this[0]);
							// update name
							$(x).find('td:eq(2)').html(this[4]);
							// update status
							$(x).find('td:eq(3)').html(this[2]);

							// break out of the loop, we found a match so no poin
							return false;
						}
					});
                                });
                        });     
	}
}

function getRestoreList()
{
    $("#restore_restoreProjectFolderListDiv_table").hide();
    $("#restore_restoreProjectFolderListDiv_table tbody").html('');
    $("#restore_restoreProjectFolderListDiv").hide();
    //$("#restore_restoreProjectFolderListDiv_scrollDiv").css('height', '10');
    //$("#restore_restoreProjectFolderListDiv_scrollDiv").mCustomScrollbar("update");
    //$("#restore_restoreProjectFolderListDiv_scrollDiv").mCustomScrollbar("scrollTo", "top");

    if($("#restore_restoreExistingProjectName option:selected").val() != "__EMPTY__") {
    	//$("#restore_restoreProjectFolderListDiv_scrollDiv").css('height', '150');
	$("#restore_restoreProjectFolderListDiv_loaderMessage").show();

	// get project file list from selected option tag value
        getProjectFiles($("#restore_restoreExistingProjectName option:selected").val());
        var refreshID = setInterval(function() {
                if(projectConfigFiles.length > 0) {
                        clearInterval(refreshID);

			// show project file list div
			$("restore_restoreProjectFolderListDiv").show();

                        var thisProjectConfigFilesLength = projectConfigFiles.length;
                        var thisProjectConfigFilesCounter = 0;
			var thisTableHtml = "";
                        for(var i=0; i<thisProjectConfigFilesLength; i++) {
				var thisPrjectNameParts = projectConfigFiles[i].split("_");
				thisTableHtml = thisTableHtml + '<tr><td><input type="checkbox" name="'+thisPrjectNameParts[1]+'"/></td><td>'+thisPrjectNameParts[1]+'</td><td>'+thisPrjectNameParts[0]+'</td><td>n/a</td></tr>';
				if(i+1 == thisProjectConfigFilesLength) {
					$("#restore_restoreProjectFolderListDiv_loaderMessage").hide();
					$("#restore_restoreProjectFolderListDiv_table").show();
    					$("#restore_restoreProjectFolderListDiv").show();
					$("#restore_restoreProjectFolderListDiv_table tbody").html(thisTableHtml);	
					//$("#restore_restoreProjectFolderListDiv_scrollDiv").mCustomScrollbar("update");
				        //$("#restore_restoreProjectFolderListDiv_scrollDiv").mCustomScrollbar("scrollTo", "top");
				}	
                        }
    			$("#restore_scrollDiv").mCustomScrollbar("update");
    			$("#restore_scrollDiv").mCustomScrollbar("scrollTo", "last");
                }
        },2000);
    }

    $("#restore_scrollDiv").mCustomScrollbar("update");
    $("#restore_scrollDiv").mCustomScrollbar("scrollTo", "last");
}



// baseline Modal
$("input[type=radio][id=baselineDivRadio_createNew]").click(function() {
        $("#baselineDivTbody_createNew").show();
        $("#baselineDivTbody_updateExisting").hide();
});
$("input[type=radio][id=baselineDivRadio_updateExisting]").click(function() {
        $("#baselineDivTbody_updateExisting").show();
        $("#baselineDivTbody_createNew").hide();
});
$('.baselineDiv_backupCheck').click(function() {
    if( $(this).is(':checked')) {
        $("#baseline_backupControlsDiv").show();
    } else {
        $("#baseline_backupControlsDiv").hide();
    }
});


// backup Modal
$("input[type=radio][id=backupDivRadio_createNew]").click(function() {
        $("#backupDivTbody_createNew").show();
        $("#backupDivTfoot_createNew").show();
        $("#backupDivTbody_updateExisting").hide();
        $("#backupDivTfoot_updateExisting").hide();
});
$("input[type=radio][id=backupDivRadio_updateExisting]").click(function() {
        $("#backupDivTbody_updateExisting").show();
        $("#backupDivTfoot_updateExisting").show();
        $("#backupDivTbody_createNew").hide();
        $("#backupDivTfoot_createNew").hide();
});


// restore Modal
$("input[type=radio][id=restoreDivRadio_createNew]").click(function() {
        $("#restoreDivTbody_createNew").show();
        $("#restoreDivTbody_updateExisting").hide();
});
$("input[type=radio][id=restoreDivRadio_updateExisting]").click(function() {
        $("#restoreDivTbody_updateExisting").show();
        $("#restoreDivTbody_createNew").hide();
});
$('.restoreDiv_backupCheck').click(function() {
    	if( $(this).is(':checked')) {
        	$("#restore_backupControlsDiv").show();
    	} 
	else {
        	$("#restore_backupControlsDiv").hide();
    	}

	$("#restore_scrollDiv").mCustomScrollbar("update");
	$("#restore_scrollDiv").mCustomScrollbar("scrollTo", "top");
	//$("#restore_restoreProjectFolderListDiv_scrollDiv").mCustomScrollbar("update");
    	//$("#restore_restoreProjectFolderListDiv_scrollDiv").mCustomScrollbar("scrollTo", "top");
});

$("#restore_restoreExistingProjectName").change(function() {
  	var id = $(this).find("option:selected").attr("id");
	console.log(id.val());
	console.log($("#restore_restoreExistingProjectName option:selected"));
});





