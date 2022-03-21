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