const request = require('request');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports.saltRounds = 10;

const MODEL_PATH = '../models/';

var Patient = require(MODEL_PATH + 'Patient');
var Provider = require(MODEL_PATH + 'Provider');

 module.exports.sendWithToken = (req, res, responseBody) => {

    var token = jwt.sign(
        {
            user: req.user
        },
        process.env.SECRET_KEY,
        {
        expiresIn: 4000
        }
    );

    responseBody.token = token;

    res.json(responseBody);
};

module.exports.authenticate = (req, res) => {

    const options = {
        json: {
            email: req.body.email
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };

    request.get(process.env.URL_PASSWORD_DB + '/hash', options, (err, response, body) => {
        if(err) {
            console.log('error getting hash');
            console.log(err.toString());
        } else {

            bcrypt.compare(req.body.password.toString(), body.passwordHash.toString(), (err, passwordsMatch) => {
                console.log(req.body.password.toString() + ' compared to ' + body.passwordHash.toString() + ': ' + passwordsMatch);



                if (err) {
                    console.log('unknown error');
                    res.status(500).send();
                } else if (passwordsMatch === false) {
                    console.log('passwords did not match');
                    res.status(401).send('Username/Password combination does not exist.')
                } else {
                    var userType = '';

                    Patient.findOne({email: req.body.email}, (err, patient) => {
                        if (err) {
                            res.status(401).send('Username/Password combination does not exist.')
                        } else if (patient) {
                            userType = 'patient';
                            req.user = req.body.email;
                            this.sendWithToken(req, res, {userType: userType});
                        } else {
                            Provider.findOne({email: req.body.email}, (err, provider) => {
                                if (err) {
                                    res.status(401).send('Username/Password combination does not exist.')
                                } else if (provider) {
                                    userType = 'provider';
                                    req.user = req.body.email;
                                    this.sendWithToken(req, res, {userType: userType});
                                } else {
                                    res.status(401).send('Username/Password combination does not exist.')
                                }
                            });
                        }
                    });
                }
            })
        }
    })
};
