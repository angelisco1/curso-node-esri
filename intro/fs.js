const fs = require('fs');

// const hola = fs.readFileSync('./archivos/hello.txt')
// const mundo = fs.readFileSync('./archivos/world.txt')

// console.log(hola + " " + mundo);

// fs.readFile('./archivos/hello.txt', (err, hola) => {
//   if (err) {
//     throw new Error(err);
//   }
//   console.log(hola.toString());
//   fs.readFile('./archivos/world.txt', (err, mundo) => {
//     if (err) {
//       throw new Error(err);
//     }
//     console.log(mundo.toString());
//     console.log(hola + " " +  mundo);
//   });
// });


function getText(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, (err, datos) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(datos.toString());
    })
  });
}

function writeText(textoFinal) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./archivos/texto-final.txt', textoFinal, (err) => {
      if (err) {
        return reject(err);
      }
      resolve('Ok!');
    })
  })
}

let textoFinal = '';
getText('./archivos/hello.txt')
  .then((datos) => {
    console.log(datos);
    textoFinal += datos;
    return getText('./archivos/world.txt');
  })
  .then((datos) => {
    console.log(datos);
    textoFinal += ' ' + datos;
    console.log(textoFinal);
    return writeText(textoFinal);
  })
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.error(err);
  })
