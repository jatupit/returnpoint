
const  appController = require('./controller/returnpoint');
const shopRoutes = (app) =>{
app.get('/',async(request,response)=>{

        response.send('welcome api');
    }); 
//app.post('/returnpoint', appController.returnpoint)
app.post('/expirepoint', appController.getexpirepoint)
}
module.exports = {
    shopRoutes};