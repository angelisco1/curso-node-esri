const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const tipos = {
  'css': 'text/css',
  'html': 'text/html'
}

const server = http.createServer((req, res) => {
  console.log('Hemos recibido una petición...')
  console.log(req.url);
  console.log(req.method);
  // res.setHeader('Content-Type', 'text/html');
  // res.write('<h1>Hola mundo!</h1>');
  // res.write('<p>URL: ' + req.url + '</p>');
  // res.write('<p>Método: ' + req.method + '</p>');

  const urlPeticion = req.url;
  console.log(url.parse(urlPeticion))
  const pathname = url.parse(urlPeticion).pathname;

  const resource = path.join(
    __dirname,
    'public',
    path.normalize(pathname)
  );

  const temp =  pathname.split('.');
  const extension = temp[temp.length-1];
  res.setHeader('Content-Type', tipos[extension]);

  fs.readFile(resource, (err, contenido) => {
    if (err) {
      res.statusCode = 404
      res.write('<h1>404</h1>')
      return res.end();
    }
    res.write(contenido)
    return res.end()
  })

  // res.write('Eiii');
});

server.listen(3000, () => {
  console.log('Escuchando en localhost:3000...');
})