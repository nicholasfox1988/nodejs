const express= require('express');
const app= express();

const mw1= function(req,res,next){
    console.log('第一个中间件');
    next();
}
const mw2= function(req,res,next){
    console.log('第二个中间件');
    next();
}

app.get('/',mw1,mw2,(req,res)=>{
    res.send('home page');
})

app.get('/user',(req,res)=>{
    res.send('user page');
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})