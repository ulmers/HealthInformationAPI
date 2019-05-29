const request = require('request');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const authenticateController = require('../controllers/authenticate-controller');

var Patient = require('../models/Patient');

module.exports.createPatient = (req, res) => {

    console.log('create patient reached');

    if(req.body['password'] === req.body['confirmPassword']) {

        console.log('passwords match');

        var newPatient = new Patient({
            firstName: 'first name',
            lastName: 'last name',
            email: req.body.email,
            emailConfirmed: false
        });

        newPatient.save((err, patient) => {
            if(err) {
                console.log(err.toString());
                res.status(500);
            }

            console.log('Added ' + patient + ': ' + patient);

            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {

                    const options = {
                        json: {
                            email: patient.email,
                            passwordHash: hash
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    request.post(process.env.ADDRESS_PW + '/hash', options, (err, response, body) => {
                        if(err) {
                            console.log('error posting hash');
                            console.log(err.toString());
                        }
                    })

                })
            });

            authenticateController.sendWithToken(res, {})
        })
    }
};
