'use strict';

// Mongoose ORM module
var mongoose = require('mongoose');

var db = function(){
  return {
    config: function(conf) {
      mongoose.connect('mongodb://localhost/techbooks');
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Connection Error'));
      db.once('open', function() {
        console.log('DB Connection Open ...');
      });
    }
  }
}

module.exports = db();
