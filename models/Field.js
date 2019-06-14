var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Field', new mongoose.Schema({
    form_id: ObjectId,
    name: String,
    label: String,
    valueType: String
}));
