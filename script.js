$(document).ready(function() {
    var dbRef = new Firebase('https://cs467group12map.firebaseio.com/');
    var dataRef = dbRef.child('data');

    $('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'agendaWeek,agendaDay'
		},
		defaultDate: Date.now(),
		selectable: true,
		selectHelper: true,
		select: function(start, end) {
			var title = prompt('Location:');
			var eventData;
			if (title) {
				eventData = {
					title: title,
					start: start,
					end: end
				};
				$('#calendar').fullCalendar('renderEvent', eventData, true);
			}
			$('#calendar').fullCalendar('unselect');
		},
		editable: true,
        eventClick: function(event) {
            console.log(event);
        }
	});
});