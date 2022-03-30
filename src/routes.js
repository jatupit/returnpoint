
const  appController = require('./controller/returnpoint');
const shopRoutes = (app) =>{
app.get('/',async(request,response)=>{

        response.send('welcome api');
    }); 
//app.post('/returnpoint', appController.returnpoint)
//app.post('/expirepoint', appController.getexpirepoint)
app.post('/convertpoint', appController.convertpoint)
app.get('/getshop/:shopType', appController.getshop)
app.get('/getclaim/:shopType', appController.getclaim)
app.get('/getqrscan/:shopType', appController.getqrscan)
app.post('/claim', appController.claim)
app.post('/qrscan', appController.qrscan)
app.put('/shop', appController.shop)
}
module.exports = {
    shopRoutes};