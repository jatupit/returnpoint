'use strict'
const ShopService = require('../service/shop')

module.exports.returnpoint = async (req, res) => {
    console.log('[start] run return point')
    try {
        const shops = await ShopService.updatepoint()
        console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] returnpoint()')
    }

}
module.exports.getexpirepoint = async (req, res) => {
    console.log('[start] run return point')
    try {
        const shops = await ShopService.getexpirepoint()
      //  console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] returnpoint()')
    }

}
