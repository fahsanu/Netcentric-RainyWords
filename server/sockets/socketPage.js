const roomData = {
  easy: [],
  medium: [],
  hard: [],
};

const roomClientCounts = {
  easy: 0,
  medium: 0,
  hard: 0,
};

module.exports = (io, socket) => {

  function updateClientCounts(room) {
    const count = roomData[room].length;
    roomClientCounts[room] = count;
    console.log('roomClient', roomClientCounts)
    io.emit('updateConnectedClients', roomClientCounts, roomData);
  }

  //add client to room
  socket.on("joinRoom", (room, name) => {
    // console.log('room', room)
    // console.log("name", name)
    socket.join(room);

    const user = { id: socket.id, name: name.username, room, score: 0 };
    // console.log("user", user)
    // console.log('length', roomData[room].length)

    if (roomData[room].length < 2) {
      roomData[room].push(user);
      console.log("roomData", roomData);
    }

    if (roomData[room].length === 2) {
      io.to(room).emit("startGame", room);
    }

    updateClientCounts(room);
  });

  //pass date to game page
  socket.on("sendData", (room) => {
    updateScore(room)
  });

  function updateScore(room){
     // console.log(room, socket.id)
     const player = roomData[room].find(item => item.id === socket.id)
     const otherPlayer = roomData[room].find(item => item.id !== socket.id)
    //  console.log('player', player)
    //  console.log('enemy', otherPlayer)
     io.to(player.id).emit('getPlayer', player);
     io.to(player.id).emit('getEnemy', otherPlayer);
 
     io.to(otherPlayer.id).emit('getPlayer', otherPlayer);
     io.to(otherPlayer.id).emit('getEnemy', player);
  }

  //update real-rime score
  socket.on("updateScore", (room,score) => {
    const player = roomData[room].find(item => item.id === socket.id)
    const otherPlayer = roomData[room].find(item => item.id !== socket.id)
    if (player) {
      player.score+=score

      updateScore(room)

      console.log("score", player.name, player.score)
    }
  });

  //check is it a winner to proceed to a different page
  socket.on('isWinner', (room) => {
    const user = roomData[room].find(item => item.id === socket.id)
    const otherUser = roomData[room].find(item => item.id !== socket.id)
    // console.log('user final score', user)
    // console.log('other user final score', otherUser)
    if (user.score >= otherUser.score) {
      socket.emit('check', true)
    } else{
      socket.emit('check', false)
    }
  })

  socket.on('remove', (room) => {
    console.log('already remove')
    while (roomData[room].length) { roomData[room].pop(); }
    // console.log('roomData after removed', roomData)
    updateClientCounts(room);
  })

  socket.on('reset', () => {
    console.log('restart')
    const roomData = {
      easy: [],
      medium: [],
      hard: [],
    };
    const roomClientCounts = {
      easy: 0,
      medium: 0,
      hard: 0,
    };
    io.emit('updateConnectedClients', roomClientCounts);
    console.log('roomData, roomClientCounts', roomData, roomClientCounts)
    io.emit('resetClient');
  });

  socket.on("disconnect", () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      socket.leave(room);
    });
    // updateClientCounts(room);

  });
};
