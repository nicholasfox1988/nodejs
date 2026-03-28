# 比较完整的服务器

project目录
- public/
  - css/
  - img/
- views/
  - 404.hbs
  - 500.hbs
  - homepage.hbs
- index.js
- router.js

> npm init -y

> npm i express hbs

**index.js服务器入口程序**
```js
const express = require('express');
const path = require('path');
const app = express();
const router = require('./router.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(router);

app.use((err, req, res, next) => {
  console.log(err.message);
  // res.status(500).render('500.hbs');
  res.status(500).render('500.hbs', { message: err.message });
})
app.use((req, res) => {
  res.status(404).render('404.hbs');
})

app.listen(9000, () => {
  console.log(`Sever is running at http://localhost:9000`);
})
```

**router.js路由模块**
```js
const express = require('express');

router = express.Router();

router.get(['/', '/index'], (req, res) => {
  res.render('homepage.hbs');
})

router.get('/data', (req, res, next) => {
  try {
    // 模拟一种错误情况
    throw new Error('数据库连接失败！！！');
  } catch (err) {
    // 关键点：将错误传递给下方的错误中间件
    next(err);
  }
});

module.exports = router;
```
