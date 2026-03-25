const http= require('http');

const server= http.createServer();

server.on('request',(req,res)=>{
    const str= `你的请求地址是${req.url},请求方式是${req.method}`;
    console.log(str);
    res.setHeader('Content-Type','text/html;charset=utf-8',);
    res.end(str);
})

server.listen(9000,()=>{
    console.log('sever is running at http://127.0.0.1:9000')
})