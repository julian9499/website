var express = require('express');
var router = express.Router();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var dropout = require('./dropout/dropout');
router.get('/dropouts', function(req, res) {
    res.send(dropout.getDropouts() + "");
});


/* BINGO CURRENT PLAYERS*/
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

/* Starcraft current game*/
const LOCATION_OF_GAME_NUMBER = "body > table > tbody > tr:nth-child(3)";
router.get('/starcraft/current_game', function(req, res) {
    JSDOM.fromFile("files/starcraft/index.html", { includeNodeLocations: true }).then(dom => {
        var innerText = dom.window.document.querySelector(LOCATION_OF_GAME_NUMBER).innerHTML;
        innerText = innerText.replace(/ /g, "").replace(/\n/, "");
        innerText = innerText.replace(/^((?!<td><center>([0-9]+\/[0-9]+)<\/center><\/td>).)*$/gimu, "");
        innerText = innerText.replace(/((?!([0-9]+\/[0-9]+)))(<\/center><\/td>)+/gimu, "").replace(/<td><center>/gimu, "").replace(/\s/gimu, "");
        var index = innerText.indexOf("/");      
        var game_number = innerText.substring(0,index);
        res.send(game_number);
    }).catch((error) => {
        console.log(error);
    });
}); 

module.exports = router;