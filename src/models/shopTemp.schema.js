const Mongoose = require('mongoose');


var Schema = Mongoose.Schema;
const collection = 'shop_bk';

var shoptempSchema =  Schema({

  shop_code: { type : String},
  point: {type : Number}
},
{
 timestamp : true,
 versionKey : false,
 collection
});

// Compile model from schema
module.exports = Mongoose.model(collection, shoptempSchema);

