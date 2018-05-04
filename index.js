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

let users = [];
let messages = [];
let questions = [];
const operands = ['+', '-', 'x'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generateQuestion = (level = 1) => {
    let num1, num2, operand;
    if (level === 1) {
         num1 = getRandomInt(1, 100);
         num2 = getRandomInt(1, 100);
         operand = operands[getRandomInt(0,2)];
        
    }
    return {
        question: num1 + " " + operand + " " + num2,
        answer: operand === "+" ? num1 + num2 : operand === "-" ? num1 - num2 : num1 * num2
    }
}

io.on('connection', function (socket) { 
    console.log(socket.id);
    users.push({
        id: socket.id
    })
    if (questions.length == 0) {
        questions[0] = generateQuestion();
    } 
    socket.emit('greeting', {
            user_id: socket.id, 
            msg: 'Greetings, from server Node, brought to you by Sockets! -Server' ,
            question: questions[0].question
    });

    socket.broadcast.emit('online_user', { socket_id: socket.id}); // Send to others

    socket.on('thankyou', function (data) { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

    socket.on('senduser', (data)=>{
        console.log(data);
    });

    socket.on('soundkey', (key) => {
        console.log(key);
        socket.broadcast.emit('playsound', key);
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

    socket.on('answer', (data)=>{
        console.log("answer", data);
        console.log("server ans", questions[0].answer);
        if (questions[0].answer == data) {
            questions[0] = generateQuestion();
            console.log(questions[0]);
            io.emit("newquestion", questions[0]);
        }
    });
});

app.get('/sound', function(req, res) {
    res.render('index');
})

app.get('/', function(request, response) {
    response.render('login');
});

app.post('/game', function(request, response) {
    response.render('game');
});

