const express = require('express');
const router = express.Router();

// Load Controllers
// Загружаем контроллеры
const {
    creatingStatementController,
    getAllController
} = require('../controllers/userStatement.controller');

// Load Validators
// Загружаем контроллеры
const {
    validSign,
    validLogin,
    validPersonalInf
} = require('../helpers/valid');


router.post('/create',
    creatingStatementController);

router.get('/getAll',
    getAllController);

module.exports = router;