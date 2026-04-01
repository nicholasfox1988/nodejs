const express = require('express');
const router = express.Router();

router.get('/user/list', (req, res) => {
    console.log('get');
    res.send(req.query);
})

router.post('/user/add', (req, res) => {
    console.log('post');
    res.send(req.body);
})

module.exports = router;