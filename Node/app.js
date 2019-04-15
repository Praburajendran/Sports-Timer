var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var cors = require('cors')

app.use(cors())

server.listen(4000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


// API file for interacting with MongoDB
const readerapi = require('./routes/readerapi');

app.use('/readerapi', readerapi);

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});