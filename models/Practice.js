var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Practice', new mongoose.Schema({
    name: String,
    admin_ids: [ObjectId],// Provider ids
    provider_ids: [ObjectId],
    patient_ids: [ObjectId],
    form_ids: [ObjectId],
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
}));
