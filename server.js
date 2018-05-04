var express = require("express");
var bodyParser = require('body-parser');
const querystring = require('querystring');  
var app = express();


app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const server = app.listen(5000);
const io = require('socket.io')(server);
server.listen(80);

let users = {};
let messages = [];

io.on('connection', function (socket) { //2
    console.log(socket.id);
    socket.emit('greeting', {user_id: socket.id, 
            messages: messages, 
            msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3

    socket.broadcast.emit('online_user', { socket_id: socket.id}); // Send to others

    socket.on('thankyou', function (data) { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    socket.on('senddata', function(data){
        messages.push(data);
        // socket.broadcast.emit('counting', { counting: counter }); // Send to others
        // socket.emit('counting', { counting: counter }); // Send to yourself
        io.emit('receivedata', data); // Send to all socket clients
        
    });

    socket.on('disconnect', function (reason){
        console.log("disconnect: ", reason, socket.id);
    });
});

app.get('/login', function(req, res) {
    res.render('login');
})

app.get('/', function(request, response) {
    response.render('login');
});







app.post('/newuser', function(req, res) {
    res.redirect('/game');
})

app.get('/game', function(req, res) {
    res.render('game');
})