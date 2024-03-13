const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

app.use(express.static(__dirname + '/public'));

//our routes:
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/match', function( req, res ){ 
    res.sendFile( __dirname + '/public/match.html' );
});

app.get( '/swap', function( req, res ){ 
    res.sendFile( __dirname + '/public/swap.html' );
});


//stores if each player has started:
var swapStart = false;
var matchStart = false;


// SOCKETS
// -------
io.on('connection', (socket) => {
    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );

        //reset swap and match started variables to false:
        swapStart = false;
        matchStart = false;
    });

    socket.on("swap_timer_over", (data) => {
        io.emit("swap_cards", data);
    });

    socket.on("match_timer_over", (data) => {
        io.emit("start_swap_timer");
    });

    socket.on("card_matched", (data) => {
        io.emit("color_change", data);
    });

    socket.on("won", (data) => {
        io.emit("end_game");
    });

    // START BUTTONS
    // -------------
    socket.on("start_pressed", (data) => {
        //stores if swap has started:
        if (data === 'swap') {
            swapStart = true;

        //stores if match has started:
        } else if (data === 'match') {
            matchStart = true;
        }

        //start game if both buttons clicked:
        if (swapStart && matchStart) {
            io.emit("start");
        }
    });
});

server.listen(LISTEN_PORT);
console.log("Listening on port: " + LISTEN_PORT );