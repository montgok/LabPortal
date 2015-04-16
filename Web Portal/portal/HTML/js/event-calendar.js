var EventStart = "00-00-00T00:00:00";
var EventEnd = "00-00-00T00:00:00";
function setEventStartEnd(eventType)
{
	if(eventType == "create") {
		// createEvent
		var eventStartDate = $("#start-datepicker").val();
	        var eventStartTime = $("#start-timepicker").val();
	        var eventEndDate = $("#end-datepicker").val();
	        var eventEndTime = $("#end-timepicker").val();
		if($("#start-datepicker").val() == "undefined" || $("#start-datepicker").val() == "") { eventStartDate = "00/00/00"; }
		if($("#end-datepicker").val() == "undefined" || $("#end-datepicker").val() == "") { eventEndDate = "00/00/00"; }
		if($("#start-timepicker").val() == "undefined" || $("#start-timepicker").val() == "") { eventStartTime = "00:00:00"; }
		if($("#end-timepicker").val() == "undefined" || $("#end-timepicker").val() == "") { eventEndTime = "00:00:00"; }
	        var eventStartDateParts = eventStartDate.split("/");
	        var thisEventStartDate = eventStartDateParts[2]+'-'+eventStartDateParts[0]+'-'+eventStartDateParts[1];
	        var eventEndDateParts = eventEndDate.split("/");
	        var thisEventEndDate = eventEndDateParts[2]+'-'+eventEndDateParts[0]+'-'+eventEndDateParts[1];
		if(eventStartTime == "00:00:00") { EventStart = thisEventStartDate; } else { EventStart = thisEventStartDate+'T'+eventStartTime; }
		if(eventEndTime == "00:00:00" ) { EventEnd = thisEventEndDate; } else { EventEnd = thisEventEndDate+'T'+eventEndTime; }
	} else if(eventType == "edit") {
		var eventStartDate = $("#editEvent_startDatepicker").val();
	        var eventStartTime = $("#editEvent_startTimepicker").val();
	        var eventEndDate = $("#editEvent_endDatepicker").val();
	        var eventEndTime = $("#editEvent_endTimepicker").val();
	        if($("#editEvent_startDatepicker").val() == "undefined" || $("#editEvent_startDatepicker").val() == "") { eventStartDate = "00/00/00"; }
	        if($("#editEvent_endDatepicker").val() == "undefined" || $("#editEvent_endDatepicker").val() == "") { eventEndDate = "00/00/00"; }
	        if($("#editEvent_startTimepicker").val() == "undefined" || $("#editEvent_startTimepicker").val() == "") { eventStartTime = "00:00:00"; }
	        if($("#editEvent_endTimepicker").val() == "undefined" || $("#editEvent_endTimepicker").val() == "") { eventEndTime = "00:00:00"; }
	        var eventStartDateParts = eventStartDate.split("/");
	        var thisEventStartDate = eventStartDateParts[2]+'-'+eventStartDateParts[0]+'-'+eventStartDateParts[1];
	        var eventEndDateParts = eventEndDate.split("/");
	        var thisEventEndDate = eventEndDateParts[2]+'-'+eventEndDateParts[0]+'-'+eventEndDateParts[1];
	        if(eventStartTime == "00:00:00") { EventStart = thisEventStartDate; } else { EventStart = thisEventStartDate+'T'+eventStartTime; }
	        if(eventEndTime == "00:00:00" ) { EventEnd = thisEventEndDate; } else { EventEnd = thisEventEndDate+'T'+eventEndTime; }
	}
}

