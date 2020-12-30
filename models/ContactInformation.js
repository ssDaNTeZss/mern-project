const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    phone: {type: String, required: true, unique: true},
    residenceAddress: {type: String},
    owner: [{type: Types.ObjectId, ref: 'User'}]
    });

module.exports = model('ContactInformation', schema);