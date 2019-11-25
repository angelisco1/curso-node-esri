const fs = require('fs');

// JSON.parse() // Parsea JSON a objeto JS
// JSON.stringify() // Parse objeto JS a JSON

function getData(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, (err, datos) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(datos);
    })
  })
}

function writeData(url, data) {
  return new Promise((res, rej) => {
    fs.writeFile(url, JSON.stringify(data), (err) => {
      if (err) {
        rej(err);
        return;
      }
      res('Ok!');
    })
  })
}

getData('./archivos/datos.json')
  .then(datos => {
    const datosJS = JSON.parse(datos);
    // console.log(datosJS.peliculas);
    // console.log(datosJS.series);
    const peliculasVistas = datosJS.peliculas.filter((peli) => {
      return peli.vista;
    })
    const seriesVistas = datosJS.series.filter((serie) => {
      return serie.vista;
    })

    const p1 = writeData('./archivos/peliculasVistas.json', {peliculasVistas})
    const p2 = writeData('./archivos/seriesVistas.json', {seriesVistas})
    return Promise.all([p1, p2]);
  })
  .then((res) => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })

// const numsPares = [1, 2, 3].filter((num) => {
//   return num % 2 == 0;
// })
// [2]
