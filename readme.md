# fs和path 操作

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

# 第二章

- abc
- efg

# 第三章

$$x_{1}^2$$

