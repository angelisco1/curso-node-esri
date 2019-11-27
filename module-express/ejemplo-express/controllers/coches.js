const Coche = require('../models/coche');

getCoches = (req, res, next) => {
  Coche.getCoches()
    .then(coches => {
      // console.log(coches);
      res.render('coches', {
        coches
      })
    })
}

getCoche = (req, res, next) => {
  const cocheId = req.params.cocheId
  Coche.getCoche(cocheId)
    .then(coche => {
      console.log(coche);
      res.render('coche', {
        coche
      })
    })
}

getFormCoche = (req, res, next) => {
  res.render('form');
}

addCoche = (req, res, next) => {
  // console.log(req.body);
  const { marca, modelo, imagen, color} = req.body;
  const coche = new Coche(marca, modelo, imagen, color);
  coche.guardar()
    .then(() => {
      res.redirect('/coches');
    })
    .catch((err) => {
      console.log(err);
    });
}

getEditFormCoche = (req, res, next) => {
  const cocheId = req.params.cocheId
  Coche.getCoche(cocheId)
    .then(coche => {
      console.log(coche);
      res.render('form', {
        coche,
        editando: true
      })
    })
}

updateCoche = (req, res, next) => {

}

deleteCoche = (req, res, next) => {

}

module.exports = {
  getCoches,
  getFormCoche,
  addCoche,
  getCoche,
  getEditFormCoche,
  updateCoche,
  deleteCoche,
}