var express = require('express');
var app = express();
var messages = new Array();
var http = require('http');
var server = http.Server(app);
const bodyParser = require('body-parser');
//agregar para mongo
const mongoose = require('mongoose');
const session =require('express-session');
const MongoStore = require('connect-mongo') (session);
const Message = require('./models/message');

//mongodb connection
mongoose.connect("mongodb://localhost:27017/chatApp");
const db = mongoose.connection;

//mongo error
db.on('error', () => {console.error('connection error:')});

//use session for tracking logins
app.use(session({
  secret:'Exame',
  resave:true,  //se vuelva a guardar la sesión
  saveUninitialized: false, //nueva y no está modifiada
  store: new MongoStore( {
    url:"mongodb://localhost:27017/chatApp"    
  })
}));
app.use(express.static('client'));

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('messages', messages)
    socket
        .on('message', function (msg) {
            io.emit('message', `${msg.initials}: ${msg.message}`);  
            
            Message.create(msg, (error, message) => {
                console.log(msg);
                return false;
              })
            messages.push(msg);  
        });
});

server.listen(8085, function () {
    console.log('Chat server running');
});