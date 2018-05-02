const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('mongodb connected');
});

mongoose.connect('mongodb://localhost:27017/PICSELL');
//mongoose.connect('mongodb://username:password@host:port/database?options...');
autoIncrement.initialize(mongoose.connection);
