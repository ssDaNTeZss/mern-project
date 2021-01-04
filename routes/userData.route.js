const express = require('express');
const router = express.Router();

// Load Controllers
// Загружаем контроллеры
const {
    uploadingPersonalDataController,
    updatingPersonalDataController,
    loadingFilesController
} = require('../controllers/userData.controller');

// Load Validators
// Загружаем контроллеры
const {
    validSign,
    validLogin
} = require('../helpers/valid');

router.get('/data', uploadingPersonalDataController);
router.put('/data/update', updatingPersonalDataController);
router.post('/data/loading', loadingFilesController);

module.exports = router;