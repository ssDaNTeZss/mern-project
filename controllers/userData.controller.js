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
        } = await User.findById(req.user.userId);

        console.log(!BPL);

        if (BPL) {
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
            } = await Passport.findOne({owner: req.user.userId});

            const {
                phone,
                residenceAddress
            } = await ContactInformation.findOne({owner: req.user.userId});

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
        } else {
            res.json({
                lastName,
                firstName,
                patronymic,
                DOB,
                BPL,
                gender,
                citizenship,
                citizenship2
            });
        }
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
        console.log(e);
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


        let user = await User.findById(req.user.userId);
        user.lastName = lastName;
        user.firstName = firstName;
        user.patronymic = patronymic;
        user.DOB = DOB;
        user.BPL = BPL;
        user.gender = gender;
        user.citizenship = citizenship;
        user.citizenship2 = citizenship2;

        let passport = await Passport.findOne({owner: req.user.userId});
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

            createPassport.save((err, passport) => {
                if (err) {
                    console.log("1");
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
                    console.log("2");
                    console.log("Ошибка сохранения");
                    return res.status(401).json({
                        message: 'Что-то пошло не так, попробуйте снова.'
                    });
                }
            });
        }

        let contactInf = await ContactInformation.findOne({owner: req.user.userId});
        if (!contactInf) {
            const createContactInf = new ContactInformation({
                phone,
                residenceAddress,
                owner: req.user.userId
            });

            createContactInf.save((err, user) => {
                if (err) {
                    console.log("3");
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
                    console.log("4");
                    console.log("Ошибка сохранения");
                    return res.status(401).json({
                        message: 'Что-то пошло не так, попробуйте снова.'
                    });
                }
            });
        }

        user.save((err, user) => {
            if (err) {
                console.log("5");
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

exports.loadingFilesController = async (req, res) => {
    try {
        if (req.files === null) {
            return res.status(400).json({message: 'No file uploaded'});
        }


    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};