$(document).ready(function(){
	// get todays date (year-month-day) for fullCalendar defaultDate property
	function getMonth(date) { var month = date.getMonth(); month = month + 1; return month < 10 ? '0' + month : month; }
	function getDay(date) { var day = date.getDate(); return day < 10 ? '0' + day : day; }
	var date = new Date; var todaysYear = date.getFullYear(); var todaysMonth = getMonth(date); var todaysDay = getDay(date); var todaysDate = todaysYear+'-'+todaysMonth+'-'+todaysDay;

	// ---------------- fullcalendar --------------------------
    	$('#event-calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
    		},
    		defaultDate: todaysDate,
    		editable: false,
		events: {
			url: 'php/get-events.php',
			error: function() {
				$('#script-warning').show();
			}
		},
		dayClick: function(date, jsEvent, view) {
			// set start and end dates to day clicked on calendar (and convert format so it works)
			var clickedDayParts = date.format().split("-");
			$('input[id="start-datepicker"]').val(clickedDayParts[1]+'/'+clickedDayParts[2]+'/'+clickedDayParts[0]); 
			$('input[id="end-datepicker"]').val(clickedDayParts[1]+'/'+clickedDayParts[2]+'/'+clickedDayParts[0]); 
			// determine if any resources are being used on this day and hide if appropriate
			setEventStartEnd("create");
                	$("input[id=eventResourceDeviceCheckbox]").each(function() {
                        	hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
                	});

			$('#eventModal_title').val('Create Event');
			$('#createEventModal').modal('show');
    		},
		eventClick: function(calEvent, jsEvent, view) {
			getThisEventsData(calEvent.id);
			//$('#previewEventModal_createdBy').html(calEvent.createdBy);
			//$('#previewEventModal_title').html(calEvent.title);
			showHideEditEventButton();
			$('#previewEventModal').modal('show');
        		//alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        		//alert('View: ' + view.name);
    		},
		loading: function(bool) {
			$('#loading').toggle(bool);
		}
	});
	// ---------------- fullcalendar --------------------------


	// ---------------- datepicker/timepicker --------------------------
	// createEvent
	$('input[id="start-datepicker"]').datepicker();
	$('input[id="end-datepicker"]').datepicker();
	$('input[id="start-timepicker"]').timepicker({ 'scrollDefault': 'now', 'timeFormat': 'H:i:s' });
	$('input[id="end-timepicker"]').timepicker({ 'scrollDefault': 'now', 'timeFormat': 'H:i:s' });
	// updateEvent
	$('input[id="editEvent_startDatepicker"]').datepicker();
	$('input[id="editEvent_endDatepicker"]').datepicker();
	$('input[id="editEvent_startTimepicker"]').timepicker({ 'scrollDefault': 'now', 'timeFormat': 'H:i:s' });
	$('input[id="editEvent_endTimepicker"]').timepicker({ 'scrollDefault': 'now', 'timeFormat': 'H:i:s' });
	// ---------------- datepicker/timepicker --------------------------

	// ---------------- datepicker/timepicker change --------------------------
	// createEvent
	$('input[id="start-datepicker"]').change(function() {
		setEventStartEnd("create");
		$("input[id=eventResourceDeviceCheckbox]").each(function() {
			hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
        	});
	});
	$('input[id="end-datepicker"]').change(function() {
		setEventStartEnd("create");
		$("input[id=eventResourceDeviceCheckbox]").each(function() {
			hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
        	});
	});
	$('input[id="start-timepicker"]').change(function() {
		setEventStartEnd("create");
		$("input[id=eventResourceDeviceCheckbox]").each(function() {
			hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
        	});
	});
	$('input[id="end-timepicker"]').change(function() {
		setEventStartEnd("create");
		$("input[id=eventResourceDeviceCheckbox]").each(function() {
			hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
        	});
	});
	// updateEvent
	$('input[id="editEvent_startDatepicker"]').change(function() {
                setEventStartEnd("edit");
                $("input[id=editEvent_eventResourceDeviceCheckbox]").each(function() {
                        hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
                });
        });
        $('input[id="editEvent_endDatepicker"]').change(function() {
                setEventStartEnd("edit");
                $("input[id=editEvent_eventResourceDeviceCheckbox]").each(function() {
                        hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
                });
        });
        $('input[id="editEvent_startTimepicker"]').change(function() {
                setEventStartEnd("edit");
                $("input[id=editEvent_eventResourceDeviceCheckbox]").each(function() {
                        hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
                });
        });
        $('input[id="editEvent_endTimepicker"]').change(function() {
                setEventStartEnd("edit");
                $("input[id=editEvent_eventResourceDeviceCheckbox]").each(function() {
                        hideReservedResource($(this).attr('name'), EventStart, EventEnd, "new");
                });
        });
	// ---------------- datepicker/timepicker change --------------------------

	// ---------------- all day checkbox --------------------------
	$("#all-day-checkbox").click(function() {
	    if($('#all-day-checkbox').prop('checked') == true) {
                $("#start-time-label").hide();
                $("#start-timepicker").hide();
                $("#end-time-label").hide();
                $("#end-timepicker").hide();
            } else {
                $("#start-time-label").show();
                $("#start-timepicker").show();
                $("#end-time-label").show();
                $("#end-timepicker").show();
            }
	});
	if($('#all-day-checkbox').prop('checked') == true) {
		$("#start-time-label").hide();
		$("#start-timepicker").hide();
		$("#end-time-label").hide();
		$("#end-timepicker").hide();
	} else {
		$("#start-time-label").show();
		$("#start-timepicker").show();
		$("#end-time-label").show();
		$("#end-timepicker").show();
	}
	// editEvent page
	$('#editEvent_allDayCheckbox').click(function() {
		if($('#editEvent_allDayCheckbox').prop('checked') == true) {  
			$('#editEvent_startTimepicker').hide();
                        $('#editEvent_endTimepicker').hide();
                        $('#editEvent_startTimeLabel').hide();
                        $('#editEvent_endTimeLabel').hide();
		} else {
                        $('#editEvent_startTimepicker').show();
                        $('#editEvent_endTimepicker').show();
                        $('#editEvent_startTimeLabel').show();
                        $('#editEvent_endTimeLabel').show();
		}
	});
	// ---------------- all day checkbox --------------------------


	// ---------------- repeat checkbox --------------------------
	$("#repeat-checkbox").click(function() {
            if($('#repeat-checkbox').prop('checked') == true) {
		$("#repeat-div").show();
	    } else {
		$("#repeat-div").hide();
	    }
	});
        if($('#repeat-checkbox').prop('checked') == true) {
		$("#repeat-div").show();
	} else {
		$("#repeat-div").hide();
	}
	// ---------------- repeat checkbox --------------------------


});

