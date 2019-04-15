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

const athleteapi = require('./server/routes/athleteapi');
const readerapi = require('./server/routes/readerapi');
const captureapi = require('./server/routes/captureapi');


app.use('/athletes', athleteapi);
app.use('/readers', readerapi);
app.use('/captures', captureapi)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

io.on('connection', function (socket) {
  socket.emit('message', { hello: 'message sent' });
  socket.on('my new event', function (data) {
    console.log(data);
  });
});