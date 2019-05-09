var express = require('express');
var app = express();
var bodyparser = require('body-parser');

// Controllers
var dataController = require("./controllers/data-controller.js");

// Config
var config = require('./config.js');
config.setConfig();

mongoose.connect(process.env.MONGOOSE_CONNECT);

app.use(bodyparser.urlencoded({extended: true}));

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
});