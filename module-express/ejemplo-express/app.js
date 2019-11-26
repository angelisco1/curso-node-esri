const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routerCoches = require('./routes/coches');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  console.log({method: req.method, url: req.url});
  next();
})

app.use(routerCoches);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Listening in localhost:3000...');
})