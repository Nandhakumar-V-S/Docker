// --------------------------------------------------------------------------------------------------
// <copyright file="fullcalendar-demo.js" company="Archarina">
// Copyright (c) ArcEnterprisePlatform. All rights reserved.
// Developer: Gopinath Ganesan.
// Create On: 4/20/2022
// Licensed under the MIT license.
// </copyright>
// --------------------------------------------------------------------------------------------------

// Constant
{
    var bindingEventData = [];
    var calendar = null;
}

// Events
{
    // On Document ready
    $(function () {
        // Filter Event Data
        filterEventData();

        var calendarEl = document.getElementById('calendar');

        calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridWeekDay,timeGridDay,listWeek'
            },
            firstDay: 0,
            views: {
                timeGridWeekDay: {
                    type: 'timeGrid',
                    firstDay: 3,
                    duration: {
                        days: 7
                    },

                    //title: 'Work Week',
                    buttonText: 'Work Week',
                    //columnFormat: 'dddd', // Format the day to only show like 'Monday'
                    hiddenDays: [0, 6] // Hide Sunday and Saturday?
                }
            },
            initialDate: getFirstDateOfWeek(new Date()),
            navLinks: true, // can click day/week names to navigate views
            nowIndicator: true,

            weekNumbers: true,
            weekNumberCalculation: 'ISO',

            editable: true,
            selectable: true,
            dayMaxEvents: true, // allow "more" link when too many events
            eventSources: [
                {
                    events: bindingEventData
                }
            ],
            eventDidMount: function (data) {
                data.el.setAttribute('data-resource', data.event.extendedProps.resourcegroup);
                data.el.setAttribute('data-status', data.event.extendedProps.status);
            },
            eventClick: function (info) {
                //alert('Event: ' + info.event.title);
                //alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                //alert('View: ' + info.view.type);
                // info.el.style.borderColor = 'red';
                $("#mp-calendar-event-detail").addClass("is-visible");
                $("#lbl-mp-event-detail-resourcegrouptext").text(info.event._def.extendedProps.resourcegrouptext);
                $("#lbl-mp-event-detail-start").text(moment(info.event._instance.range.start).format("L"));
                $("#lbl-mp-event-detail-end").text(moment(info.event._instance.range.end).format("L"));
                $("#lbl-mp-event-detail-description").text(info.event._def.extendedProps.description);
                $("#lbl-mp-event-detail-status").text(info.event._def.extendedProps.statustext);
                $("#lbl-mp-event-detail-eventtitle").text(info.event._def.title);
            }
        });

        calendar.render();
    });

    var getFirstDateOfWeek = function (date) {
        var curr = date; // get current date
        var first = curr.getDate() - curr.getDay();
        return new Date(curr.setDate(first));

    }

    // On Resource Checkbox change
    $(document).on('change', '[name="chk-resource"]', function (e) {
        e.preventDefault();

        filterEventData();

        // Remove all event sources
        var eventSources = calendar.getEventSources();
        var len = eventSources.length;
        for (var i = 0; i < len; i++) {
            eventSources[i].remove();
        }

        // Add New event source 
        calendar.addEventSource(bindingEventData, true);

    });
}

// Public
{
    var filterEventData = function () {
        var selectedResources = [];
        $('input[name="chk-resource"]:checked').each(function () {
            selectedResources.push(parseInt($(this).val()));
        });

        bindingEventData = demoEvents.filter(function (el) {
            return selectedResources.indexOf(el.resourcegroup) >= 0;
        });
    }
}