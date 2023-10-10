const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Create an Express app and an HTTP server
const app = express();
const server = http.createServer(app);

// Create a Socket.io server by passing the HTTP server
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

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle messages from clients
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  // Handle disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
