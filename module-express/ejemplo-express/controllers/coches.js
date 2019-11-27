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
  res.render('form', {
    editando: false
  });
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
  const { marca, modelo, imagen, color, cocheId } = req.body;
  const cocheActualizado = new Coche(marca, modelo, imagen, color, cocheId);

  cocheActualizado.guardar()
    .then(() => {
      res.redirect('/coches');
    })
    .catch((err) => {
      console.log(err);
    });
}

deleteCoche = (req, res, next) => {
  const cocheId = req.body.cocheId;
  Coche.delete(cocheId)
    .then(() => {
      res.redirect('/coches');
    })
    .catch((err) => {
      console.log(err);
    });
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