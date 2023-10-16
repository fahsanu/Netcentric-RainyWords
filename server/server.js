const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (res) => {
  res.sendFile(__dirname + '/serverTest.html'); 
});

const words_routes = require('./routes/words.route');
const user_routes = require('./routes/user.route');

app.get('/api', (res) => {
    res.send({status: true, message: "API is running"});
})

app.use('/words', words_routes)
app.use('/user', user_routes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log('Received message from client:', message);

    io.emit('message', message);
  });

  socket.emit('message', 'Hello from the server!');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

});

const PORT = 3000;  // Use the port you want to use for your server
const SERVER_IP = "10.202.139.216";
server.listen(PORT, SERVER_IP, () => {
  console.log(`Server is running at http://${SERVER_IP}:${PORT}`);
});

app.get('/client.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/client.js'));
});