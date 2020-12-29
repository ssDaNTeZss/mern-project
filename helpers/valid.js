const {check} = require('express-validator');

exports.validSign = [
    check('lastName', 'Фамилия должна быть от 2 до 32 символов.')
        .notEmpty()
        .isLength({
            min: 2,
            max: 32
        }),
    check('firstName', 'Имя должно быть от 2 до 32 символов.')
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
        .isEmail(),
    check('password', 'Введите пароль.')
        .exists()
];

exports.validPersonalInf = [
    check('lastName', 'Фамилия должна быть от 2 до 32 символов.')
        .notEmpty()
        .isLength({
            min: 2,
            max: 32
        }),
    check('firstName', 'Имя должно быть от 2 до 32 символов.')
        .notEmpty()
        .isLength({
            min: 2,
            max: 32
        }),
    check('DOB', 'Не все поля заполнены.')
        .notEmpty(),
    check('BPL', 'Не все поля заполнены.')
        .notEmpty(),
    check('gender', 'Не все поля заполнены.')
        .notEmpty(),
    check('citizenship', 'Не все поля заполнены.')
        .notEmpty()
];