module.exports.setConfig = () => {
    process.env.MONGODB = 'mongodb://rest:A8C4d8mEeXgZzkX@ds163377.mlab.com:63377/heroku_tt1xn7kl';
    process.env.APP_DB_NAME = 'heroku_tt1xn7kl';
    process.env.SECRET_KEY = 'mysecretkey';
    process.env.PORT = 3000;

    process.env.ADDRESS_PW = 'http://localhost:3005';
};
