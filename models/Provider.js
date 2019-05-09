var mongoose = require('mongoose');

module.exports = mongoose.model('Provider', {
    name: String,
    forms: [ObjectId]
});