const request = require('request');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports.saltRounds = 10;

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

    var email = req.body.email;

    const options = {
        json: {
            email: email
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };

    request.get(process.env.ADDRESS_PW + '/hash', options, (err, response, body) => {
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
                    req.user = email;
                    this.sendWithToken(req, res, {});
                }
            })
        }
    })
};
