module.exports = (io) => {
    let connectedClients = 0;
    const countdownStart = 2;
  
    io.of('/welcomePage').on('connection', (socket) => {
      console.log('User connected welcomePage');
  
      socket.on('startCountdown', () => {
        connectedClients++;
        console.log("Client connected:", connectedClients);
      });
  
      io.emit('updateConnectedClients', connectedClients);
      console.log("Update total connected:", connectedClients)
  
      if (connectedClients === countdownStart) {
        io.emit('startCountdown');
      }
  
      socket.on('disconnect', () => {
        console.log('User disconnected from welcomePage');
        if (connectedClients > 0) {
          connectedClients--;
        }
        io.emit('updateConnectedClients', connectedClients);
      });
    });
  };