module.exports.setConfig = () => {
    process.env.MONGOOSE_CONNECT = "mongodb://heroku_0c4cmntj:tq30pc8hvcdabf42m9aogepad0@ds133865.mlab.com:33865/heroku_0c4cmntj";
    process.env.PORT = 3000;
}