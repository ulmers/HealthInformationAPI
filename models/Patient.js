var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true, index: { unique: true}},
    emailConfirmed: Boolean,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipCode: String
});

module.exports = mongoose.model('Patient', patientSchema);
