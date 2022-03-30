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

module.exports.convertpoint = async (req, res) => {
    console.log('[start] run convert point')
    try {
        const shops = await ShopService.ConvertPoint()
      //  console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] convert point()')
    }

}
module.exports.getshop = async (req, res) => {
    console.log('[start] run getshop')
    try {
        const { shopType } = req.params;
        const shops = await ShopService.getshop(shopType)
      //  console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] getshop()')
    }

}
module.exports.shop = async (req, res) => {
    console.log('[start] run update shop ')
    try {
        const shops = await ShopService.updateshop()
      //  console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] update shop')
    }

}
module.exports.claim = async (req, res) => {
    console.log('[start] insert claim')
    try {
        const shops = await ShopService.insertclaim()
      //  console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] insert claim')
    }

}
module.exports.qrscan = async (req, res) => {
    console.log('[start] insert qrscan')
    try {
        const shops = await ShopService.insertqrscan()
      //  console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] insert qrscan')
    }

}
module.exports.getclaim = async (req, res) => {
    console.log('[start] run getclaim')
    try {
        const { shopType } = req.params;
        const shops = await ShopService.getclaim(shopType)
      //  console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] getclaim()')
    }

}
module.exports.getqrscan = async (req, res) => {
    console.log('[start] run getqrscan')
    try {
        const { shopType } = req.params;
        const shops = await ShopService.getqrscan(shopType)
      //  console.log('result :', res)
         res.send(shops)
    }
    catch (error) {
        res.errorEvent(req, res, `${error.message}`)
    }
    finally {
        console.log('[ END ] getqrscan()')
    }

}
