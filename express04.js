const express = require('express');
const app = express();
const router = require('./router01');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.listen(9000, () => {
    console.log(`express server running at http://127.0.0.1:9000`);
})