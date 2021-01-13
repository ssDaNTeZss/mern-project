const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

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

router.get('/data', auth, uploadingPersonalDataController);
router.put('/data/update', auth, updatingPersonalDataController);
router.post('/data/loading', loadingFilesController);

module.exports = router;