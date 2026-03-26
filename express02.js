const express= require('express');
const app= express();

app.get('/',(req,res)=>{
    console.log(req.query);
    res.send(req.query);
})
app.get('/user',(req,res)=>{
    res.send({name:'nick',age:20,gender:'male'});
})
app.get('/user/:id/:name',(req,res)=>{
    console.log(req.params);
    res.send(req.params);
})

app.post('/user',(req,res)=>{
    res.send(`请求成功！`);
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})