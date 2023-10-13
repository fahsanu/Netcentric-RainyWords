const socket = io();

socket.on('message', (message) => {
  console.log('Received message on the client:', message);
});

socket.emit('customEvent', { message: 'Hello from the client!' });
