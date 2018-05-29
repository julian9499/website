var express = require('express');
var fs = require('fs');
var router = express.Router();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var dropout = require('./dropout/dropout');
router.get('/dropouts', function(req, res) {
    res.send(dropout.getDropouts() + "");
});


/* BINGO CURRENT PLAYERS*/
// var active_clients = {};
// var bingo = require('./bingo/bingo');
// router.post('/alive', function(req, res) {
//     var id = req.body.id;
//     if(typeof id != "undefined" && typeof id == "string") {
//         active_clients[id] = Math.round((new Date()).getTime() / 1000) + 6;
//         res.send("OK");
//     } else {
//         res.send("No.");
//     }
// });

// router.get('/active_clients', function(req, res) {
//     res.send(Object.keys(active_clients).length + "");
// });

// setInterval(function() {
//     for(var client in active_clients) {
//         if(active_clients[client] < Math.round((new Date()).getTime() / 1000)) {
//             delete active_clients[client];
//         } 
//     }
// }, 5000);


/* Starcraft current game*/
var game_number = -1;
var scheduleContents = "";
const LOCATION_OF_GAME_NUMBER = "body > table > tbody > tr:last-child > td";
const RESULTS_LOCATION = "files/starcraft/results.html";
const SCHEDULE_LOCATION = "files/starcraft_schedule.txt";

setInterval(() => {
    fs.access(RESULTS_LOCATION, fs.constants.F_OK, (err) => {
        if(!err) {
            JSDOM.fromFile(RESULTS_LOCATION, { includeNodeLocations: true }).then(dom => {
                var innerText = dom.window.document.querySelector(LOCATION_OF_GAME_NUMBER).innerHTML;
                game_number = parseInt(parseGameNumber(innerText))+1;
            }).catch((error) => {
                console.log(error);
            });
        }
        if(err) {
            game_number = -1;
        }
    });

}, 5000);

fs.access(SCHEDULE_LOCATION, fs.constants.F_OK, (err) => {
    if(!err) {
        fs.readFile(SCHEDULE_LOCATION, (fileErr, data) => {
            scheduleContents = data.toString();
        });
    }
});


router.get('/starcraft/current_game', function(req, res) {
        res.send(game_number.toString());
}); 

router.get('/starcraft/next/:team([a-zA-Z0-9]+)', function(req, res) {
    var regex = "(\\d)+(?=\\s+\\d+\\s+([a-zA-Z0-9]+\\s+)?" + req.params.team + ")";
    var re = new RegExp(regex, "gi");
    foundMatches = scheduleContents.match(re);
    var found = false;
    for(var i in foundMatches) {
        var nextGame = foundMatches[i];
        if(nextGame > game_number) {
            res.send("Next game for " + req.params.team + " is game #" + nextGame);
            var found = true;
            break;
        }
    }
    if(!found) {
        res.send("There is no next game for " + req.params.team);
    }
    
})

function parseGameNumber(string) {
        var index = string.indexOf("/");      
        return string.substring(index,string.length).replace(/\/ /, '').replace(/^0+(?=\d)/g, '');
}

module.exports = router;