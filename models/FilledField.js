var mongoose = require('mongoose');
var Mixed = mongoose.Schema.Types.Mixed;
var ObjectId = mongoose.Schema.Types.ObjectId;

var mongoose = require('mongoose');

module.exports = mongoose.model('FilledField', new mongoose.Schema({
    field_id: ObjectId,
    patient_id: ObjectId,
    value: Mixed
}));
