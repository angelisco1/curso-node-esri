const fs = require('fs');
const path = require('path')

class Coche {
  constructor(marca, modelo, imagen, color, id) {
    this.marca = marca;
    this.modelo = modelo;
    this.imagen = imagen;
    this.color = color;
    this.id = id;
  }

  guardar() {
    return new Promise((resolve, reject) => {
      Coche.getCoches()
        .then(coches => {
          this.id = coches.length;
          const newCoches = [...coches, this];
          fs.writeFile(path.join('data', 'coches.json'), JSON.stringify(newCoches), (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          })
        });
    })
  }

  static getCoche(id) {
    return new Promise((resolve, reject) => {
      Coche.getCoches()
        .then(coches => {
          const coche = coches.find(c => c.id == id);
          if (coche) {
            resolve(coche);
          } else {
            reject(new Error('No hay coche'));
          }
        })
    });
  }

  static getCoches() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join('data', 'coches.json'), (err, coches) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(coches));
      })
    })
  }
}

module.exports = Coche;