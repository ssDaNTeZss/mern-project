const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    patronymic: {type: String, required: false},
    role: {type: String, default: 'user'},
    DOB: {type: String, required: false},
    BPL: {type: String, required: false},
    gender: {type: String, required: false},
    citizenship: {type: String, required: false},
    citizenship2: {type: String, required: false},
    passportInformation: [{type: Types.ObjectId, ref: 'Passport'}]
});

module.exports = model('User', schema);