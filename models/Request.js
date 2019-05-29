var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// TODO: Add fields requested
module.exports = mongoose.model('Request', new mongoose.Schema({
    provider_id: ObjectId,
    patient_id: ObjectId,
    accepted: Boolean
}, {
    timestamps: true
}));
