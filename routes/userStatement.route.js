const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

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
    auth,
    creatingStatementController);

router.get('/getAll',
    auth,
    getAllController);

module.exports = router;