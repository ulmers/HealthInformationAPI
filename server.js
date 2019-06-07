var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// Controllers
var authenticateController = require('./controllers/authenticate-controller');
var requestController = require('./controllers/request-controller');
var patientController = require('./controllers/patient-controller');

// Config
var config = require('./config.js');
config.setConfig();

mongoose.connect(process.env.MONGODB);

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
});

// Routers

var secureRoutes = express.Router();
app.use('/secure-api', secureRoutes);

secureRoutes.use((req, res, next) => {

    var token = req.body.token || req.headers['token'] || req.query["token"];

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(401).send('INVALID TOKEN');
            } else {
                req.user = decoded.user;

                next();
            }
        })
    } else {
        res.status(401).send('MISSING TOKEN');
    }
});

// CREATE

app.post('/patient', patientController.createPatient);
app.post('/authenticate', authenticateController.authenticate);

secureRoutes.post('/request', requestController.createRequest);

// READ

secureRoutes.get('/patient', patientController.getPatient);

// UPDATE

secureRoutes.put('/request', requestController.updateRequest);

// DELETE
