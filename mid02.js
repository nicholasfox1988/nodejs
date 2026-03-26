const express= require('express');
const app= express();

app.use((req,res,next)=>{
    const time= Date.now();
    req.startTime= time;
    next();
})

app.get('/',(req,res)=>{
    res.send('home page'+req.startTime);
})

app.get('/user',(req,res)=>{
    res.send('user page'+req.startTime);
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})