const User = require('../models/User'),
    Passport = require('../models/Passport');

exports.uploadingPersonalDataController = async (req, res) => {
    try {
        const {
            lastName,
            firstName,
            patronymic,
            DOB,
            BPL,
            gender,
            citizenship,
            citizenship2
        } = await User.findById(req.headers.userid);

        const {
            passportSeries,
            passportID,
            passportIssued,
            departmentCode,
            dateOfIssue
        } = await Passport.findOne({owner: req.headers.userid});

        res.json({
            lastName,
            firstName,
            patronymic,
            DOB,
            BPL,
            gender,
            citizenship,
            citizenship2,
            passportSeries,
            passportID,
            passportIssued,
            departmentCode,
            dateOfIssue
        });
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

exports.updatingPersonalDataController = async (req, res) => {
    try {
        const {
            lastName,
            firstName,
            patronymic,
            DOB,
            BPL,
            gender,
            citizenship,
            citizenship2,
            passportSeries,
            passportID,
            passportIssued,
            departmentCode,
            dateOfIssue
        } = req.body;

        let user = await User.findById(req.headers.userid);
        user.lastName = lastName;
        user.firstName = firstName;
        user.patronymic = patronymic;
        user.DOB = DOB;
        user.BPL = BPL;
        user.gender = gender;
        user.citizenship = citizenship;
        user.citizenship2 = citizenship2;

        let passport = await Passport.findOne({owner: req.headers.userid});
        console.log(passport)
        if (!passport) {
            const createPassport = new Passport({
                passportSeries,
                passportID,
                passportIssued,
                departmentCode,
                dateOfIssue,
                owner: req.headers.userid
            });

            createPassport.save((err, user) => {
                if (err) {
                    console.log("Ошибка сохранения");
                    return res.status(401).json({
                        message: 'Что-то пошло не так, попробуйте снова.'
                    });
                } else {
                    res.status(201).json({message: 'Данные изменены.'});
                }
            });
        } else {
            passport.passportSeries = passportSeries;
            passport.passportID = passportID;
            passport.passportIssued = passportIssued;
            passport.departmentCode = departmentCode;
            passport.dateOfIssue = dateOfIssue;

            passport.save((err, user) => {
                if (err) {
                    console.log("Ошибка сохранения");
                    return res.status(401).json({
                        message: 'Что-то пошло не так, попробуйте снова.'
                    });
                } else {
                    res.status(201).json({message: 'Данные изменены.'});
                }
            });
        }

        user.save((err, user) => {
            if (err) {
                console.log("Ошибка сохранения");
                return res.status(401).json({
                    message: 'Что-то пошло не так, попробуйте снова.'
                });
            } else {
                res.status(201).json({message: 'Данные изменены.'});
            }
        });
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};