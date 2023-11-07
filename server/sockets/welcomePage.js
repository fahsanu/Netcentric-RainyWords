module.exports = (io) => {
    const connectedClients = 2;
    let easyClients = 0;
    let mediumClients = 0;
    let hardClients = 0;
    const clientsByMode = {
      easy: [],
      medium: [],
      hard: [],
    };
  
    io.on('connection', (socket) => {

      //add client
      socket.on('easyConnection', () => {
        easyClients++;
        console.log('Easy clients:', easyClients)
      })

      socket.on('mediumConnection', () => {
        mediumClients++;
        console.log('Medium clients:', mediumClients)
      })

      socket.on('hardConnection', () => {
        hardClients++;
        console.log('Hard clients:', hardClients)
      })

      //update client to io
      io.emit('updateConnectedClients', easyClients, mediumClients, hardClients);

      //check to start game
        if (easyClients === connectedClients) {
          // console.log('easy in')
          io.emit('startGame');
        }
  
        if (mediumClients === connectedClients) {
          // console.log('medium in')
          io.emit('startGame');
        }
  
        if (hardClients === connectedClients) {
          // console.log('hard in')
          io.emit('startGame');
        }

      //disconnect
      socket.on('disconnect', () => {
        // console.log('User disconnected from welcomePage');

        // if (connectedClients > 0) {
        //   connectedClients--;
        //   io.of('/welcomePage').emit('updateConnectedClients', easyClients, mediumClients, hardClients);
        // }
      });

      
    });
  };