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