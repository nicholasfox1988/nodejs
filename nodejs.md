<details>
<summary>fs和path 操作</summary>

> path.join(__dirname,'   ') 拼凑出文件的绝对路径 

> fs.readFile()可以创建文件，但是不能创建文件夹

> fs.writeFile()可以生成文件或者覆盖已经存在的文件

**源文件01.txt内容**
> 小红=100 小明=98 小黑=55

**目标文件01-1.txt内容**
```
小红:100
小明:98
小黑:55
```

**fs_path.js**

```javascript
const fs= require('fs');
const path= require('path');

filePath1= path.join(__dirname,'./files/01.txt');
filePath2= path.join(__dirname,'./files/01-1.txt');

fs.readFile(filePath1,'utf-8',(err,dataStr)=>{
    if(err){
        return console.log('读取失败！！！',err.message);
    }
    console.log('读取成功！',dataStr);

    let arr1= dataStr.split(' ');
    // console.log(arr1);
    let arr2= [];
    arr1.forEach(item=>{
        arr2.push(item.replace('=',':'));
    })
    // console.log(arr2);
    let newStr= arr2.join('\r\n');
    console.log(newStr);
    
    fs.writeFile(filePath2,newStr,(err)=>{
        if(err){
            return console.log('写入失败！！！',err.message);
        }
        console.log('写入成功!');
    })
})
```
> path.basename()

> path.extname()

</details>
<br/>
<details>
<summary>html文件分解</summary>

### 完整的html文件拆解成三个文件.html,.css,.js

**seperate.js**
```javascript
const fs= require('fs');
const path= require('path');

fs.readFile(path.join(__dirname,'./files/k.html'),'utf-8',(err,data)=>{
    if(err){
        console.log('载入失败。',err.message);
    }
    // console.log(data);
    let regStyle= /<style>[\s\S]*<\/style>/;
    let newCss= regStyle.exec(data)[0].replace('<style>','').replace('</style>','');

    let regScript= /<script>[\s\S]*<\/script>/;
    let newjs= regScript.exec(data)[0].replace('<script>','').replace('</script>','');

    let newHtml= data.replace(regStyle,'<link rel="stylesheet" href="./korean.css">').replace(regScript,'<script src="./korean.js"></script>');
    
    // console.log(newHtml);
    // console.log(newCss);
    // console.log(newScript);
    fs.writeFile(path.join(__dirname,'./files/korean.css'),newCss,(err)=>{
        if(err) console.log('写入失败');
        console.log('写入成功。')
    })
    fs.writeFile(path.join(__dirname,'./files/korean.js'),newjs,(err)=>{
        if(err) console.log('写入失败');
        console.log('写入成功。')
    })
    fs.writeFile(path.join(__dirname,'./files/korean.html'),newHtml,(err)=>{
        if(err) console.log('写入失败');
        console.log('写入成功。')
    })
})
```
</details>
<br/>
<details>
<summary>http</summary>

### http01.js
```javascript
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
```

### http02.js
```javascript
const http= require('http');

const server= http.createServer();

server.on('request',(req,res)=>{
    let url= req.url;
    let content= '<h1>404 Not found!</h1>';
    if(url=== '/' || url=== '/index.html'){
        content= '<h1>首页</h1>';
    }else if(url=== '/about.html'){
        content= '<h1>关于页面</h1>';
    }
    // 中文解码
    res.setHeader('Content-Type','text/html;charset=utf-8',);
    res.end(content);
})

server.listen(9000,()=>{
    console.log('sever is running at http://127.0.0.1:9000')
})
```

</details>
