'use strict'

const shopModel = require("../models/shop.schema");
const shopTempModel = require("../models/shopTemp.schema")
const qrscanModel = require("../models/qrscan.schema")
const claimModel = require("../models/claim.schema")
const log4js = require("log4js");


log4js.configure({
    appenders: { cheese: { type: "file", filename: "pointexpire.log" } },
    categories: { default: { appenders: ["cheese"], level: "trace" } }
  });
  const logger = log4js.getLogger();
var moment = require('moment-timezone');
const isNullOrEmpty = require("isnullorempty")
module.exports.updatepoint = async (req,res) => {
    console.log("[Start] update point shop ");
    try {
        
       const shoptemp  =  await shopTempModel.find({ shop_code : ""})
    //   const shop  =  await shopModel.find({ shop_code : "X10400-001"})
     //  console.log(`shop : ${shop}`)
       console.log(`shop_code : ${shoptemp}`)

       shoptemp.forEach(async element => {
             let temp =  shopModel.updateOne(
                { shop_code : element.shop_code},
                { $set: { point: parseInt(element.point),updated_date: new Date() }
                    //updated_date: new Date() 

                },
                function (err, doc) {

                    if (err) {
                
                        console.log(`update document error : ${err}`);
                
                    } else {
                
                        console.log(`update document succuess`);
                        console.log(doc);
                
                    }
                 } );
           
              console.log(`temp : ${temp}`)
     
        });
        
        return ""
    }
    catch (err){
        console.error(`update point() fail : ${err.stack}`)
        console.log(`error : ${err.message}`)
    }finally {
        console.log("[END] update point shop ");
    }

}

module.exports.getexpirepoint = async (req,res) => {
    console.log("[Start] getexpire");
    try {
        
       const shoptemp  =  await shopModel.find({ shop_type : 'CV',status : 'ACTIVE'})
      // const shoptemp  =  await shopModel.find({ shop_code : "V36-000-01258"})
     //  console.log(`shop : ${shop}`)
       console.log(`shop_code : ${shoptemp.length}`)

       shoptemp.forEach(async element => {
           // console.log("shop_code : "+element.shop_code)
             let earn = await  qrscanModel.aggregate([
                {
                    $match: {
                      shop_code: element.shop_code,
                      shop_type : 'CV',
                      status: { $not: { $eq: 'ACTIVE' } },
                      $and:
                        [{ created_date: { $gte: moment('2020-04-01').tz('Asia/Bangkok').startOf('day').toDate() } },
                        { created_date: { $lte: moment('2021-09-30').tz('Asia/Bangkok').endOf('day').toDate() } }],
                    },
                  },
                  { $group: { _id: '$shop_code', sum_point: { $sum: '$point' } } },
                  {
                    $project: {
                      _id: -1,
                      shop_code: '$_id',
                      sum_point: 1,
                    },
                  },
             ]);

           
            
             if (!isNullOrEmpty(earn)) {
           
           // console.log(`${element.shop_code} ${earn[0].sum_point}`)
           // logger.debug(`${element.shop_code} ${earn[0].sum_point}`)
             let burn = await claimModel.aggregate([
                {
                  $match: {
                    shop_code: element.shop_code,
                    $and:
                      [{ created_date: { $gte: moment('2020-04-01').tz('Asia/Bangkok').startOf('day').toDate() } },
                      { created_date: { $lte: moment('2022-03-22').tz('Asia/Bangkok').endOf('day').toDate() } }],
                    type: 'Q',
                    status: 'REDEEMED',
                    expire_status: { $not: { $eq: 'ACTIVE' } },
                  },
                },
                { $group: { _id: '$shop_code', sum_point: { $sum: '$point' } } },
                {
                  $project: {
                    _id: -1,
                    shop_code: '$_id',
                    sum_point: 1,
                  },
                },
              ]);
             const burnPoint = isNullOrEmpty(burn) ? 0 : burn[0].sum_point;
            // console.log(element.shop_code+","+earn[0].sum_point+","+burnPoint)
             logger.debug(`,${element.shop_code},${earn[0].sum_point},${burnPoint},${element.point}`)
             console.log(element.shop_code,earn[0].sum_point ,burnPoint,element.point);
            }
             // console.log(burn[0].sum_point)
           
        });
        
        return "done"
    }
    catch (err){
        console.error(`get expire fail : ${err.stack}`)
        console.log(`error : ${err.message}`)
    }finally {
        console.log("[END] get expire point ");
    }

}

