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
          let newCoches;

          if (this.id) {
            newCoches = coches.map(c => {
              if (c.id === this.id) {
                return this;
              }
              return c;
            })
          } else {
            this.id = (coches.length + 1).toString();
            newCoches = [...coches, this];
          }

          fs.writeFile(path.join('data', 'coches.json'), JSON.stringify(newCoches, null, 2), (err) => {
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
          // console.log(typeof(coches[1].id), typeof(id))
          const coche = coches.find(c => c.id === id);
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

  static delete(id) {
    return new Promise((resolve, reject) => {
      Coche.getCoches()
        .then(coches => {
          const newCoches = coches.filter(c => {
            return c.id !== id
          })

          fs.writeFile(path.join('data', 'coches.json'), JSON.stringify(newCoches, null, 2), (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          })

        })
    })
  }
}

module.exports = Coche;