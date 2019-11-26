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
// POST /edit-coche

// POST /delete-coche

module.exports = router;