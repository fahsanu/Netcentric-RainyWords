const socket = io('http://localhost:4000');

socket.on('message', (message) => {
  console.log('Received message on the client:', message);

});

socket.emit('message', 'Hello from the client!');