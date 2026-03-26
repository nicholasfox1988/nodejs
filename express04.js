const express= require('express');
const app= express();
const router= require('./router01');

app.use(router);

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})