var express = require('express');
var router = express.Router();

var dropout = require('./dropout/dropout');
router.get('/dropouts', function(req, res) {
    res.send(dropout.getDropouts() + "");
});

var active_clients = {};
var bingo = require('./bingo/bingo');
router.post('/alive', function(req, res) {
    var id = req.body.id;
    if(typeof id != "undefined" && typeof id == "string") {
        active_clients[id] = Math.round((new Date()).getTime() / 1000) + 6;
        res.send("OK");
    } else {
        res.send("No.");
    }
});

router.get('/active_clients', function(req, res) {
    res.send(Object.keys(active_clients).length + "");
});

setInterval(function() {
    for(var client in active_clients) {
        if(active_clients[client] < Math.round((new Date()).getTime() / 1000)) {
            delete active_clients[client];
        } 
    }
}, 5000);

module.exports = router;