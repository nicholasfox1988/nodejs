# nodejs学习记录

<details>
<summary>fs和path 操作</summary>

> path.join(__dirname,'   ') 拼凑出文件的绝对路径 

> fs.writeFile()可以创建文件，但是不能创建文件夹

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
<summary>http的操作</summary>

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

### http03.js  在地址栏追加k.html导航
```javascript
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
```
</details>
<br/>
<details>
<summary>模块:内置(fs,path,http)，自定义(用户自己写的.js文件)，第三方(包)</summary>

**ex.js**
```javascript
module.exports.username= '张三';

module.exports.sayhello= function(){
    console.log('hello world!');
}
```

**im.js**
```javascript
const m= require('./ex');

console.log(m);
```
**im.js**
```javascript
const { username } = require('./ex');

console.log(username);
```

> node im.js输出结果为:{ username: '张三', sayhello: [Function (anonymous)] }

> exports 就是module.exports 它们同时指向一个空对象,所以直接用exports就可以了。永远以module.exports指向的对象为准。exports的权重不如module.exports。

> 请只使用 module.exports
</details>
<br/>
<details>
<summary>CommonJS规范</summary>
<br/>

+ 每个js文件里面都有一个module,代表当前模块。

+ module是一个对象，它里面有一个exports(即module.exports)是对外的接口

+ require('模块'),其实是加载了这个模块的module.exports
</details>
<br/>
<details>
<summary>第三方模块（包）</summary>
<br/>

**安装时间格式化包moment**
> npm i moment

**指定moment包的版本**
> npm i moment@2.22.2

**17.js**
```javascript
const moment= require('moment');
const dt= moment().format('YYYY-MM-DD HH:mm:ss');

console.log(dt);
```
***结果如下  :***
> 2026-03-26 09:40:44
</details>
<br/>
<details>
<summary>创建项目project</summary>
<br/>

```dos
npm i packName      //核心安装
npm i packName -g   //全局安装
npm i packName -D   //开发安装
```

**第一件事是:初始化目录（项目文件夹名请不要使用中文）**

> npm init -y

**有配置文件package.json的话，只需输入下面的命令，将会把配置文件里面的dependencies所有的依赖包全部下载下来**

> npm i

**卸载包 uninstall没有缩写**

> npm uninstall art-template

**将包安装到开发环境，不安装到发布环境中**
> npm install art-template -D

**查看下包服务器地址**
> npm config get registry

**结果如下**
> https://registry.npmjs.org/


**设置下包服务器地址**

> npm config set registry=http://registry.npm.taobao.org/
 
**安装nrm,将nrm安装为全局工具**

> npm i nrm -g

**查看可使用的服务器地址**
> nrm ls

**结果如下:**
```dos
  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
  huawei ------- https://repo.huaweicloud.com/repository/npm/
```
**切换npm服务器，命令如下**
> nrm use taobao

**i5ting_to可将md转html**
> npm install i5ting_toc -g
</details>
<br/>
<details open>
<summary>自创包</summary>
<br/>

- **my-package/**
    - index.js
    - package.json
    - readme.md

**index.js**
```javascript
function dateFormat(dateStr){
    const dt= new Date(dateStr);

    const y= dt.getFullYear();
    const m= dt.getMonth()+1;
    const d= dt.getDate();

    const hh= dt.getHours();
    const mm= dt.getMinutes();
    const ss= dt.getSeconds();

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

function padZero(n){
    return n>9 ? n : '0'+n;
}

function htmlEscape(htmlstr){
    return htmlstr.replace(/<|>|"|&/g,(match)=>{
        switch(match){
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '"':
                return '&quot;'
            case '&':
                return '&amp;'
        }
    })
}

module.exports= {
    dateFormat,
    htmlEscape
}
```

**package.json**
```javascript
{
    "name": "nick-tools",
    "version": "1.0.0",
    "main": "./index.js",
    "description": "Nothing",
    "keywords": ["itheima","dateFormat"],
    "license":"ISC"
}
```


</details>
<br/>
<details open>
<summary>express操作</summary>
<br/>

**安装**
> npm i express@4.17.1

**express01.js**
```js
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
```

</details>
