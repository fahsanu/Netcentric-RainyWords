module.exports = (io) => {
    const connectedClients = {}
    const connectedEasyClients = []
    const connectedMediumClients = []
    const connectedHardClients = []

    io.of('/').on('connection', (socket) => {

        socket.on('clientName', (name) => {
            connectedClients[socket.id] = name
            console.log(connectedClients)
        })

        socket.on('scoreUpdate', (score) => {
        })

        // socket.on('easyName', (name) => {
        //     connectedEasyClients.push({ socket: name})
        // })

        // socket.on('mediumName', (name) => {
        //     connectedMediumClients.push({ socket: name})
        // })

        // socket.on('hardName', (name) => {
        //     connectedHardClients.push({ socket: name})
        // })

    })
}