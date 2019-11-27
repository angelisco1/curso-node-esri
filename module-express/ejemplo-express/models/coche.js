const fs = require('fs');
const path = require('path')
const getBBDD = require('../helpers/database').getBBDD;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;


class Coche {
  constructor(marca, modelo, imagen, color, id) {
    this.marca = marca;
    this.modelo = modelo;
    this.imagen = imagen;
    this.color = color;
    if (id) {
      this._id = new ObjectId(id);
    }
  }

  guardar() {
    console.log(this._id);
    console.log(typeof(this._id));
    const bbdd = getBBDD();
    if (this._id) {
      return bbdd.collection('coches').updateOne({_id: this._id}, {$set: this})
    } else {
      return bbdd.collection('coches').insertOne(this);
    }
    // return new Promise((resolve, reject) => {

      // Coche.getCoches()
      //   .then(coches => {
      //     let newCoches;

      //     if (this.id) {
      //       newCoches = coches.map(c => {
      //         if (c.id === this.id) {
      //           return this;
      //         }
      //         return c;
      //       })
      //     } else {
      //       this.id = (coches.length + 1).toString();
      //       newCoches = [...coches, this];
      //     }

      //     fs.writeFile(path.join('data', 'coches.json'), JSON.stringify(newCoches, null, 2), (err) => {
      //       if (err) {
      //         reject(err);
      //         return;
      //       }
      //       resolve();
      //     })
      //   });
    // })
  }

  static getCoche(id) {
    const bbdd = getBBDD();
    return bbdd.collection('coches').findOne({_id: new ObjectId(id)})
      // .then(coches => {
      //   // console.log({coches})
      //   // console.log(typeof(coches));
      //   return coches.map(c => new Coche(c.marca, c.modelo, c.imagen, c.color, c._id));
      // })
    // return new Promise((resolve, reject) => {
    //   Coche.getCoches()
    //     .then(coches => {
    //       // console.log(typeof(coches[1].id), typeof(id))
    //       const coche = coches.find(c => c.id === id);
    //       if (coche) {
    //         resolve(coche);
    //       } else {
    //         reject(new Error('No hay coche'));
    //       }
    //     })
    // });
  }

  static getCoches() {
    const bbdd = getBBDD();
    return bbdd.collection('coches').find().toArray()
      .then(coches => {
        // console.log({coches})
        // console.log(typeof(coches));
        return coches.map(c => new Coche(c.marca, c.modelo, c.imagen, c.color, c._id));
      })
    // return new Promise((resolve, reject) => {
    //   fs.readFile(path.join('data', 'coches.json'), (err, coches) => {
    //     if (err) {
    //       reject(err);
    //       return;
    //     }
    //     resolve(JSON.parse(coches));
    //   })
    // })
  }

  static delete(id) {
    const bbdd = getBBDD();
    return bbdd.collection('coches').deleteOne({_id: new ObjectId(id)})
    // return new Promise((resolve, reject) => {
    //   Coche.getCoches()
    //     .then(coches => {
    //       const newCoches = coches.filter(c => {
    //         return c.id !== id
    //       })

    //       fs.writeFile(path.join('data', 'coches.json'), JSON.stringify(newCoches, null, 2), (err) => {
    //         if (err) {
    //           reject(err);
    //           return;
    //         }
    //         resolve();
    //       })

    //     })
    // })
  }
}

module.exports = Coche;