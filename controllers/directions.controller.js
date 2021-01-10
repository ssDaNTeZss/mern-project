const Directions = require('../models/Directions');

exports.saveDirectionsController = async (req, res) => {
    try {
        const {
            directionOrSpecialty,
            levelOfEducation,
            formOfEducation,
            sourceOfFinancing,
            budgetFormik,
            amountBudget,
            offBudgetFormik,
            amountOffBudget,
            exam1,
            minScore1,
            exam2,
            minScore2,
            exam3,
            minScore3
        } = req.body;

        console.log(req.body);


        const direction = new Directions({
            directionOrSpecialty,
            levelOfEducation,
            formOfEducation,
            sourceOfFinancing,
            budget: budgetFormik,
            amountBudget,
            offBudget: offBudgetFormik,
            amountOffBudget,
            exam1,
            minScore1,
            exam2,
            minScore2,
            exam3,
            minScore3
        });

        console.log(direction);

        direction.save((err, direction) => {
            if (err) {
                console.log("Ошибка сохранения");
                return res.status(401).json({
                    message: 'Что-то пошло не так, попробуйте снова.'
                });
            } else {
                return res.status(201).json({message: 'Запись создана.'});
            }
        });

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};

exports.getAllDirectionsController = async (req, res) => {
    try {
        console.log('TEST');
        Directions.find({}, (err, directions) => {
            if (err) {
                console.log("Ошибка поиска.");
                return res.status(401).json({
                    message: 'Что-то пошло не так, попробуйте снова.'
                });
            } else {
                console.log(directions);
                res.json(directions);
            }
        });

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
};
