const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // const url = req.url;
  const method = req.method;
  const urlParseada = url.parse(req.url);
  // console.log({urlParseada})
  // console.log({req});
  // const pathname = urlParseada.pathname;
  // const query = urlParseada.query;
  const { pathname, query } = urlParseada;

  if (pathname === '/bienvenido') {
    let msg = '<h1>Bienvenido ...</h1>';
    if (method === 'GET') {
      let q;
      // query = "nombre=Angel&apellido=Villalba"
      if (query) {
        const queryP = query.split('&');
        // queryP = ["nombre=Angel", apellido=Villalba]
        q = queryP.reduce((acc, param) => {
          const [c, v] = param.split('=');
          return {...acc, [c]: v};
        }, {});
        // q = {nombre: Angel, apellido: Villalba}
        msg = `<h1>Bienvenido ${q.nombre}</h1>`;
      }
      res.write(msg)
      res.write(getNav());
      return res.end();
    } else {
      const datos = [];
      req.on('data', (chunk) => {
        console.log({chunk});
        datos.push(chunk.toString())
      })
      req.on('end', () => {
        msg = `<h1>Bienvenido ${datos.join('')}</h1>`;
        res.write(msg)
        res.write(getNav());
        return res.end();
      })
    }
  } else if (pathname === '/') {
    res.write('<h1>Inicio</h1>')
    res.write(getNav());
    res.write(getFormPost());
    res.end();
  } else {
    res.write('<h1>Error 404: Page not found</h1>');
    res.write(getNav());
    res.end();
  }

});

function getNav() {
  return `
    <nav>
      <a href="/">Inicio</a>
      <a href="/bienvenido">Bienvenido</a>
      <form action="/bienvenido" method="GET">
        <input type="text" name="nombre" value="" />
        <button type="submit">Dar la bienvenida</button>
      </form>
    </nav>
  `;
}

function getFormPost() {
  return `
    <form action="/bienvenido" method="POST">
      <input type="text" name="nombre" value="" />
      <button type="submit">Dar la bienvenida</button>
    </form>
  `
}

server.listen(3000, () => {
  console.log('Escuchando en localhost:3000...');
})