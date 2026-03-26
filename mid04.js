const express= require('express');
const app= express();

app.get('/',(req,res)=>{
    throw new Error('服务器发生了错误');
    res.send('home page');
})

app.use((err,req,res,next)=>{
    console.log('发生了错误：'+err.message);
    res.send('Error'+err.message);
})


app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})