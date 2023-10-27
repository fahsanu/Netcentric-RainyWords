const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);
const io = new Server(server);


//API route -------------------------------------------------
app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const words_routes = require('./routes/words.route');
const user_routes = require('./routes/user.route');

app.get('/api', (res) => {
    res.send({status: true, message: "API is running"});
})

app.use('/words', words_routes)
app.use('/user', user_routes);

//Install middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());
//Sockets -------------------------------------------------
app.get('/', (res) => {
  res.sendFile(join(__dirname + 'page.tsx')); 
});

const mainPageSockets = require('./sockets/mainPage')
const welcomePageSockets = require('./sockets/welcomePage')
const waitingPageSockets = require('./sockets/waitingPage')

mainPageSockets(io);
welcomePageSockets(io);
waitingPageSockets(io);

//Run Server -------------------------------------------------
const PORT = 4000; 
const SERVER_IP = "localhost"; //fahfhi's hotspot 172.20.10.4
server.listen(PORT, SERVER_IP, () => {
  console.log(`Server is running at http://${SERVER_IP}:${PORT}`);
});