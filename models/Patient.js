var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    emailConfirmed: Boolean
});

module.exports = mongoose.model('Patient', patientSchema);
