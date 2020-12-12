const {check} = require('express-validator');

exports.validSign = [
    check('lastName', 'Фамилия должна быть от 2 до 32 символов.')
        .notEmpty()
        .isLength({
            min: 2,
            max: 32
        }),
    check('lastName', 'Имя должно быть от 2 до 32 символов.')
        .notEmpty()
        .isLength({
            min: 2,
            max: 32
        }),
    check('email', 'Некорректный email.')
        .isEmail(),
    check('confirmPassword', 'Минимальная длина пароля 8 символов.')
        .isLength({min: 8})

];

exports.validLogin = [
    check('email', 'Введите корректный email.')
        .normalizeEmail()
        .isEmail(),
    check('password', 'Введите пароль.')
        .exists()
];