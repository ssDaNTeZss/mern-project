const User = require('../models/User');

exports.uploadingPersonalDataController = async (req, res) => {
    try {
        const {lastName, firstName, patronymic, DOB, BPL} = await User.findById(req.headers.userid);
        res.json({lastName, firstName, patronymic, DOB, BPL});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

exports.updatingPersonalDataController = async (req, res) => {
    try {
        const {lastName, firstName, patronymic, DOB, BPL} = req.body;

        let user = await User.findById(req.headers.userid);
        user.lastName = lastName;
        user.firstName = firstName;
        user.patronymic = patronymic;
        user.DOB = DOB;
        user.BPL = BPL;
        console.log(user);

        user.save((err, user) => {
            if (err) {
                console.log("Ошибка сохранения");
                return res.status(401).json({
                    message: 'Что-то пошло не так, попробуйте снова.'
                });
            } else {
                return res.status(201).json({message: 'Данные изменены.'});
            }
        });


    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};