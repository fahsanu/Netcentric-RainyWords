module.exports = (io) => {
    let connectedClients = 0;
    const countdownStart = 2;
  
    io.of('/welcomePage').on('connection', (socket) => {
      console.log('User online activated');

      socket.on('connected', () => {
        connectedClients++;
        console.log(connectedClients);
      });
      console.log("Client connected:", connectedClients);

      io.of('/welcomePage').emit('updateConnectedClients', connectedClients);

      if (connectedClients === countdownStart) {
        io.of('/welcomePage').emit('startCountdown');
       }
  
      socket.on('disconnect', () => {
        console.log('User disconnected from welcomePage');

        if (connectedClients > 0) {
          connectedClients--;
          io.of('/welcomePage').emit('updateConnectedClients', connectedClients);
          console.log("Client connected:", connectedClients);
        }
      });

      
    });
  };