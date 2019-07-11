const request = require('request');
const bcrypt = require('bcrypt');

const authenticateController = require('../controllers/authenticate-controller');

const MODEL_PATH = '../models/';

var Provider = require(MODEL_PATH + 'Provider');

module.exports.createProvider = (req, res) => {

    if (req.body.password === req.body.confirmPassword) {

        console.log(req.body.password + ' === ' + req.body.confirmPassword);

        var newProvider = new Provider({
            practice_id: req.body.practice_id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            enabled: false
        });

        newProvider.save((err, provider) => {
            if (err) {
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
                                email: provider.email,
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

module.exports.readProvider = (req, res) => {
    Provider.findOne({email: req.user}, (err, provider) => {
        if(err) {
            console.log(err.toString());
            console.log(err.code);
            res.status(400).send({});
        } else {
            authenticateController.sendWithToken(req, res, {provider: provider})
        }
    })
};
