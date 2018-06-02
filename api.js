var express = require('express');
var fs = require('fs');
var router = express.Router();
const { Schedule } = require('./starcraft/schedule/schedule');
const { Result } = require('./starcraft/results/result');
const { ResultEntry } = require('./starcraft/results/entry');
const { Index } = require('./starcraft/overview/index');

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
const RESULTS_LOCATION = "files/starcraft/results.html";
const SCHEDULE_LOCATION = "files/starcraft_schedule.txt";
const INDEX_LOCATION = "files/starcraft/index.html";

var schedule;
new Schedule(SCHEDULE_LOCATION).then((s) => {
    schedule = s;
});

var results;
new Result(RESULTS_LOCATION).then((r) => {
    results = r; 
});

var index;
new Index(INDEX_LOCATION).then((i) => {
    index = i;
});

setInterval(() => {
    fs.access(RESULTS_LOCATION, fs.constants.F_OK, (err) => {
        new Index(INDEX_LOCATION).then((i) => {
            index = i;
        });
        new Result(RESULTS_LOCATION).then((r) => {
            results = r;
            if(results.getCurrentGameNumber() < schedule.getAmountOfGames()) {
                schedule.setCurrentGameNumber(results.getCurrentGameNumber());
            } else {
                schedule.setCurrentGameNumber(-1);
            }
        });
    });

}, 5000);

fs.access(SCHEDULE_LOCATION, fs.constants.F_OK, (err) => {
    if(!err) {
        fs.readFile(SCHEDULE_LOCATION, (fileErr, data) => {
            scheduleContents = data.toString();
        });
    }
});


/**
 * Adds a route for the current game number.
 */
router.get('/starcraft/current_game', function(req, res) {
    var game = schedule.getCurrentGame();
    
    if(game.getGameNumber() == -1) {
        res.send("There is no game right now.");
    } else {
        res.send("Current game: " + game.toString(index)); 
    }
}); 

router.get('/starcraft/current_game_detailed', function(req, res) {
    var game = schedule.getCurrentGame();

    var firstTeam = index.getTeam(game.getFirstTeam());
    var secondTeam = index.getTeam(game.getSecondTeam());

    var response = {
        'gamenumber': game.getGameNumber(),
        'team1': {
            'name': firstTeam.getName(),
            'race': firstTeam.getRace(),
            'winrate': firstTeam.getWinrate()
        },
        'team2': {
            'name': secondTeam.getName(),
            'race': secondTeam.getRace(),
            'winrate': secondTeam.getWinrate()
        }
    };

    res.send(response);
});

router.get('/starcraft/get_previous_games', function(req, res) {
    var history_length = 5;
    var gameStart = schedule.getCurrentGameNumber() - history_length;

    var games = [];

    for(var i = 0; i < history_length; i++) {
        games.push(results.getGameResult(gameStart + i));
    }

    if(games[0] == null) {
        for(var i in games) {
            games[i] = ResultEntry.invalid();
        }
    }
    var response = [];
    for(var i in games) {
        var g = games[i];
        response.push(
            {
                'game': g.getGame(),
                'winner': g.getWinner(),
                'winnerScore': g.getWinnerScore(),
                'loser': g.getLoser(),
                'loserScore': g.getLoserScore(),
                'replay': g.getReplay(),
                'map': g.getMap(),
                'duration': g.getDuration() 
            }
        );
    }

    res.send(response);
})

/**
 * Adds a route for team specific next game.
 */
router.get('/starcraft/next/:team([a-zA-Z0-9]+)', function(req, res) {
    if(req.params.team == "null") {
        res.redirect('/api/starcraft/next');
    } else {
        var game = schedule.getNextGameOf(req.params.team);
        if(game.getGameNumber() == -1) {
            res.send("There is no next game for " + req.params.team + ".");
        } else {
            res.send("Next " + req.params.team + " game in about " + schedule.timeBetweenGames(index, schedule.getCurrentGameNumber(), game.getGameNumber()) + ": " + game.toString(index) + ". Currently at game #" + schedule.getCurrentGameNumber()); 
        }
    }
})

/**
 * Adds a route for generic next game
 */
router.get('/starcraft/next', function(req, res) {
    var game = schedule.getNextGame();
    if(game.getGameNumber() == -1) {
        res.send("There is no next game.");
    } else {
        res.send(game.toString(index)); 
    }
})

router.get('/starcraft/eta/:team([a-zA-Z0-9]+)', function(req, res) {
    if(req.params.team == "null") {
        res.send("Please provide a team name.");
    } else {
        var game = schedule.getNextGameOf(req.params.team);
        if(game.getGameNumber() == -1) {
            res.send("No information about " + req.params.team);
        } else {
            res.send(schedule.timeBetweenGames(index, schedule.getCurrentGameNumber(), game.getGameNumber()));
        }
    }
});

module.exports = router;
