const router = require('express').Router();

function testHandler(req,res){
    res.send('working ok');
}

router.get('/test',testHandler);

module.exports =router;