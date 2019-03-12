let mongoose = require('mongoose');
let config = require('./database');
mongoose.connect(config.database,{useNewUrlParser:true});
let db = mongoose.connection;
module.exports = db;