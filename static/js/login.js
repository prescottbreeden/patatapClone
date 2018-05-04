$(document).ready(function() {
    const socket = io();
    let user = {};
    user.name = name;
    socket.on('greeting', function (data) { 
        user.user_id = data.user_id;
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' });
    });

    $('#submit').click(function(e){
        if ($('#player_name').val() !== "") {
            data.user = user;
            data.user.name = $('#player_name').val();
            socket.emit('senduser', data);
        } else {
            alert("Input name dude!");
            e.preventDefault();
        }
    });
});