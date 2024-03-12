const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

app.use(express.static(__dirname + '/public')); //set root path of server ...

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/match', function( req, res ){ 
    res.sendFile( __dirname + '/public/match.html' );
});

app.get( '/swap', function( req, res ){ 
    res.sendFile( __dirname + '/public/swap.html' );
});

//socket.io stuff
io.on('connection', (socket) => {
    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("swap_timer_over", (data) => {
        io.emit("swap_cards", data);
    });

    socket.on("match_timer_over", (data) => {
        io.emit("match_timer_over");
    });

    socket.on("card_matched", (data) => {
        io.emit("color_change", data);
    });

    socket.on("won", (data) => {
        io.emit("end_game");
    });

    socket.on("start_swap", (data) => {
        console.log("start swap event received");
        io.emit("swap_started");
    });

    socket.on("start_match", (data) => {
        console.log("start match event received");
        io.emit("match_started");
    })

});

server.listen(LISTEN_PORT);
console.log("Listening on port: " + LISTEN_PORT );