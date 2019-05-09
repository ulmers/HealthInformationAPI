import {Mixed} from "mongoose";

var mongoose = require('mongoose');

module.exports = mongoose.model('Form', {
    provider_id: ObjectId,
    name: String,
    sections: [{
        fields: [{
            label: String,
            value: Mixed
        }]
    }],
});