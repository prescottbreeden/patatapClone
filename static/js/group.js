$(document).ready(function() {
    // const socket = io("http://192.168.0.193:1337"); //1
    const socket = io(); //1
    let user = {};
    const name = prompt("Input your name:");
    user.name = name;
    socket.on('greeting', function (data) { //4
        //5
        user.user_id = data.user_id;
        initMessage(data.messages);
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
    });

    $('#send').click(function(e){
        var currentdate = new Date(); 
        var datetime = 
                (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        let data = {};
        data.user = user;
        data.datetime = datetime;
        data.msg = $('#txtmsg').val();

        socket.emit('senddata', data);
        $('#txtmsg').val('');
        e.preventDefault();
    });
    
    socket.on('receivedata', function(data){
        appendMessage(data);
    });
    
    function appendMessage(data) {
        let strHtml = "";
        strHtml = `<p class="user-info">${data.user.name} - <span class="datetime">${data.datetime}</span></p>
                    <p class="message">${data.msg}</p>`;

        $('.chatcontent').append(strHtml);
    }

    function initMessage(data) {
        data.forEach(element => {
            appendMessage(element);
        });
    }

    socket.on('online_user', data => {
        
    });
});