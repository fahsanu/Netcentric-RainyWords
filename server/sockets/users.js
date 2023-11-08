const roomData = {
    easy: [],
    medium: [],
    hard: [],
  };
// const users = []
let roomIndex = 0

const addUser = ({ id, name, room }) => {
    // const existingUser = roomData[room].find((user) => {
    //     user[room].name === name
    // })

    // if (existingUser) {
    //     return { error: "Username is taken" };
    // }

    const user = { id, name, score: 0}
    roomData[room].push(user);
    console.log("roomData", roomData)
    return user
}

const removeUser = (id, room) => {
    const index = roomData[room].findIndex((user) => {
        user.id === id
    })

    if (index !== -1) {
        return roomData[room].splice(index, 1)[0]
    }
}

const getRoomData = () => {
    return roomData
}

const getUser = (id, room) => {
    console.log(roomData[room])
    return roomData[room].find((user) => user.id === id);
}

const getUsersInRoom = (room) => roomData[room]
    .find(roomData[room])

module.exports = {
    addUser, removeUser, getRoomData, getUser, getUsersInRoom
}

// if (roomData[room].length === 1) {roomIndex++}
//       roomData[room][roomIndex] = {id: socket.id, name: name.username, score: 0};

//       io.to(room).emit('updateRoomData', roomData[room]);

//       if (roomData[room].length === 2) {
//         io.to(room).emit('startGame', room);
