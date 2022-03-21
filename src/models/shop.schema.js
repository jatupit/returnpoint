
const MongooseT = require('mongoose');

var Schema = MongooseT.Schema;
const collection = 'shop';

var shopSchema =  Schema({

  shop_code: { type : String},
  point: {type : Number},
  updated_date: {type : Date}
},
{
 timestamp : true,
 versionKey : false,
 collection
});

// Compile model from schema
module.exports = MongooseT.model(collection, shopSchema);



