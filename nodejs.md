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

package.json 中增加 {"type":"module"}这个项就可以直接运行ES6代码了，不用改成 .mjs

---

