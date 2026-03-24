# fs和path 操作  __dirname 拼接出该文本文件的绝对路径

**01.txt**
> 小红=100 小明=98 小黑=55

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

# 完整的html文件拆解成三个文件.html,.css,.js

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
