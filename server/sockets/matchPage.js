module.exports = (io) => {
    io.of('/matchPage').on('connection', (socket) => {
        console.log('User connected welcomePage');
      
        socket.on('chat message', (msg) => {
          console.log('message: ' + msg);
          io.emit('chat message', msg);
        });
      });
}