module.exports.ConvertPoint = async (req,res) => {
  console.log("[Start] convert point");
  try {
      
    // const shoptemp  =  await shopModel.find({ shop_type : 'CV',status : 'ACTIVE'})
     const shoptemp  =  await shopModel.find({ shop_code : "V36-000-01258"})
     console.log(`shop : ${shoptemp}`)
     console.log(`shop_code : ${shoptemp.length}`)

     shoptemp.forEach(async data => {
     const claimTransaction = await insertclaim(data)
      if(!isNullOrEmpty(claimTransaction._id))
      {
        console.log("claimTransaction "+claimTransaction._id) 
        const pointdivide10 =  Math.floor(data.point/10)    
        await insertqrscan(data,pointdivide10) 
        await updateshop(data.shop_code,pointdivide10)
        
      }
        //   logger.debug(`,${element.shop_code},${earn[0].sum_point},${burnPoint},${element.point}`)
      });
      
      return "done"
  }
  catch (err){
      console.error(`get expire fail : ${err.stack}`)
      console.log(`error : ${err.message}`)
  }finally {
      console.log("[END] get expire point ");
  }

}
var insertclaim = async (data) => {
  const batchTime = moment();
  const checkType = 'Q';
  const batchCode = `${checkType}${batchTime.format('x')}`;
  const uids = null 
  
  //const {line_user_id}  = data.users.first()
 // console.log(line_user_id)
  let claimTransaction = new claimModel({
   
    line_user_id: uids || null,
    shop_code: data.shop_code,
    shop_type: data.shop_type,
    batch_code: batchCode,
    expired_at: null,
    sku: 'SDDM010465',
    reward_id: null,
    reward_campaign_id: null,
    qty: 1,
    claim_multiplier: 1,
    claim_multiplier_unit:  null,
    unit: null,
    status: 'REDEEMED',
    type: 'Q',
    coupon:  null,
    redeemed_at : moment().toDate(),
    point_before : data.point,
    point : data.point *-1,
    point_after : 0,
    updated_date : moment().toDate(),
    created_date : moment().toDate(),
  });
  claimTransaction = await claimTransaction.save();
  console.log("insertclaim "+claimTransaction._id)
  return claimTransaction._id;
};

var insertqrscan = async (data,point) =>{
  const lineid = null
  
  let lastuid = null
  let scanset = null
  let codeResults = [];
  //let codes = { code: string, image_paths: string, sku: string, digit: string }
  if(!isNullOrEmpty(lineid))
  {
    lastuid = lineid.substring(lineid.length - 3, lineid.length);
    scanset = `${moment().format('x')}${lastuid}`;
  }
  
  
 /* codeResults = new qrscanModel.codes.map(codeObj => {
    return new Promise(async resolve => {
      resolve({
        code: 'd202203281234',
        hash: 'd202203281234',
        result: 'success',
        point: point,
        stamp: 0,
        remark :'convert point',
        error_code: 'convert point',
      });
    });
  });*/
  
  let qrscantransaction = new qrscanModel(
    {
      line_user_id:  null,
      shop_code: data.shop_code,
      shop_type: data.shop_type,
      sub_shop_type: null,
      file_name: 'convert point',
      scan_set: scanset,
      point_before: 0,
      point: point,
      point_after: point,
      stamp_before: 0,
      stamp: 0,
      stamp_after: 0,
      codes:null,
      latitude: data.latitude,
      longitude: data.longitude,
      created_date: moment('2022-04-01').toDate(),
      scan_type: 'MANUAL'
    }
  );
  qrscantransaction = await qrscantransaction.save();
  console.log("insertqrscan "+qrscantransaction._id)
};
var updateshop = async (shop_code,point) =>{
  console.log(shop_code+""+point)
  let temp =  shopModel.updateOne(
    { shop_code : shop_code},
    {
       $set: 
         { point: parseInt(point),
          updated_date: new Date() 
          }
    },function (err, doc) {

      if (err) {
  
          console.log(`update document error : ${err}`);
  
      } else {
  
          console.log(`update document succuess`);
          console.log(doc);
  
      }
   });
};
