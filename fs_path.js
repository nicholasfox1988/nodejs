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