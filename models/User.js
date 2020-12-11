const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    patronymic: {type: String, required: false},
    data: [{type: Types.ObjectId, ref: 'Data'}]
});

module.exports = model('User', schema);