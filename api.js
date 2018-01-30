var express = require('express');
var router = express.Router();

var dropout = require('./dropout/dropout');

router.get('/dropouts', function(req, res) {
    res.send(dropout.getDropouts() + "");
});

module.exports = router;