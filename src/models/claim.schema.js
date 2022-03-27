
const MongooseT = require('mongoose');

var Schema = MongooseT.Schema;
const collection = 'claim';

var claimSchema =  Schema({

    line_user_id: { type: String },
    shop_code: { type: String },
    shop_type: { type: String },
    batch_code: { type: String },
    expired_at: { type: Date },
    redeemed_at: { type: Date },
    updated_date :{type : Date},
    created_date : {type : Date},
    sku: { type: String }, // change to reward_id
    reward_id: { type: String },
    reward_campaign_id: { type: String },
    qty: { type: Number },
    claim_multiplier: { type: Number },
    unit: { type: String },
    claim_multiplier_unit: { type: String },
    point_before: { type: Number },
    point: { type: Number },
    point_after: { type: Number },
    stamp_before: { type: Number },
    stamp: { type: Number },
    stamp_after: { type: Number },
    trophy_before: { type: Number },
    trophy: { type: Number },
    trophy_sku: { type: String },
    trophy_product_group: { type: String },
    trophy_after: { type: Number },
    status: { type: String }, // CLAIMED, REDEEMED, FAILED
    type: { type: String }, // Q = POINT, L = LINE Promotion, QS = STAMP, QT = Trophy
    latitude: { type: Number },
    longitude: { type: Number },
    coupon: [{
      type: Object,
      code: { type: String },
      sku: { type: String },
    }],
    expire_status: { type: String }
},
{
    timestamp : true,
    versionKey : false,
    collection
   }
);

// Compile model from schema
module.exports = MongooseT.model(collection, claimSchema);



