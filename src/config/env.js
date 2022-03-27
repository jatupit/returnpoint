
const dotenv =  require('dotenv');
dotenv.config();

const config = {
    nodeEnv : process.env.NODE_ENV || 'development',
    port : process.env.PORT || 3000,
    hostname : process.env.HOSTNAME || 'localhost',
    mongodb : {
        uri : process.env.CONNECTION_STRING || 'mongodb://qpack_uat:cmXI8pTkORPTU4nk@qpack-cluster-shard-00-00.kiowv.mongodb.net:27017,qpack-cluster-shard-00-01.kiowv.mongodb.net:27017,qpack-cluster-shard-00-02.kiowv.mongodb.net:27017/uat?ssl=true&replicaSet=atlas-k3cjmg-shard-0&authSource=admin&retryWrites=true&w=majority'
       // uri : process.env.CONNECTION_STRING || 'mongodb://qpack_prd:7Pq7fBLu5cU9sbmW@qpack-cluster-shard-00-00.kiowv.mongodb.net:27017,qpack-cluster-shard-00-01.kiowv.mongodb.net:27017,qpack-cluster-shard-00-02.kiowv.mongodb.net:27017/prd?authSource=admin&replicaSet=atlas-k3cjmg-shard-0&retryWrites=true&ssl=true&w=majority'
    }
    
};
module.exports = config;