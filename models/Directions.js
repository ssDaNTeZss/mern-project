const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    directionOrSpecialty: {type: String, required: true},
    levelOfEducation: {type: String, required: true},
    formOfEducation: {type: String, required: true},
    sourceOfFinancing: {type: String, required: true},
    budget: {type: Boolean},
    amountBudget: {type: String},
    offBbudget: {type: Boolean},
    amountOffBudget: {type: String},
    competition: {type: String, required: true},
    exam1: {type: String, required: true},
    minScore1: {type: String, required: true},
    exam2: {type: String, required: true},
    minScore2: {type: String, required: true},
    exam3: {type: String, required: true},
    minScore3: {type: String, required: true}
});

module.exports = model('Directions', schema);