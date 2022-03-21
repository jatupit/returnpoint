var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/mydb';
mongoose.connect(url);
var db = mongoose.connection;
// เมื่อการเชื่อมต่อสำเร็จ
db.on('connected', function() {
    console.log('Mongoose connected');
});
// เมื่อการเชื่อมต่อไม่สำเร็จ
db.on('error', function(err) {
    console.log('Mongoose error: ' + err);
});