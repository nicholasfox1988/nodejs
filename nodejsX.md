<details>
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
**express02.js**
```js
const express= require('express');
const app= express();

app.use(express.static('files'))
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
```
> req.query是读取/?name=zs&age=21

生成:{"name": "zs","age": "21"}
> req.params是读取动态的/user/:id/:name中的id和name

生成:{"name": "zs","age": "21"}

**静态托管文件夹,可任意使用该文件夹中的文件**
> app.use(express.static('files'))

**可托管多个静态目录，也可在访问中要求书写/abc任意字符串
> app.use('/abc',express.static('files'))

**express03.js**
```js
const express= require('express');
const app= express();

app.use(express.static('./files'))
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
```

**全局安装nodemon,不用重启服务器了**
> npm i nodemon -g

</details>
<br/>
<details open>
<summary>express路由</summary>
<br/>


</details>
