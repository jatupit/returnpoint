
const MongooseT = require('mongoose');

var Schema = MongooseT.Schema;
const collection = 'qrscan';

var qrscanSchema =  Schema({

    line_user_id: { type: String },
    shop_code: { type: String },
    shop_type: { type: String },
    sub_shop_type: { type: String },
    point_before: { type: Number },
    point: { type: Number },
    point_after: { type: Number },
    stamp_before: { type: Number },
    stamp: { type: Number },
    stamp_after: { type: Number },
    file_name: { type: String },
    scan_set: { type: String },
    invoice_no: { type: String },
    pallet_id: { type: String },
    scan_type: { type: String },
    batch_id: { type: String },
    codes: [{
      type: Object,
      code: { type: String },
      hash: { type: String },
      map_code: { type: String },
      original_code: { type: String },
      sku: { type: String },
      point: { type: Number },
      stamp: { type: Number },
      result: { type: String },
      remark: { type: String },
      campaign_code: { type: String },
      stamp_campaign_code: { type: String },
      error_code: { type: String }
    }],
    latitude: { type: Number },
    longitude: { type: Number },
    status: { type: String },
    status_stamp: { type: String },
    created_date : {type : Date}
},
{
 timestamp : true,
 versionKey : false,
 collection
});

// Compile model from schema
module.exports = MongooseT.model(collection, qrscanSchema);



