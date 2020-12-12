const express = require('express');
const router = express.Router();

// Load Controllers
// Загружаем контроллеры
const {
    registerController,
    signinController
} = require('../controllers/auth.controller');

// Load Validators
// Загружаем контроллеры
const {
    validSign,
    validLogin
} = require('../helpers/valid');


router.post('/register',
    validSign,
    registerController);

router.post('/login',
    validLogin,
    signinController);

module.exports = router;