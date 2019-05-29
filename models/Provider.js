var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Provider', new mongoose.Schema({
    name: String,
    forms: [ObjectId]
}));
