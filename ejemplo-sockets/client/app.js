const socket = io.connect('http://localhost:3000');

const inputMsg = document.getElementById('msgInput')
const listaMsg = document.getElementById('mensajes')

const inputPrivado = document.getElementById('inputPrivado')

inputPrivado.addEventListener('change', () => {
  const alias = inputPrivado.value
  socket.emit('msg-privado', {nombre: alias, msg: 'Eiii'});
})

const inputAlias = document.getElementById('inputAlias')
const btnLogIn = document.getElementById('btnLogIn')
btnLogIn.addEventListener('click', logIn)

function logIn() {
  const miToken = Math.random().toString().slice(2);
  const alias = inputAlias.value;
  socket.emit('new-cliente', {nombre: alias, token: miToken});
  socket.on(miToken, (msg) => {
    alert(msg)
  })
}


socket.on('new-msg', (mensajes) => {
  listaMsg.innerHTML = mensajes.map((msg) => `<p>${msg.msg}</p>`).join('');
})

inputMsg.addEventListener('change', (event) => {
  socket.emit('msg', {msg: event.target.value});
  inputMsg.value = '';
})
