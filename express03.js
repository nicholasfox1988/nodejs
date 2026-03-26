const express= require('express');
const app= express();

app.use('/efg',express.static('./files'))
app.use('/pre',express.static('./preview'))

app.get('/',(req,res)=>{
    res.send(`<h1>hello world!</h1>`);
})


app.post('/user',(req,res)=>{
    res.send(`请求成功！`);
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})