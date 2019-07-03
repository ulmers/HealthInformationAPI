var mongoose = require('mongoose');

module.exports = mongoose.model('Field', new mongoose.Schema({
    name: String,
    label: String,
    valueType: String
}));
