module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected mainPage');
  
      socket.on('disconnect', () => {
        console.log('A user disconnected from mainPage');
      });
    });
  };