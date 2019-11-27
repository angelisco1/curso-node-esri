const http = require('http');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');


const app = express();
const listaTransf = [
  {usuario: 'Pete', cuenta: 123412341234, cantidad: 20}
];
const usuariosValidos = [
  {username: 'falco', password: '1234'},
  {username: 'koz', password: '1234'},
];

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: false}));
app.use(session({
  secret: 'unstringlargoyfeo',
  resave: false,
  saveUninitialized: false
}));

app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res, next) => {
  const params = req.body;
  // console.log(params);
  let usuario = null;
  // usuariosValidos.forEach(u => {
  //   if ((u.password === params.password) && (u.username === params.username)) {
  //     usuario = u;
  //   }
  // });
  usuario = usuariosValidos.find(u => {
    return ((u.password === params.password) && (u.username === params.username));
  });

  // console.log(usuario);
  if (usuario) {
    req.session.loggedIn = true;
    req.session.usuario = usuario;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.get('/nueva-transferencia', (req, res, next) => {
  const token = Math.floor(Math.random()*100000)+'';
  req.session.token = token;
  res.render('form-transferencia', {tokenCSRF: token});
  // res.render('form-transferencia', {});
});

app.post('/nueva-transferencia', (req, res, next) => {
  console.log(req.body.CSRFToken)
  console.log(req.session.token)
  if (req.session.token && (req.session.token === req.body.CSRFToken)) {
    listaTransf.push({usuario: req.session.usuario.username, cuenta: req.body.cuenta, cantidad: req.body.cantidad});
    return res.redirect('/');
  }
  console.log('ATAQUE DETECTADO');
  res.redirect('/login');
});

app.get('/', (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  res.render('inicio', {
    transferencias: listaTransf,
    username: req.session.usuario.username
  });
});

const server = http.createServer(app);
server.listen('8080');