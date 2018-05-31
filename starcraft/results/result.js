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

class Result {
    constructor(filePath) {

        this._results = [];

        return new Promise((resolve, reject) => {
            _parseResults(filePath, (rawResults) => {
                for(var i in rawResults) {
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
                            switch(parseInt(j)) {
                                case 0:
                                    var roundAndGame = _parseRoundColumn(column.childNodes[0].value);
                                    round = roundAndGame[0];
                                    game = roundAndGame[1];
                                    break;
                                case 1:
                                    break;
                                default:
                                    break;
                            }
                        }
                    }

                    this._results.push(new ResultEntry( round, game, replay, 
                                                        winner, loser, 
                                                        map, duration, 
                                                        winnerScore, loserScore, wlmax, 
                                                        w55, w1000, w10000, 
                                                        l55, l1000, l10000, 
                                                        winaddr, loseaddr, 
                                                        start, finish)
                    );                    

                }
                resolve(this);
            })
        })
    }

    getResults() {
        return this._results;
    }
}

module.exports = { Result };