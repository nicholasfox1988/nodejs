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

生成:{"id": 1001,"name": "nick"}

**静态托管文件夹,可任意使用该文件夹中的文件**
> app.use(express.static('files'))

**可托管多个静态目录，也可在访问中要求书写/abc任意字符串**
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
<details>
<summary>express路由</summary>
<br/>

**将主程序中的复杂的路由模块分割出去**

**router01.js是分割出去的路由**
```js
const express= require('express');
const router= express.Router();

router.get('/user/list',(req,res)=>{
    res.send(`GET user list.`);   
})

router.post('/user/add',(req,res)=>{
    res.send(`Add new user.`);
})

module.exports= router;
```

**express04.js调用router01.js中编写好的路由进行使用所以只需修改router01.js即可完成修改路由设置**
```js
const express= require('express');
const app= express();
const router= require('./router01');

app.use(router);

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})
```

> app.use()是用来注册全局中间件（很重要）router和express.static都属于中间件

> app.use('/abc',中间件); 可以给中间件添加前缀
</details>
<br/>
<details open>
<summary>中间件</summary>
<br/>

**next()是实现多个中间件连续调用的关键，传递数据**

**mid01.js中间件使用app.use使用中间件**
```js
const express= require('express');
const app= express();

const mw= function(req,res,next){
    console.log('转交流转');
    next();
}

app.use(mw)

app.get('/',(req,res)=>{
    res.send('home page');
})

app.get('/user',(req,res)=>{
    res.send('user page');
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})
```
**mid01.js的简化版本**
```js
const express= require('express');
const app= express();

app.use((req,res,next)=>{
    console.log('转交流转');
    next();
})

app.get('/',(req,res)=>{
    res.send('home page');
})

app.get('/user',(req,res)=>{
    res.send('user page');
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})
```

**中间件可以传递(req,res)给其他中间件和路由**

**mid02.js**
```js
const express= require('express');
const app= express();

app.use((req,res,next)=>{
    const time= Date.now();
    req.startTime= time;
    next();
})

app.get('/',(req,res)=>{
    res.send('home page'+req.startTime);
})

app.get('/user',(req,res)=>{
    res.send('user page'+req.startTime);
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})
```
**在路由中可以加入局部生效的中间件**

**mid03.js**
```js
const express= require('express');
const app= express();

const mw1= function(req,res,next){
    console.log('第一个中间件');
    next();
}
const mw2= function(req,res,next){
    console.log('第二个中间件');
    next();
}

app.get('/',mw1,mw2,(req,res)=>{
    res.send('home page');
})

app.get('/user',(req,res)=>{
    res.send('user page');
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})
```
>**一定要在路由之前去定义注册中间件，放路由后面的话就失效了**

> **中间件的最后一行必须是next(),next()后面不要再有代码了**

> **中间件之间共享(req,res),req可以挂其他属性值和方法**

**错误级别的中间件必须放最后，捕捉错误**

**mid04.js**
```js
const express= require('express');
const app= express();

app.get('/',(req,res)=>{
    throw new Error('服务器发生了错误');
    res.send('home page');
})

app.use((err,req,res,next)=>{
    console.log('发生了错误：'+err.message);
    res.send('Error'+err.message);
})

app.listen(9000,()=>{
    console.log(`express server running at http://127.0.0.1:9000`);
})
```

- **express自带的中间件**
    - express.static >>>托管文件夹,可访问文件夹中所有文件
    - express.json   >>>
    - express.urlencoded

> app.use(express.static('./files'))

> app.use(express.json())

> app.use(express.urlencoded({extended:false}))

**然后通过req.body进行访问**
</details>
