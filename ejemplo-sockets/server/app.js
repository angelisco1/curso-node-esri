const http = require('http');
const SocketIO = require('socket.io');



const server = http.createServer((req, res) => {

});

const io = SocketIO(server);

const mensajes = [];
const clientes = [];

io.on('connection', (socket) => {

  socket.on('new-cliente', (datos) => {
    clientes.push({...datos, clSocket: socket});
  })

  socket.on('msg-privado', (datos) => {
    const alias = datos.nombre;
    const msg = datos.msg;
    console.log({alias})
    console.log({clientes})

    const cliente = clientes.find(cl => cl.nombre === alias);
    console.log(cliente);
    cliente.clSocket.emit(cliente.token, msg);
  })

  console.log('Alguien se ha conectado...')
  socket.on('msg', (datos) => {
    mensajes.push(datos)
    io.emit('new-msg', mensajes);
  })
})

server.listen(3000, () => {
  console.log('Escuchando...')
})