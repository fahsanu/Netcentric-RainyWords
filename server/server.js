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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/serverTest.html'); 
});

const words_routes = require('./routes/words.route');
const user_routes = require('./routes/user.route');

app.get('/api', (req, res) => {
    res.json({status: true, message: "API is running"});
})

app.use('/words', words_routes)
app.use('/user', user_routes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log('Received message:', message);

    io.emit('message', message);
  });


  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('message', (message) => {
    console.log('Received message from client:', message);
  });

});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/client.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/client.js'));
});