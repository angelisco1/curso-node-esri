const http = require('http');
const SocketIO = require('socket.io');



const server = http.createServer((req, res) => {

});

const io = SocketIO(server);

io.on('connection', (socket) => {
  console.log('Alguien se ha conectado...')
  // socket.on()
})

server.listen(3000, () => {
  console.log('Escuchando...')
})