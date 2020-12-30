const User = require('../models/User'),
    Passport = require('../models/Passport'),
    ContactInformation = require('../models/ContactInformation');

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
            dateOfIssue,
            region,
            point,
            district,
            street,
            house,
            apartment
        } = await Passport.findOne({owner: req.headers.userid});

        const {
            phone,
            residenceAddress
        } = await ContactInformation.findOne({owner: req.headers.userid});

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
            dateOfIssue,
            region,
            point,
            district,
            street,
            house,
            apartment,
            phone,
            residenceAddress
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
            dateOfIssue,
            region,
            point,
            district,
            street,
            house,
            apartment,
            phone,
            residenceAddress
        } = req.body;

        console.log(req.body);

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
        if (!passport) {
            const createPassport = new Passport({
                passportSeries,
                passportID,
                passportIssued,
                departmentCode,
                dateOfIssue,
                region,
                point,
                district,
                street,
                house,
                apartment,
                owner: req.headers.userid
            });

            createPassport.save((err, user) => {
                if (err) {
                    console.log("Ошибка сохранения");
                    return res.status(401).json({
                        message: 'Что-то пошло не так, попробуйте снова.'
                    });
                }
            });
        } else {
            passport.passportSeries = passportSeries;
            passport.passportID = passportID;
            passport.passportIssued = passportIssued;
            passport.departmentCode = departmentCode;
            passport.dateOfIssue = dateOfIssue;
            passport.region = region;
            passport.point = point;
            passport.district = district;
            passport.street = street;
            passport.house = house;
            passport.apartment = apartment;

            passport.save((err, passport) => {
                if (err) {
                    console.log("Ошибка сохранения");
                    return res.status(401).json({
                        message: 'Что-то пошло не так, попробуйте снова.'
                    });
                }
            });
        }

        let contactInf = await ContactInformation.findOne({owner: req.headers.userid});
        if (!contactInf) {
            const createContactInf = new ContactInformation({
                phone,
                residenceAddress,
                owner: req.headers.userid
            });

            createContactInf.save((err, user) => {
                if (err) {
                    console.log("Ошибка сохранения");
                    return res.status(401).json({
                        message: 'Что-то пошло не так, попробуйте снова.'
                    });
                }
            });
        } else {
            contactInf.phone = phone;
            contactInf.residenceAddress = residenceAddress;

            contactInf.save((err, contactInf) => {
                if (err) {
                    console.log("Ошибка сохранения");
                    return res.status(401).json({
                        message: 'Что-то пошло не так, попробуйте снова.'
                    });
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
                return res.status(201).json({message: 'Данные изменены.'});
            }
        });
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};