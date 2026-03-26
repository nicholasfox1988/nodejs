const express= require('express');
const app= express();

const mw= function(req,res,next){
    console.log('转交流转');
    next();
}

app.use(mw)

app.get('/',(req,res)=>{
    res.send('home page');
})

app.get('/user',(req,res)=>{
    res.send('user page');
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})