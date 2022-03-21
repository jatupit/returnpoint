'use strict'
const buildApp = require('./src/app');
const config = require('./src/config');
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const startApp = async() =>{
  const appOptions = {
      logger :true
  }
  const app = buildApp(appOptions);
  try{
   (await app).listen(config.port,config.hostname,()=>{
    console.log(`app is listening on port ${config.port}`);
    mongoose.connect(config.mongodb.uri,{
       useNewUrlParser : true,
        useUnifiedTopology : true
    });
    console.log(`connect mongo success`);
   });
  
  } catch(error){
    throw error;
  }
}

startApp();
