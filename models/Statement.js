const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    document: {type: String, required: true},
    series: {type: String},
    documentNumber: {type: String, required: true},
    dateOfIssue: {type: String, required: true},
    educationalInstitution: {type: String, required: true},
    nameEI: {type: String, required: true},
    yearOfEnding: {type: String, required: true},

    achieve: {type: Array},

    directionOrSpecialtyId: {type: String, required: true},
    sourceOfFinancing: {type: String, required: true},
    competition: {type: String, required: true},
    typeExam1: {type: String, required: true},
    typeExam2: {type: String, required: true},
    typeExam3: {type: String, required: true},
    status: {type: String, default: 'inProcessing', required: true},

    owner: [{type: Types.ObjectId, ref: 'User'}]
});

module.exports = model('Statement', schema);