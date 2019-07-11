var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Provider', new mongoose.Schema({
    practice_id: ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    enabled: Boolean
}));
