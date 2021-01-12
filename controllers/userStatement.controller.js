const Statement = require('../models/Statement');
const Directions = require('../models/Directions');

exports.creatingStatementController = async (req, res) => {
    try {
        console.log(req.body);

        const arr = req.body.achieve;
        let ach = [];
        for (let i = 0; i < arr.length; i++) {
            ach.push(arr[i].value);
        }

        const {
            document,
            series,
            documentNumber,
            dateOfIssue,
            educationalInstitution,
            nameEI,
            yearOfEnding,
            directionOrSpecialty,
            sourceOfFinancing,
            competition,
            typeExam1,
            typeExam2,
            typeExam3
        } = req.body;

        const createStatement = new Statement({
            document,
            series,
            documentNumber,
            dateOfIssue,
            educationalInstitution,
            nameEI,
            yearOfEnding,
            achieve: ach,
            directionOrSpecialtyId: directionOrSpecialty,
            sourceOfFinancing,
            competition,
            typeExam1,
            typeExam2,
            typeExam3,
            owner: req.headers.userid
        });

        createStatement.save((err, statement) => {
            if (err) {
                console.log("Ошибка сохранения");
                console.log(err);
                return res.status(401).json({
                    message: 'Что-то пошло не так, попробуйте снова.'
                });
            }
        });

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
        console.log(e);
    }
};

exports.getAllController = async (req, res) => {
    try {
        const {
            directionOrSpecialtyId,
            sourceOfFinancing,
            status
        } = await Statement.findOne({owner: req.headers.userid});

        const {
            directionOrSpecialty,
            formOfEducation,
            levelOfEducation
        } = await Directions.findById(directionOrSpecialtyId);

        res.json({
            directionOrSpecialty,
            sourceOfFinancing,
            formOfEducation,
            levelOfEducation,
            status
        });
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
        console.log(e);
    }
};



