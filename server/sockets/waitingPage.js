module.exports = (io) => {
    io.of('/waitingPage').on('connection', (socket) => {
      console.log('User connected waitingPage');
    });
  };