const express= require('express');
const app= express();

app.get('/',(req,res)=>{
    res.send(`<h1>hello world!</h1>`);
})
app.get('/user',(req,res)=>{
    res.send({name:'nick',age:20,gender:'male'});
})

app.post('/user',(req,res)=>{
    res.send(`请求成功！`);
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})