// Requiring module
/*const moment = require('moment');
  
var bool1 = moment().isAfter(moment('2022-01-27T23:59:59+07:00').toDate())
console.log(bool1);
  
var bool2 = moment('2019-10-20')
    .isAfter('2010-12-31', 'year'); //true
console.log(bool2);

var todates = moment('2022-01-27T23:59:59+07:00').toDate()
console.log(todates);

var nowsss = moment()
console.log(nowsss);

*/
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');

const buildApp = async(Option ={}) =>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    route.shopRoutes(app);
    return app;
}

module.exports = buildApp;