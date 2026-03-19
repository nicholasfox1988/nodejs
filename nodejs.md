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
---

