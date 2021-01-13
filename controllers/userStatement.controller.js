const Statement = require('../models/Statement');
const Directions = require('../models/Directions');

exports.creatingStatementController = async (req, res) => {
    try {
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
            owner: req.user.userId
        });

        createStatement.save((err, statement) => {
            if (err) {
                console.log("Ошибка сохранения");
                console.log(err);
                return res.status(401).json({
                    message: 'Что-то пошло не так, попробуйте снова.'
                });
            } else {
                return res.status(201).json({message: 'Запись создана.'});
            }
        });

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
        console.log(e);
    }
};

exports.getAllController = async (req, res) => {
    try {
        const statements = await Statement.find({owner: req.user.userId});

        let StArr = [];
        for (let i = 0; i < statements.length; i++) {
            const {
                directionOrSpecialty,
                formOfEducation,
                levelOfEducation
            } = await Directions.findById(statements[i].directionOrSpecialtyId);
            StArr.push(
                {
                    'directionOrSpecialty': directionOrSpecialty,
                    'sourceOfFinancing': statements[i].sourceOfFinancing,
                    'formOfEducation': formOfEducation,
                    'levelOfEducation': levelOfEducation,
                    'status': statements[i].status
                }
            );
        }

        res.json(StArr);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
        console.log(e);
    }

};



