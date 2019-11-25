const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url == '/bienvenido') {
    res.write('<h1>Bienvenido ...</h1>')
    res.write(getNav());
    res.end();
  }
});

function getNav() {
  return `
    <nav>
      <a href="/">Inicio</a>
      <a href="/bienvenido">Bienvenido</a>
    </nav>
  `;
}

server.listen(3000, () => {
  console.log('Escuchando en localhost:3000...');
})