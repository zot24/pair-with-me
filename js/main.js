var firepadRef = new Firebase('https://amber-torch-5936.firebaseio.com');
var codeMirror = CodeMirror(document.getElementById('firepad-container'), { lineNumbers: true, mode: 'javascript' });
var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
    defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
});

var apiKey = 45083822;
var sessionId = '1_MX40NTA4MzgyMn5-MTQxNTcwNzM2MjkzNn5DaVJzWTBQUERvOTNKQTB0QncyaFBlV0N-fg';
var session = OT.initSession(apiKey, sessionId);


session.on({
    streamCreated: function(event) { 
        session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'replace', width: 320, height: 240}); 
    }
});

session.on("signal", function(event) {
	type = event.type;
	side = type.split(':');
	
	console.log(event);
	if (side[1] == target_side) 
	{
		display_name = name;
		color = target_color;
		avatar_text = 'ME'
	}
	else
	{
		display_name = other_name;
		color = 'FA6F57' 
		avatar_text = 'THEM';
	}

	template = '<span class="chat-img pull-' + side[1] + '">' +
		    '<img src="http://placehold.it/50/' + color +'/fff' + '&text=' + avatar_text + '" alt="User Avatar" class="img-circle" />' +
		'</span>' +
	    '<div class="chat-body clearfix">' +
	        '<div class="header">' +
	            '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small>' +
	            '<strong class="pull-' + side[1] + ' primary-font">' + display_name + '</strong>' +
	        '</div>' +
	        '<p>' +
	             	event.data 
	             +
	        '</p>' +
	    '</div>';

	    console.log(template);

	$('#messages').append($('<li class="' + side[1] + ' clearfix">').html(template));
});

session.connect(token, function(error) {
  if (error) {
    console.log(error.message);
  } else {
    session.publish('myPublisherDiv', {width: 320, height: 240});
  }
});
