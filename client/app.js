var socket = io();

$('form').submit(function () {
    
    var text = {
        message: $('#message').val(),
        initials: $('#initials').val()
    }   
   

    socket.emit('message', text);
    $('#message').val('');
    return false;
});


socket.on('message', function (msg) {
    $('<li>')
        .text(msg)
        .appendTo('#history');

});

socket.on('messages', function (messages) {
    messages.forEach(element => {
        $('<li>')
        .text(element)
        .appendTo('#history');
    });
   

});



