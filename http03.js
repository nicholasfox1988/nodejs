const fs= require('fs');
const path= require('path');
const http= require('http');

const server= http.createServer();

server.on('request',(req,res)=>{
    let url= req.url;
    let fpath=  '';

    if(url=== '/'){
        // 登入初始页面
        fpath= path.join(__dirname,'./files/index.html');
    }else{
        // 省略输入/files,直接输入k.html
        fpath= path.join(__dirname,'./files',url);
    }

    fs.readFile(fpath,'utf-8',(err,data)=>{
        if(err) return res.end('404 Not found!');
        res.end(data);
    }) 
})

server.listen(9000,()=>{
    console.log(`server is running at http://127.0.0.1:9000`);
})