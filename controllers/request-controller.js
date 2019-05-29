var Request = require('../models/Request');

module.exports.createRequest = (req, res) => {

    console.log('create requst reached');

    // TODO: Get patient_id via last 4 of social, birthdate
    var patient_id = null;

    var newRequest = new Request({
        provider_id: req.body.provider_id,
        patient_id: patient_id,
        accepted: null
    });

    newRequest.save((err) => {
        if(err){
            // TODO: Handle error
        }

        res.sendStatus(200);

        //TODO: Notify patient of request
    })
};

module.exports.readRequest = (req, res) => {

    Request.findById(req.body.request_id, (err, request) => {
        if(err)
        {
            // TODO: Handle Error
        }

        res.send(request)
    })
};

module.exports.updateRequest = (req, res) => {

    // TODO: Provider Update

    // TODO: Patient Update

};
