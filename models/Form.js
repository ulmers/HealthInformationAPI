import {Mixed} from "mongoose";
var ObjectId = mongoose.Schema.Types.ObjectId;

var mongoose = require('mongoose');

module.exports = mongoose.model('Form', new mongoose.Schema({
    provider_id: ObjectId,
    name: String,
    sections: [{
        fields: [{
            label: String,
            value: Mixed
        }]
    }],
}));
