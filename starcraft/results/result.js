const parse5 = require('parse5');
const fileUtils = require('../../utils/fileUtils');
const { ResultEntry } = require('./entry');

function _parseResults(filePath, callback) {
    fileUtils.doesFileExist(filePath, (exits) => {
        if(exits) {
            fileUtils.readFile(filePath, (data) => {
                var data = data.replace(/\r?\n|\r/g, "");
                var results = parse5.parse(data).childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes;
                callback(results);
            })
        } else {
            console.log(filePath + " is not available");
        }
    });
}

function _parseRoundColumn(string) {
    var index = string.indexOf("/");      
    var game = string.substring(index,string.length).replace(/\/ /, '').replace(/^0+(?=\d)/g, '');
    var round = string.substring(0, index-1);
    return [round, game];
}

function _checkIfExists(value) {
    if(value == null || typeof value == "undefined") {
        return false;
    } else {
        return true;
    }
}

function _pushToArray(array, round, game, replay, winner, loser, map, duration, winnerScore, loserScore, wlmax, w55, w1000, w10000, l55, l1000, l10000, winaddr, loseaddr, start, finish) {
    array.push(new ResultEntry( round, game, replay, 
        winner, loser, 
        map, duration, 
        winnerScore, loserScore, wlmax, 
        w55, w1000, w10000, 
        l55, l1000, l10000, 
        winaddr, loseaddr, 
        start, finish)
    );        
}

class Result {
    constructor(filePath) {

        this._results = [];

        try {
            return new Promise((resolve, reject) => {
                _parseResults(filePath, (rawResults) => {
                    row: for(var i in rawResults) {
                        var round = 0;
                        var game = -1;
                        var replay = "";
                        var winner = 0;
                        var loser = 0;
                        var map = "";
                        var duration = "0";
                        var winnerScore = 0;
                        var loserScore = 0;
                        var wlmax = 0; 
                        var w55 = 0;
                        var w1000 = 0; 
                        var w10000 = 0;
                        var l55 = 0;
                        var l1000 = 0;
                        var l10000 = 0;
                        var winaddr = 0;
                        var loseaddr = 0;
                        var start = 0;
                        var finish = 0;
                        
                        var row = rawResults[i].childNodes;
                        for(var j in row) {
                            var column = row[j]
                            if(column.nodeName == 'td') {
                                var cell = column.childNodes[0];
                                if(!_checkIfExists(cell)) {
                                    continue;
                                }
                                switch(parseInt(j)) {
                                    case 0:
                                        //Round and game
                                        var roundAndGame = _parseRoundColumn(cell.value);
                                        round = roundAndGame[0];
                                        game = roundAndGame[1];
                                        break;
                                    case 1:
                                        // Winner and replay link
                                        if(cell.childNodes == undefined) {
                                            winner = cell.value;
                                        } else {
                                            winner = cell.childNodes[0].value;
                                            replay = cell.attrs[0].value;
                                        }
                                        break;
                                    case 2:
                                        // Loser
                                        if(cell.childNodes == undefined) {
                                            loser = cell.value;
                                        } else {
                                            loser = cell.childNodes[0].value;
                                        }
                                        break;
                                    case 5:
                                        map = cell.value;
                                        break;
                                    case 6:
                                        duration = cell.value;
                                        break;
                                    case 7:
                                        winnerScore = cell.value;
                                        break;
                                    case 8:
                                        loserScore = cell.value;
                                        break;
                                    case 9:
                                        wlmax = cell.value;
                                        break;
                                    case 10:
                                        w55 = cell.value;
                                        break;
                                    case 11:
                                        w1000 = cell.value;
                                        break;
                                    case 12:
                                        w10000 = cell.value;
                                        break;
                                    case 13:
                                        l55 = cell.value;
                                        break;
                                    case 14:
                                        l1000 = cell.value;
                                        break;
                                    case 15:
                                        l10000 = cell.value;
                                        break;
                                    case 16:
                                        winaddr = cell.value.substring(1, cell.value.length);
                                        break;
                                    case 17:
                                        loseaddr = cell.value.substring(1, cell.value.length);
                                        break;
                                    case 18:
                                        if(cell.value.substring(0,1) == "2") {
                                            start = cell.value;
                                        } else {
                                            start = 0;
                                            finish = 0;
                                            _pushToArray(this._results, round, game, replay, winner, loser, map, duration, winnerScore, loserScore, wlmax, w55, w1000, w10000, l55, l1000, l10000, winaddr, loseaddr, start, finish);
                                            continue row;
                                        }
                                        break;
                                    case 19:
                                        if(cell.value.substring(0,1) == "2") {
                                            finish = cell.value;
                                        } else {
                                            start = 0;
                                            finish = 0;
                                            _pushToArray(this._results, round, game, replay, winner, loser, map, duration, winnerScore, loserScore, wlmax, w55, w1000, w10000, l55, l1000, l10000, winaddr, loseaddr, start, finish);
                                            continue row;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }

                        _pushToArray(this._results, round, game, replay, 
                                        winner, loser, 
                                        map, duration, 
                                        winnerScore, loserScore, wlmax, 
                                        w55, w1000, w10000, 
                                        l55, l1000, l10000, 
                                        winaddr, loseaddr, 
                                        start, finish);
                    } 
                resolve(this); 
                }) 
            })
        } catch (e) {
            this._results = [];
            console.log("Something went wrong with the result parsing:" + e);
            return new Promise((resolve, reject) => {resolve(this)});
        }
    }

    getResults() {
        return this._results;
    }
}

module.exports = { Result };