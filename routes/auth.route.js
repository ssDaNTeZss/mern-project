const express = require('express');
const router = express.Router();

// Load Controllers
// Загружаем контроллеры
const {
    registerController,
    activationController,
    signinController,
    roleController,
    createTestUserController
} = require('../controllers/auth.controller');

// Load Validators
// Загружаем контроллеры
const {
    validSign,
    validLogin,
    validPersonalInf
} = require('../helpers/valid');


router.post('/register',
    validSign,
    registerController);

router.post('/login',
    validLogin,
    signinController);

router.post('/role',
    roleController);

router.post('/activation',
    validPersonalInf,
    activationController);

// router.post('/create',
//     validSign,
//     createTestUserController);

module.exports = router;