var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Form', new mongoose.Schema({
    name: String,
    sections: [{
        sectionName: String,
        field_ids: [ObjectId]
    }],
}));
