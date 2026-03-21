# nodejs学习

fs.writeFile()  只会覆盖原来的内容。
```javascript
const fs = require('fs');

fs.readFile('README.md','utf-8',function(err,data){
    if(!err){
        var newData = data + '追加的内容';
        fs.writeFile('./README.md',newData,function(err){
            if(!err){
                console.log('追加成功！');                
            }
        })
    }
})
```
---

<span style="color:yellow">im.mjs导入模块ex.mjs</span>

**ex.mjs**
```javascript
const val = 'ex data';

export {val};
```
**im.mjs**
```javascript
import {val} from './ex.mjs'

console.log(val);
```

<span style="color:yellow">package.json 中增加 {"type":"module"}这个项就可以直接运行ES6代码了，不用改成 .mjs</span>

---

<span style="color:yellow">m2.js导入m1.js的val</span>

**m1.js**
```javascript
const val = 'm1 data';

module.exports = val;
```

**m2.js**
```javascript
const { log } = require('node:console');
const val = require('./m1.js');

log(val);
```
---

开发网站的快速脚手架：
> npm init vite@latest
---

创建自己的脚手架：

创建一个工程目录，在这个目录下创建一个bin文件夹

bin文件夹里面创建一个cli.js代码如下：
```javascript
#! /usr/bin/env node

console.log('mycli');
```

> npm init
然后在name里面输入自定义脚本运行名 xxx

> npm link
将这个自定义脚本连接全局，使之全局调用

