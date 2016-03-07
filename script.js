// Firebase Initialization
var db = new Firebase('https://cs467group12map.firebaseio.com/');
var dataStore = db.child('data'); // For all data
var childRef;
var currIDs = [];

dataStore.on('value', function(snapshot) {
    for (var id in snapshot.val()) {
        currIDs.push(id);
    }
});

// ID generation functions
// http://jsfiddle.net/greatbigmassive/PJwg8/
function generateID() {
    var id = "";
    var length = 15;
    while (id.length < length && length > 0) {
        var randomNumber = Math.random();
        id += (randomNumber < 0.1 ? Math.floor(randomNumber * 100) : String.fromCharCode(Math.floor(randomNumber * 26) + (randomNumber > 0.5 ? 97 : 65)));
    }
    return id;
}

function saveIDToFirebase() {
    var id = generateID();
    while (currIDs.indexOf(id) >= 0) {
        id = generateID();
    }
    var ref = dataStore.child(id);
    $('#randID').text(id);
    return ref;
}

// Reveal Different Rows
function revealRow(idOfRow) {
    $('#' + idOfRow).css('display', 'block');
    if (idOfRow.indexOf('id') >= 0) {
        childRef = saveIDToFirebase();
    } else if (idOfRow.indexOf('userInput') >= 0) {
        $('#locHistory').css('display', 'none');
    } else if (idOfRow.indexOf('locHistory') >= 0) {
        $('#userInput').css('display', 'none');
    }
}

$(document).ready(function() {
    // Calendar setup
    $('#calendar').fullCalendar({
		header: {
			left: 'prev,next',
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

    // form submit actions here
});