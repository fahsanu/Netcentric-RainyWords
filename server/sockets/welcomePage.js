module.exports = (io) => {
    let connectedClients = 0;
    const countdownStart = 2;
  
    io.of('/welcomePage').on('connection', (socket) => {
      console.log('User connected welcomePage');
  
      socket.on('startCountdown', () => {
        connectedClients++;
        console.log(connectedClients);
      });
  
      io.emit('updateConnectedClients', connectedClients);
  
      if (connectedClients === countdownStart) {
        io.emit('startCountdown');
      }
  
      socket.on('disconnect', () => {
        console.log('A user disconnected from beginningPage');
        if (connectedClients > 0) {
          connectedClients--;
          console.log(connectedClients);
        }
        io.emit('updateConnectedClients', connectedClients);
      });
    });
  };