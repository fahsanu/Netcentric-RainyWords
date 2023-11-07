module.exports = (io) => {
    const clientScores = {}
    const clientsData = {}

    io.of('/').on('connection', (socket) => {

        // io.emit('updateName', clientsData)

        socket.on('clientName', (name) => {
            const id = socket.id
            clientsData[id] = { name, score: 0 };
            console.log('New client connected:', clientsData);
            io.emit('update', { id, name });
        })

        socket.on('scoreUpdate', (score) => {
            const client = clientsData.find((client) => client.id === socket.id);
            if (client) {
               client.score = score;
            }
            io.emit('updateScores', clientScores)
        })

    })
}