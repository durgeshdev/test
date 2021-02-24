/**
 * @package [setup] - Application db configuration
 * @author [durgesh]
 */

'use strict';

/* DB */
var mongoose = require('mongoose');
mongoose.Promise = Promise;

require('../api/models/user/User');

mongoose.connect(process.env.MONGO_CONNECT, {useNewUrlParser:true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', function(error){
    console.log('Database connection error',error);
    process.exit();
});
db.once('open', function(callback) {
    console.log('Database connection successful!');
});
/* end DB */

module.exports = db;
