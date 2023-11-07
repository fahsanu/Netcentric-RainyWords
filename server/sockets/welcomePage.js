module.exports = (io) => {
  const connectedClients = 2;

  const roomData = {
    easy: [],
    medium: [],
    hard: [],
  };
  let roomIndex = 0

  io.on('connection', (socket) => {

    //add client to room
    socket.on('joinRoom', (room, name) => {
      socket.join(room)
      if (roomData[room].length === 1) {roomIndex++}
      roomData[room][roomIndex] = {name: name.username, score: 0};
      console.log('roomData', roomData)

      io.to(room).emit('updateRoomData', roomData[room]);

      if (roomData[room].length === 2) {
        io.to(room).emit('startGame', room);
      }
      
  
    })

    //pass date to game page
    socket.on('sendData', (room) => {
      console.log('roomData[room]', roomData[room])
      io.emit('get', roomData[room])
    })

    socket.on('updateScore', (room, score) => {
      const roomIndex = room === 'easy' ? 0 : room === 'medium' ? 1 : 2;
      roomData[room][roomIndex].score = score;

      // Send updated room data to clients in the room
      io.to(room).emit('updateRoomData', roomData[room]);
    });

    socket.on('disconnect', () => {
      const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      socket.leave(room); 
    });
    })
  })
}