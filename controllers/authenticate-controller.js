const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

 module.exports.sendWithToken = (res, responseBody) => {

    console.log('Added token to: ' + responseBody);

    var token = jwt.sign({}, process.env.SECRET_KEY, {
        expiresIn: 4000
    });

    res.append('token', token);

    res.send(responseBody);
};

module.exports.authenticate = (req, res) => {


    var username = req.body.username.toString();
    var password = req.body.password.toString();

    console.log("login attempted for: " + username + ", " + password);


    Instructor.findOne({username: username}, function(err, instructor) {
        if (err){
            return res.status(500).send("not werking");
        }

        dbpassword = instructor.password.toString();

        console.log(dbpassword);

        if(dbpassword == password){
            sendWithToken(res, {username: username})
        }else{
            return res.status(500).send("bad user/pass combo");
        }
    });
};
