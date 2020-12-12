const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.get('SENDGRID_API_KEY'));

exports.registerController = async (req, res) => {
    try {
        // console.log(req.body);
        const CLIENT_URL = config.get('CLIENT_URL');
        const JWT_ACCOUNT_ACTIVATION = config.get('JWT_ACCOUNT_ACTIVATION');
        const EMAIL_FROM = config.get('EMAIL_FROM');

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при регистрации.'
            })
        }

        const {email, confirmPassword, lastName, firstName, patronymic} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'Такой пользователь уже существует.'});
        }

        const hashedPassword = await bcrypt.hash(confirmPassword, 12);
        const user = new User({email, password: hashedPassword, lastName, firstName, patronymic});

        const emailData = {
            to: email,
            from: EMAIL_FROM,
            subject: "Ссылка для активации аккаунта",
            text: 'Пожалуйста, перейдите по ссылке, чтобы активировать свою учетную запись.',
            html: `
                <h3>ПУСТО ПУСТО ПУСТО</h3>
            `
        };

        await sgMail
            .send(emailData)
            .then(() => {
                return res.status(201).json({
                    message: `Электронное письмо было отправлено на ${email}`
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    success: false,
                    message: 'Что-то пошло не так, попробуйте снова.'
                });
            });
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'});
    }
};


exports.signinController = async (req, res) => {
    try {
        console.log(req.body);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при регистрации.'
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден.'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Неверный логин или пароль.'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('JWT_SECRET'),
            {expiresIn: '5m'}
        );

        res.json({token, userId: user.id});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'});
    }
};