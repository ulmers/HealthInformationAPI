var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var mongoose = require('mongoose');

module.exports = mongoose.model('Form', new mongoose.Schema({
    name: String,
    sections: [{
        field_ids: [ObjectId]
    }],
}));
