const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    passportSeries: {type: String, required: true},
    passportID: {type: String, required: true},
    passportIssued: {type: String, required: true},
    departmentCode: {type: String, required: true},
    dateOfIssue: {type: String, required: true},
    owner: [{type: Types.ObjectId, ref: 'User'}]
});

module.exports = model('Passport', schema);