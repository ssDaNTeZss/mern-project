const express = require('express');
const router = express.Router();

// Load Controllers
// Загружаем контроллеры
const {
    saveDirectionsController,
    getAllDirectionsController
} = require('../controllers/directions.controller');

// Load Validators
// Загружаем контроллеры
const {

} = require('../helpers/valid');


router.post('/data/save', saveDirectionsController);
router.get('/data/getAll', getAllDirectionsController);

module.exports = router;