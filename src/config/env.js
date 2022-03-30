
const dotenv =  require('dotenv');
dotenv.config();

const config = {
    nodeEnv : process.env.NODE_ENV || 'development',
    port : process.env.PORT || 3000,
    hostname : process.env.HOSTNAME || 'localhost',
    mongodb : {
      //  uri : process.env.CONNECTION_STRING || 'mongodb://qpack_uat:cmXI8pTkORPTU4nk@qpack-cluster-shard-00-00.kiowv.mongodb.net:27017,qpack-cluster-shard-00-01.kiowv.mongodb.net:27017,qpack-cluster-shard-00-02.kiowv.mongodb.net:27017/uat?ssl=true&replicaSet=atlas-k3cjmg-shard-0&authSource=admin&retryWrites=true&w=majority'
       // uri : process.env.CONNECTION_STRING || 'mongodb://qpack_prd:7Pq7fBLu5cU9sbmW@qpack-cluster-shard-00-00.kiowv.mongodb.net:27017,qpack-cluster-shard-00-01.kiowv.mongodb.net:27017,qpack-cluster-shard-00-02.kiowv.mongodb.net:27017/prd?authSource=admin&replicaSet=atlas-k3cjmg-shard-0&retryWrites=true&ssl=true&w=majority'
       uri: process.env.CONNECTION_STRING || 'mongodb+srv://qpack_dev:hEDsadHhkVOXuiuh@qpack-cluster-dev.kiowv.mongodb.net/prd?retryWrites=true&w=majority'
    },
    reward_id : '6242dd8d3f56ad00121a6628', //sku SD65-0244-1 
   // reward_id : '6242daea0b44bd001a04e107' //sku SD65-0244-1 prod
    reward_campaign_id : '6242df75692c6200131046eb', //campaign reward dummy
   // reward_campaign_id : '6242e5ed0b44bd001a0520d6', //campaign reward dummy prod
    sku_scan : 'SD65-0244-2',
    sku_claim : 'SD65-0244-1',
    remark : 'SD65-0244-ปรับแต้ม CV'

    
};
module.exports = config;