
const  appController = require('./controller/returnpoint');
const shopRoutes = (app) =>{
app.get('/',async(request,response)=>{

        response.send('welcome api');
    }); 
//app.post('/returnpoint', appController.returnpoint)
//app.post('/expirepoint', appController.getexpirepoint)
app.post('/convertpoint', appController.convertpoint)
app.get('/getshop/:shopType', appController.getshop)
app.post('/claim', appController.claim)
app.post('/qrscan', appController.qrscan)
app.put('/shop', appController.shop)
}
module.exports = {
    shopRoutes};