const request = require('request');
const bcrypt = require('bcrypt');

const authenticateController = require('../controllers/authenticate-controller');

const MODEL_PATH = '../models/';

var Patient = require(MODEL_PATH + 'Patient');

module.exports.createPatient = (req, res) => {

    if(req.body.password === req.body.confirmPassword) {

        console.log(req.body.password + ' === ' + req.body.confirmPassword);

        var newPatient = new Patient({
            email: req.body.email,
            emailConfirmed: false
        });

        newPatient.save((err, patient) => {
            if(err) {
                console.log(err.toString());
                console.log(err.code);
                res.status(400).send({});
            } else {

                bcrypt.hash(req.body.password.toString(), authenticateController.saltRounds, (err, hash) => {
                    if(err) {
                        console.log(err.toString())
                    } else {

                        console.log(req.body.password.toString() + ' compared to ' + hash.toString() + ': ' + bcrypt.compareSync('pass', hash));

                        const options = {
                            json: {
                                email: patient.email,
                                passwordHash: hash.toString()
                            },
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };

                        request.post(process.env.URL_PASSWORD_DB + '/hash', options, (err, response, body) => {
                            if(err) {
                                console.log('error posting hash');
                                console.log(err.toString());
                            } else {
                                req.user = req.body.email;
                                authenticateController.sendWithToken(req, res, {})
                            }

                        });
                    }
                });
            }
        })
    }
};

module.exports.getPatient = (req, res) => {

    Patient.findOne({email: req.user}, (err, patient) => {
        if(err) {
            console.log(err.toString());

            console.log(err.code);
            res.status(400).send({});
        } else {
            authenticateController.sendWithToken(req, res, {patient: patient})
        }
    })
};
