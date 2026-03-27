const express = require('express');
const app = express();
const qs = require('querystring');

app.use((req, res, next) => {
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    })
    req.on('end', () => {
        console.log(str);
        const body = qs.parse(str);
        console.log(body);
    })
})

app.listen(9000, () => {
    console.log(`express server running at http://127.0.0.1:9000`);
})