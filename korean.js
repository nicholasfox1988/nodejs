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