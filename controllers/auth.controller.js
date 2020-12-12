const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.registerController = async (req, res) => {
        try {
            console.log(req.body);

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
                return res.status(400).json({ message: 'Такой пользователь уже существует.' });
            }

            const hashedPassword = await bcrypt.hash(confirmPassword, 12);
            const user = new User({email, password: hashedPassword, lastName, firstName, patronymic});

            await user.save();

            res.status(201).json({ message: 'Пользователь создан.' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
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

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден.' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный логин или пароль.' })
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '2h'}
        );

        res.json({ token, userId: user.id });

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова.' });
    }
};