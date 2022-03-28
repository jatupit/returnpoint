
const MongooseT = require('mongoose');

var Schema = MongooseT.Schema;
const collection = 'shop';
const UserSchema =  new Schema(
  {
    line_user_id: { type: String, index: true },
    mobile_no: { type: String },
    display_name: { type: String },
    picture_url: { type: String },
    role: { type: String }, // { ADMIN , MEMBER }
    status: { type: String, index: true },// { ACTIVE , BLOCKED }
    registered_date: { type: Date },
    blocked_date: { type: Date },
    mistake_continue: { type: Number },
    latitude: { type: Number },
    longitude: { type: Number },
    device_id: { type: String },
    // address_id: { type: String },
  },
  { _id: false },
);
var shopSchema =  Schema({


        shop_code: { type: String },
        shop_name: { type: String },
        shop_type: { type: String },
        sub_shop_type: { type: String },
        shop_type_updated_date: { type: Date },
        mobile_no: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
        point: { type: Number },
        stamp: { type: Number },
        status: { type: String, index: true }, // { PENDING = กรอกรหัสร้านค้า(A1)แล้ว, ACTIVE = ลงทะเบียน(A2)แล้ว, INACTIVE=ปิด }
        next_date: { type: String },  // ไม่ได้เก็บลงฐานข้อมูล
        max_success: { type: Number },
        mistake_accum: { type: Number },
        redeem_count: { type: Number },
        users: [UserSchema],
        verify_flag: { type: String },
        verify_status: { type: String },
        verify_date: { type: Date },
        verify_by: { type: String },
        remark: { type: String },
        partner_status: { type: String }, // ACTIVE, REGISTERED , INACTIVE
        partner_register_date: { type: Date },
        allow_upload: { type: Boolean },
        allow_upload_expire_date: { type: Date },
        partial_claim: { type: Boolean },
        partial_claim_redeem: { type: Boolean },
        updated_date: {type : Date},
        created_date : {type : Date}

        
},
{
 timestamp : true,
 versionKey : false,
 collection
});

// Compile model from schema
module.exports = MongooseT.model(collection, shopSchema);



