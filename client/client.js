const socket = io('http://localhost:4000');


console.log('A server connected');

socket.on('message', (message) => {
  console.log('Received message from the server:', message);

});

socket.emit('message', 'Hello from the client!');

socket.on('disconnect', () => {
  console.log('A server disconnected');
});