module.exports = (io) => {
  const connectedClients = 2;
  const { addUser, removeUser, getRoomData, getUser, getUsersInRoom } = require('./users')

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

      // const user = addUser({ id: socket.id, name: name.username , room})
      // const roomData = getRoomData()
      const user = { id: socket.id, name: name.username , room}
      console.log("user", user)

      if (roomData[room].length === 1) {roomIndex++}
      roomData[room].push(user)
      console.log("roomData", roomData)

      io.to(room).emit('updateRoomData', roomData[room]);

      if (roomData[room].length === 2) {
        io.to(room).emit('startGame', room);
      }

      io.to(room).emit('updateRoomData', roomData[room]);
      
  
    })

    //pass date to game page
    socket.on('sendData', (room) => {
      // console.log('roomData[room]', roomData[room])
      // io.emit('get', roomData[room])
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