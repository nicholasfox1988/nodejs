const http= require('http');

const server= http.createServer();

server.on('request',(req,res)=>{
    const url= req.url;
    const method= req.method;
    const str= `Your request url is ${url},and request method is ${method}`;
    console.log(str);
    res.end('<h1>hello world</h1>')
})

server.listen(9000,()=>{
    console.log('sever is running at http://127.0.0.1:9000')
})