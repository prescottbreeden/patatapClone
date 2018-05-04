// for(var n = 0; n < 10; n++){
//   for(var i = 0; i < 10; i++){
//     new Path.Circle(new Point(i*100, n*100), 10).fillColor = "red";
//   }
// }
var keyData = {
    q: {
        sound: new Howl({
          src: ['sounds/bubbles.mp3']
        }),
        color: '#1abc9c'
    },
    w: {
        sound: new Howl({
          src: ['sounds/clay.mp3']
        }),
        color: '#2ecc71'
    },
    e: {
        sound: new Howl({
          src: ['sounds/confetti.mp3']
        }),
        color: '#3498db'
    },
    r: {
        sound: new Howl({
          src: ['sounds/corona.mp3']
        }),
        color: '#9b59b6'
    },
    t: {
        sound: new Howl({
          src: ['sounds/dotted-spiral.mp3']
        }),
        color: '#34495e'
    },
    y: {
        sound: new Howl({
          src: ['sounds/flash-1.mp3']
        }),
        color: '#16a085'
    },
    u: {
        sound: new Howl({
          src: ['sounds/flash-2.mp3']
        }),
        color: '#27ae60'
    },
    i: {
        sound: new Howl({
          src: ['sounds/flash-3.mp3']
        }),
        color: '#2980b9'
    },
    o: {
        sound: new Howl({
            src: ['sounds/glimmer.mp3']
        }),
        color: '#8e44ad'
    },
    p: {
        sound: new Howl({
          src: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    },
    a: {
        sound: new Howl({
          src: ['sounds/pinwheel.mp3']
        }),
        color: '#f1c40f'
    },
    s: {
        sound: new Howl({
          src: ['sounds/piston-1.mp3']
        }),
        color: '#e67e22'
    },
    d: {
        sound: new Howl({
          src: ['sounds/piston-2.mp3']
        }),
        color: '#e74c3c'
    },
    f: {
        sound: new Howl({
          src: ['sounds/prism-1.mp3']
        }),
        color: '#95a5a6'
    },
    g: {
        sound: new Howl({
          src: ['sounds/prism-2.mp3']
        }),
        color: '#f39c12'
    },
    h: {
        sound: new Howl({
          src: ['sounds/prism-3.mp3']
        }),
        color: '#d35400'
    },
    j: {
        sound: new Howl({
          src: ['sounds/splits.mp3']
        }),
        color: '#1abc9c'
    },
    k: {
        sound: new Howl({
          src: ['sounds/squiggle.mp3']
        }),
        color: '#2ecc71'
    },
    l: {
        sound: new Howl({
          src: ['sounds/strike.mp3']
        }),
        color: '#3498db'
    },
    z: {
        sound: new Howl({
          src: ['sounds/suspension.mp3']
        }),
        color: '#9b59b6'
    },
    x: {
        sound: new Howl({
          src: ['sounds/timer.mp3']
        }),
        color: '#34495e'
    },
    c: {
        sound: new Howl({
          src: ['sounds/ufo.mp3']
        }),
        color: '#16a085'
    },
    v: {
        sound: new Howl({
          src: ['sounds/veil.mp3']
        }),
        color: '#27ae60'
    },
    b: {
        sound: new Howl({
          src: ['sounds/wipe.mp3']
        }),
        color: '#2980b9'
    },
    n: {
        sound: new Howl({
            src: ['sounds/zig-zag.mp3']
        }),
        color: '#8e44ad'
    },
    m: {
        sound: new Howl({
          src: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    },

    1: {
        sound: new Howl({
          src: ['sounds/bubbles.mp3']
        }),
        color: '#1abc9c'
    },
    2: {
        sound: new Howl({
          src: ['sounds/clay.mp3']
        }),
        color: '#2ecc71'
    },
    3: {
        sound: new Howl({
          src: ['sounds/confetti.mp3']
        }),
        color: '#3498db'
    },
    4: {
        sound: new Howl({
          src: ['sounds/corona.mp3']
        }),
        color: '#9b59b6'
    },
    5: {
        sound: new Howl({
          src: ['sounds/dotted-spiral.mp3']
        }),
        color: '#34495e'
    },
    6: {
        sound: new Howl({
          src: ['sounds/flash-1.mp3']
        }),
        color: '#16a085'
    },
    7: {
        sound: new Howl({
          src: ['sounds/flash-2.mp3']
        }),
        color: '#27ae60'
    },
    8: {
        sound: new Howl({
          src: ['sounds/flash-3.mp3']
        }),
        color: '#2980b9'
    },
    9: {
        sound: new Howl({
            src: ['sounds/glimmer.mp3']
        }),
        color: '#8e44ad'
    },
    0: {
        sound: new Howl({
          src: ['sounds/moon.mp3']
        }),
        color: '#2c3e50'
    }
}

var circles = [];



function onFrame(event) {
    for(var i = 0; i < circles.length; i++){
        circles[i].fillColor.hue +=1;
        circles[i].scale(.9);
        if(circles[i].area < 1){
        circles[i].remove(); // remove the circle from the canvas
        circles.splice(i, 1); // remove the circle from the array
        i--; // decrement i so that the loop doesn't skip a circle because of .splice()
        console.log(circles);
        }
    }
}

var socket = io(); //1
var user = {};

$(document).ready(function() {
    
    socket.on('greeting', function (data) { //4
        //5
        user.user_id = data.user_id;
        // initMessage(data.messages);
        console.log(data)
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
        $('#quiestion_function').html('<h1 class="fifty">' + data.question + '</h1>');
    });
    console.log("ready")

    $('#submit').click(function(e){
        e.preventDefault();
        if ($('#player_name').val() !== "") {
            var data = {};
            data.user = user;
            data.user.name = $('#player_name').val();
            socket.emit('senduser', data);
            $('#myCanvas').show();
            $('#login').hide();
            
        } else {
            
            alert("Input name dude!");
        }
    });

    $('.send-btn').click(function(e){
        e.preventDefault();
        var data = $('#answerbox').val();
        // data.user = user;
        $('#answerbox').val('');
        socket.emit("answer", data);

    });

    socket.on('newquestion', function(data){
        console.log(data);
        $('#quiestion_function').html('<h1 class="fifty">' + data.question + '</h1>');
    });
});

function onKeyDown(event) {
    console.log(event);

    socket.emit('soundkey', event.key);

    if(keyData[event.key]){
        var maxPoint = new Point(view.size.width, view.size.height);
        var randomPoint = Point.random();
        var point = maxPoint * randomPoint;
        var newCircle = new Path.Circle(point, 500)
        newCircle.fillColor = keyData[event.key].color;
        keyData[event.key].sound.play();
        circles.push(newCircle);
    }
    
}

socket.on('playsound', function(key){
    event.key = key;
    if(keyData[event.key]){
        var maxPoint = new Point(view.size.width, view.size.height);
        var randomPoint = Point.random();
        var point = maxPoint * randomPoint;
        var newCircle = new Path.Circle(point, 500)
        newCircle.fillColor = keyData[event.key].color;
        keyData[event.key].sound.play();
        circles.push(newCircle);
    }
});