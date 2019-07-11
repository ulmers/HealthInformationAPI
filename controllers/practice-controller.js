const request = require('request');
const bcrypt = require('bcrypt');

const authenticateController = require('../controllers/authenticate-controller');

const MODEL_PATH = '../models/';

var Practice = require(MODEL_PATH + 'Practice');
var Provider = require(MODEL_PATH + 'Provider');

module.exports.createPractice = (req, res) => {

    Provider.findOne({email: req.user},(err, provider) => {
        if(err) {

        } else {
            newPractice = new Practice({
                name: req.body.name,
                admin_ids: [provider._id],
                provider_ids: [],
                patient_ids: [],
                form_ids: [],
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            });

            newPractice.save((err, practice) => {
                if(err) {
                    console.log(err.toString());
                    res.status(400).send('Unable to create Practice');
                } else {
                    authenticateController.sendWithToken(req, res, {practice})
                }
            })
        }
    });
};
