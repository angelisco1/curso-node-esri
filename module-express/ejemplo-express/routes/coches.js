const express = require('express');
const cochesController = require('../controllers/coches');

const router = express.Router();

// GET /coches
router.get('/coches', cochesController.getCoches);

// GET /coche/:cocheId
router.get('/coche/:cocheId', cochesController.getCoche);

// GET /new-coche
router.get('/new-coche', cochesController.getFormCoche);
// POST /new-coche
router.post('/new-coche', cochesController.addCoche);

// GET /edit-coche/:cocheId
router.get('/edit-coche/:cocheId', cochesController.getEditFormCoche)
// POST /edit-coche
router.post('/edit-coche', cochesController.updateCoche)

// POST /delete-coche
router.post('/delete-coche', cochesController.deleteCoche)

module.exports = router;