const connectedClients = 2;
 
const {
  addUser,
  removeUser,
  getRoomData,
  getUser,
  getUsersInRoom,
} = require("./users");

const roomData = {
  easy: [],
  medium: [],
  hard: [],
};

module.exports = (io, socket) => {


  //add client to room
  socket.on("joinRoom", (room, name) => {
    socket.join(room);

    const user = { id: socket.id, name: name.username, room, score: 0 };
    // console.log("user", user)

    // console.log('length', roomData[room].length)

    if (roomData[room].length < 2) {
      roomData[room].push(user);
      console.log("roomData", roomData);
    }

    io.to(room).emit("updateRoomData", roomData[room]);

    if (roomData[room].length === 2) {
      io.to(room).emit("startGame", room);
    }
  });

  //pass date to game page
  socket.on("sendData", (room) => {
    console.log(room, socket.id)
    const player = roomData[room].find(item => item.id === socket.id)
    const otherPlayer = roomData[room].find(item => item.id !== socket.id)
    // console.log('check', player)
    io.emit('getPlayer', player);
    io.emit('getEnemy', otherPlayer)
  });

  socket.on("updateScore", (room) => {
    const player = roomData[room].find(item => item.id === socket.id)
    const otherPlayer = roomData[room].find(item => item.id !== socket.id)
    player.score++
    io.to(room).emit('sendUpdate', player, otherPlayer )
    console.log(player.score)

    // Send updated room data to clients in the room
    io.to(room).emit("updateRoomData", roomData[room]);
  });

  socket.on("disconnect", () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      socket.leave(room);
    });
  });
};
