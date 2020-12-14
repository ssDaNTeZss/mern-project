const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.get('SENDGRID_API_KEY'));

const CLIENT_URL = config.get('CLIENT_URL');
const JWT_ACCOUNT_ACTIVATION = config.get('JWT_ACCOUNT_ACTIVATION');
const EMAIL_FROM = config.get('EMAIL_FROM');

exports.registerController = async (req, res) => {
    try {
        // console.log(req.body);

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

        const token = jwt.sign(
            {
                email,
                hashedPassword,
                lastName,
                firstName,
                patronymic
            },
            JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '10m'
            }
        );

        const emailData = {
            to: email,
            from: EMAIL_FROM,
            subject: "Ссылка для активации аккаунта",
            text: 'Пожалуйста, перейдите по ссылке, чтобы активировать свою учетную запись.',
            html: `
                <h3>Пожалуйста, перейдите по ссылке, чтобы активировать свою учетную запись.</h3>
                <p>${CLIENT_URL}/users/activate/${token}</p>
                <hr />
                <p>Это электронное письмо содержит конфиденциальную информацию.</p>
                <p>${CLIENT_URL}</p>
            `
        };

        console.log(token);

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

exports.activationController = async (req, res) => {
    try {
        const {token} = req.body;

        if (token) {
            jwt.verify(token, JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
                if (err) {
                    console.log('Ошибка активации.');
                    return res.status(401).json({
                        errors: 'Срок действия ссылки истек. Зарегистрируйтесь снова.'
                    });
                } else {
                    const {email, hashedPassword, lastName, firstName, patronymic} = jwt.decode(token);

                    const user = new User({
                        email,
                        password: hashedPassword,
                        lastName,
                        firstName,
                        patronymic
                    });

                    user.save((err, user) => {
                        if (err) {
                            console.log("Ошибка сохранения");
                            return res.status(401).json({
                                message: 'Что-то пошло не так, попробуйте снова.'
                            });
                        } else {
                            return res.status(201).json({message: 'Пользователь создан.'});
                        }
                    });
                }
            });
        }
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'});
    }
};

exports.signinController = async (req, res) => {
    try {
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