function createCalEvent() {
	// ------------------ validate mandatory fields have been entered ----------------
	if($("#all-day-checkbox").prop('checked') == true) {
		if( $("#event-title").val().length == 0 || $("#start-datepicker").val().length == 0 || $("#end-datepicker").val().length == 0 ) {
			alert('Please enter a Title, Start and End date for this event.');
			return;
		}
	}
	else {
		if( $("#event-title").val().length == 0 || $("#start-datepicker").val().length == 0 || $("#end-datepicker").val().length == 0 || $("#start-timepicker").val().length == 0 || $("#end-timepicker").val().length == 0 ) {
			alert('Please enter a Title, Start and End date/time for this event.');
			return;
		}
	}
	// ------------------ validate mandatory fields have been entered ----------------


	// ------------------- create GET vars for PHP script -----------------
	var eventTitle = $("#event-title").val();
        var eventStartDate = $("#start-datepicker").val();
        var eventStartTime = $("#start-timepicker").val();
        var eventEndDate = $("#end-datepicker").val();
        var eventEndTime = $("#end-timepicker").val();
	var eventAllDay = $("#all-day-checkbox").prop('checked');
	var eventDescription = $("#event-description").val();

	var eventResourceDeviceList = '';
	var eventResourcePersonList = '';
        $("input[id=eventResourceDeviceCheckbox]").each(function() {
                if(this.checked) {
			eventResourceDeviceList = eventResourceDeviceList+$(this).attr('name')+'|';
                }
        });
        $("input[id=eventResourcePersonCheckbox]").each(function() {
                if(this.checked) {
			eventResourcePersonList = eventResourcePersonList+$(this).attr('name')+'|';
                }
        });

	// convert dates in format (MM-DD-YYYY) to fullcalendar format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:00)
	var eventStartDateParts = eventStartDate.split("/");
	var thisEventStartDate = eventStartDateParts[2]+'-'+eventStartDateParts[0]+'-'+eventStartDateParts[1];
	var eventEndDateParts = eventEndDate.split("/");
	var thisEventEndDate = eventEndDateParts[2]+'-'+eventEndDateParts[0]+'-'+eventEndDateParts[1];

	// perform quick date cronological comparison before going forward
	var startDateChecker = eventStartDateParts[2]+eventStartDateParts[0]+eventStartDateParts[1];
	var endDateChecker = eventEndDateParts[2]+eventEndDateParts[0]+eventEndDateParts[1];
	if(startDateChecker > endDateChecker) {
		alert('Warning, the event "Start Date" cannot be the same or after the event "End Date."');
                return;
	}
	// perform quick time cronological comparison before going forward
	var eventStartTimeParts = eventStartTime.split(':');
	var startTimeChecker = eventStartTimeParts[0]+eventStartTimeParts[1]+eventStartTimeParts[2];
	var eventEndTimeParts = eventEndTime.split(':');
	var endTimeChecker = eventEndTimeParts[0]+eventEndTimeParts[1]+eventEndTimeParts[2];
	if(thisEventStartDate == thisEventEndDate) {
		if(eventAllDay == false) {
			if(startTimeChecker >= endTimeChecker) {
				alert('Warning, the event "Start Time" cannot be the same or after the event "End Time" on single-day Events.');
	                	return;
			}
		}
	}

	// if not an all-day event then append the start and end times to the start and end dates with 'T' for fullcalendar format 
	if(eventAllDay == false) {
		thisEventStartDate = thisEventStartDate+'T'+eventStartTime;
		thisEventEndDate = thisEventEndDate+'T'+eventEndTime;
	}
	// ------------------- create GET vars for PHP script -----------------


	// ----------------- submit event information to the database via ajax/php -------------------
	request = $.ajax({
                type: "GET",
                url: "/portal/HTML/php/createCalEvent.php?eventTitle="+eventTitle+"&eventStartDate="+thisEventStartDate+"&eventEndDate="+thisEventEndDate+"&eventDescription="+eventDescription+"&eventResourceDeviceList="+eventResourceDeviceList+"&eventResourcePersonList="+eventResourcePersonList+"&thisUserName="+thisUserName,
                cache: false,
        });
        request.done(function (response, textStatus, jqXHR){
                if(response[0] == "__SUCCESS__") {
			$('#createEventModal').modal('hide');
			alert('Event Added!');			
			//$('#event-calendar').fullCalendar('refresh');
			location.reload();
		} else if(response[0] == "__FAILURE__") {
                	console.error("createCalEvent() -- __FAILURE__ returned from createCalEvent.php -- " + textStatus, errorThrown);
		}
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
                console.error("createCalEvent() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
        });
	// ----------------- submit event information to the database via ajax/php -------------------
}

function hideReservedResource(resource, eventStart, eventEnd, eventType)
{
	request = $.ajax({
                type: "GET",
                url: "/portal/HTML/php/hideReservedResource.php?resource="+resource+"&eventStart="+eventStart+"&eventEnd="+eventEnd,
                cache: false,
        });
        request.done(function (response, textStatus, jqXHR){
                if(response[0][0] == "__SHOW__") {
			$("#eventResourceDeviceSpan_"+response[0][1]).css('color', 'white');
			$("#editEvent_eventResourceDeviceSpan_"+response[0][1]).css('color', 'white');
			if($("input[name="+response[0][1]+"]").prop('checked') == true) {
				$("input[name="+response[0][1]+"]").click();
			}
                } else if(response[0][0] == "__HIDE__") {
			$("#eventResourceDeviceSpan_"+response[0][1]).css('color', 'red');
			$("#editEvent_eventResourceDeviceSpan_"+response[0][1]).css('color', 'red');
			if(eventType == "edit") {
				if($("input[name="+response[0][1]+"]").prop('checked') == false) {
					$("input[name="+response[0][1]+"]").click();
				}
			} else {
				if($("input[name="+response[0][1]+"]").prop('checked') == true) {
                                	$("input[name="+response[0][1]+"]").click();
                        	}
			}
                } else if(response[0][0] == "__FAILURE__") {
                        console.error("hideReservedResource() -- __FAILURE__ returned from hideReservedResource.php -- " + textStatus, errorThrown);
                }
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
                console.error("hideReservedResource() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
        });
}

function getThisEventsData(id) 
{
	$('#previewDiv').show();
	$('#editDiv').hide();

	request = $.ajax({
                type: "GET",
                url: "/portal/HTML/php/getThisEventsData.php?id="+id+"&requestType=preview",
                cache: false,
        });
        request.done(function (response, textStatus, jqXHR){
		if(response[0] == "__SUCCESS__") {	
			if(response[1]) { 
				var thisEventId = response[1]['eventId'];
                                var thisTitle = response[1]['title'];
                                var thisCreatedBy = response[1]['createdBy'];
                                var thisDescription = response[1]['description'];
                                var thisResourceDeviceList = response[1]['resourceDeviceList'];
                                var thisResourcePersonList = response[1]['resourcePersonList'];

				var thisStartDate = response[1]['startDate'];
				var thisEndDate = response[1]['endDate'];
				var thisStartTime = response[1]['startTime'];
				var thisEndTime = response[1]['endTime'];
                                var thisStart = "";
                                var thisEnd = "";

				if(thisStartTime == "__NONE__") {
					thisStart = thisStartDate+" (all day)";
					thisEnd = thisEndDate+" (all day)";
				} else {
					thisStart = thisStartDate+" @ "+thisStartTime;
					thisEnd = thisEndDate+" @ "+thisEndTime;
				}

                        	$('#previewEventModal_title').html(thisTitle);
                        	$('#previewEventModal_createdBy').html(thisCreatedBy);
				$('#eventStart').html(thisStart);
				$('#eventEnd').html(thisEnd);
				$('#eventDescription').html(thisDescription);
				$('#resourceDeviceList').html(thisResourceDeviceList);
				$('#resourcePersonList').html(thisResourcePersonList);
				$('#thisEventId').attr('value', id);
				
				if($("#previewEventModal_createdBy").html() == thisUserName) { 
					$("#previewEvent_editButton").show(); 
				}
			        else { 
					$("#previewEvent_editButton").hide(); 
				}
			}
		}
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
                console.error("hideReservedResource() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
        });
}

function deleteEvent()
{
	if(confirm('** Are you sure you want to delete this event? **\n\nSelect \'OK\' to delete.\n\nSelect \'Cancel\' to keep it and go back.')) {
		var thisEventId = $('#thisEventId').val();
	        request = $.ajax({
                	type: "GET",
                	url: "/portal/HTML/php/deleteEvent.php?id="+thisEventId,
	                cache: false,
	        });
	        request.done(function (response, textStatus, jqXHR){
	       	     	if(response[0] == "__SUCCESS__") {
				alert('The selected event has been successfully deleted');
				location.reload();
                	} else if(response[0] == "__SUCCESS__") {
				alert('** Warning **\n\nAn error was encountered when trying to delete this event, please try again.');
			}	
        	});
        	request.fail(function (jqXHR, textStatus, errorThrown){
       	         	console.error("deleteEvent() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
	        });

	} else {
		//alert('no');
	}
}

function editEvent()
{
	var id = $('#thisEventId').val();
	$('#previewDiv').hide();
	$('#editDiv').show();

        request = $.ajax({
                type: "GET",
                url: "/portal/HTML/php/getThisEventsData.php?id="+id+"&requestType=edit",
                cache: false,
        });
        request.done(function (response, textStatus, jqXHR){
                if(response[0] == "__SUCCESS__") {
                        if(response[1]) {
                                var thisEventId = response[1]['eventId'];
                                var thisTitle = response[1]['title'];
                                var thisCreatedBy = response[1]['createdBy'];
                                var thisDescription = response[1]['description'];
                                var thisResourceDeviceList = response[1]['resourceDeviceList'];
                                var thisResourcePersonList = response[1]['resourcePersonList'];

                                var thisStartDate = response[1]['startDate'];
                                var thisEndDate = response[1]['endDate'];
                                var thisStartTime = response[1]['startTime'];
                                var thisEndTime = response[1]['endTime'];
                                var thisStart = "";
                                var thisEnd = "";

                                $('#editEvent_title').attr('value', thisTitle);
                                $('#editEvent_startDatepicker').attr('value', thisStartDate);
                                $('#editEvent_endDatepicker').attr('value', thisEndDate);
                                if(thisStartTime == "__NONE__") {
					if($('#editEvent_allDayCheckbox').prop('checked') == false) {	
						$('#editEvent_allDayCheckbox').click(); 
					}
				} else {
					if($('#editEvent_allDayCheckbox').prop('checked') == true) {	
						$('#editEvent_allDayCheckbox').click(); 
					}
                                	$('#editEvent_startTimepicker').attr('value', thisStartTime);
                                	$('#editEvent_endTimepicker').attr('value', thisEndTime);
				}
                                $('#editEvent_eventDescription').attr('value', thisDescription);
                                $('#resourceDeviceList').html(thisResourceDeviceList);
                                $('#resourcePersonList').html(thisResourcePersonList);

				setEventStartEnd("edit");
				$("input[id=editEvent_eventResourceDeviceCheckbox]").each(function() {
                                	hideReservedResource($(this).attr('name'), EventStart, EventEnd, "edit");
                        	});

// need to add a hideReservedResource type functin here for people so they are checked off by default. 
                        }
                }
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
                console.error("editEvent() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
        });
}

function updateEvent(eventId)
{
	// ------------------ validate mandatory fields have been entered ----------------
        if($("#editEvent_allDayCheckbox").prop('checked') == true) {
                if( $("#editEvent_title").val().length == 0 || $("#editEvent_startDatepicker").val().length == 0 || $("#editEvent_endDatepicker").val().length == 0 ) {
                        alert('Please enter a Title, Start and End date for this event. 1');
                        return;
                }
        }
        else {
                if( $("#editEvent_title").val().length == 0 || $("#editEvent_startDatepicker").val().length == 0 || $("#editEvent_endDatepicker").val().length == 0 || $("#editEvent_startTimepicker").val().length == 0 || $("#editEvent_endTimeicker").val().length == 0 ) {
                        alert('Please enter a Title, Start and End date/time for this event.');
                        return;
                }
        }
        // ------------------ validate mandatory fields have been entered ----------------

        // ------------------- create GET vars for PHP script -----------------
        var eventTitle = $("#editEvent_title").val();
        var eventStartDate = $("#editEvent_startDatepicker").val();
        var eventStartTime = $("#editEvent_startTimepicker").val();
        var eventEndDate = $("#editEvent_endDatepicker").val();
        var eventEndTime = $("#editEvent_endTimepicker").val();
        var eventAllDay = $("#editEvent_allDayCheckbox").prop('checked');
        var eventDescription = $("#editEvent_eventDescription").val();

        var eventResourceDeviceList = '';
        var eventResourcePersonList = '';
        $("input[id=editEvent_eventResourceDeviceCheckbox]").each(function() {
                if(this.checked) {
                        eventResourceDeviceList = eventResourceDeviceList+$(this).attr('name')+'|';
                }
        });
        $("input[id=editEvent_eventResourcePersonCheckbox]").each(function() {
                if(this.checked) {                        
			eventResourcePersonList = eventResourcePersonList+$(this).attr('name')+'|';
                }
        });

        // convert dates in format (MM-DD-YYYY) to fullcalendar format (YYYY-MM-DD or YYYY-MM-DDTHH:MM:00)
        var eventStartDateParts = eventStartDate.split("/");
        var thisEventStartDate = eventStartDateParts[2]+'-'+eventStartDateParts[0]+'-'+eventStartDateParts[1];
        var eventEndDateParts = eventEndDate.split("/");
        var thisEventEndDate = eventEndDateParts[2]+'-'+eventEndDateParts[0]+'-'+eventEndDateParts[1];

        // perform quick date cronological comparison before going forward
        var startDateChecker = eventStartDateParts[2]+eventStartDateParts[0]+eventStartDateParts[1];
        var endDateChecker = eventEndDateParts[2]+eventEndDateParts[0]+eventEndDateParts[1];
        if(startDateChecker > endDateChecker) {
                alert('Warning, the event "Start Date" cannot be the same or after the event "End Date."');
                return;
        }	
	
	// perform quick time cronological comparison before going forward
        var eventStartTimeParts = eventStartTime.split(':');
        var startTimeChecker = eventStartTimeParts[0]+eventStartTimeParts[1]+eventStartTimeParts[2];
        var eventEndTimeParts = eventEndTime.split(':');
        var endTimeChecker = eventEndTimeParts[0]+eventEndTimeParts[1]+eventEndTimeParts[2];
        if(thisEventStartDate == thisEventEndDate) {
                if(eventAllDay == false) {
                        if(startTimeChecker >= endTimeChecker) {
                                alert('Warning, the event "Start Time" cannot be the same or after the event "End Time" on single-day Events.');
                                return;
                        }
                }
        }

        // if not an all-day event then append the start and end times to the start and end dates with 'T' for fullcalendar format 
        if(eventAllDay == false) {
                thisEventStartDate = thisEventStartDate+'T'+eventStartTime;
                thisEventEndDate = thisEventEndDate+'T'+eventEndTime;
        }
        // ------------------- create GET vars for PHP script -----------------

	var thisEventId = $("#thisEventId").val();

        // ----------------- submit event information to the database via ajax/php -------------------
        request = $.ajax({
                type: "GET",
                url: "/portal/HTML/php/updateCalEvent.php?eventTitle="+eventTitle+"&eventStartDate="+thisEventStartDate+"&eventEndDate="+thisEventEndDate+"&eventDescription="+eventDescription+"&eventResourceDeviceList="+eventResourceDeviceList+"&eventResourcePersonList="+eventResourcePersonList+"&thisUserName="+thisUserName+"&thisEventId="+thisEventId,
                cache: false,
        });
        request.done(function (response, textStatus, jqXHR){
                if(response[0] == "__SUCCESS__") {
                        $('#createEventModal').modal('hide');
                        alert('Event Updated!');
                        location.reload();
                } else if(response[0] == "__FAILURE__") {
                        console.error("updateCalEvent() -- __FAILURE__ returned from updateCalEvent.php -- " + textStatus, errorThrown);
                }
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
                console.error("updateCalEvent() -- Entered request.fail -- The following error occured: " + textStatus, errorThrown);
        });
        // ----------------- submit event information to the database via ajax/php -------------------
}

