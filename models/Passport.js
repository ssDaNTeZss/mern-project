const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    passportSeries: {type: String, required: true},
    passportID: {type: String, required: true},
    passportIssued: {type: String, required: true},
    departmentCode: {type: String, required: true},
    dateOfIssue: {type: String, required: true},
    region: {type: String},
    point: {type: String},
    district: {type: String},
    street: {type: String},
    house: {type: String},
    apartment: {type: String},
    owner: [{type: Types.ObjectId, ref: 'User'}]
});

module.exports = model('Passport', schema);