const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

app.get('/series', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views', 'series.html'))
});

app.get('/', (req, res, next) => {
  res.redirect('/series');
});

const server = http.createServer(app);
server.listen('8081');