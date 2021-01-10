const express = require('express');
const router = express.Router();

// Load Controllers
// Загружаем контроллеры
const {
    accountPhotoController
} = require('../controllers/file.controller');

// Load Validators
// Загружаем контроллеры
const {
    validSign,
    validLogin,
    validPersonalInf
} = require('../helpers/valid');


router.post('/account-photo',
    accountPhotoController);

module.exports = router;