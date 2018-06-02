const { ScheduleEntry } = require('./entry');
const fileUtils = require('../../utils/fileUtils');
const timeUtils = require('../../utils/timeUtils');
const readline = require('readline'); 


function _parseFile(fileLocation, callback) {
    // Check if the file exists.
    fileUtils.doesFileExist(fileLocation, (result) => {
        if(result) {
            // If it does exist, create an input stream.
            var lineReader = readline.createInterface({
                input: fileUtils.createReadStream(fileLocation)
            });

            // Set up variables for regex execution.
            var entryList = [];
            var regex = /(?:\s*)(\d+)(?:\s*)(\d+)(?:\s*)([a-zA-Z0-9]+)(?:\s*)([a-zA-Z0-9]+)(?:\s*)([a-zA-Z0-9().]+)/;

            // Parse the regex for every line.
            lineReader.on('line', (line) => {
                var regexExecution = regex.exec(line);
                var gameNumber = regexExecution[1];
                var digit = regexExecution[2];
                var firstTeam = regexExecution[3];
                var secondTeam = regexExecution[4];
                var map = /([A-Za-z0-9]+)(?=\.)/.exec(regexExecution[5])[0];
                
                // Push it to the array.
                entryList.push(new ScheduleEntry(gameNumber, digit, firstTeam, secondTeam, map)); 
            });

            lineReader.on('close', () => {
                // When the read stream has closed, callback with the created array.
                callback(entryList);
            })
        } else {
            // If the file does not exist, notify via console and return an empty array.
            console.log(fileLocation + " does not exist. Schedule can not be parsed");
            callback([]);
        }
    });
}

class Schedule {
    constructor(fileLocation) {
        // Set the current game number equal to -1.
        this._currentgame = -1;

        // Parse the file and assign the results to _gameList. It uses promises to ensure
        // that the file is parsed before using anything of this class.
        // Usage: new Schedule(path).then((schedule) => {});
        return new Promise((resolve, reject) => {
            _parseFile(fileLocation, (list) => {
                this._gameList = list;
                resolve(this);
            });
        })
    }        

    getList() {
        return this._gameList;
    }

    getAmountOfGames() {
        return this._gameList.length-1;
    }

    getCurrentGameNumber() {
        return this._currentgame;
    }

    setCurrentGameNumber(gamenumber) {
        this._currentgame = gamenumber;
    }

    getGame(number) {
        if(number < this._gameList.length-1) {
            return this._gameList[number];
        } else {
            return ScheduleEntry.invalid();
        }
    }

    // Check if the tournament of this schedule is active.
    isActive() {
        if(this._currentgame < 0) {
            return false;
        } else {
            return true;
        }
    }

    getCurrentGame() {
        if(this.isActive()) {
            return this._gameList[this._currentgame];
        } else {
            return ScheduleEntry.invalid();
        }
    }

    // Gets the next game on the schedule.
    getNextGame() {
        if(this.isActive()) {
            var nextGameNumber = this._currentgame+1;
            if(nextGameNumber < this._gameList.length) {
                return this._gameList[this._currentgame+1];
            }
        }
                
        // If the match is not active or there are no games left, return an invalid ScheduleEntry.
        return ScheduleEntry.invalid();
    }

    // Gets the ScheduleEntry of a teams next match.
    getNextGameOf(team) {
        var team = team.toLowerCase();
        if(this.isActive()) {
            for(var i in this._gameList) {
                var entry = this._gameList[i];
                if(entry.getGameNumber() > this._currentgame) {
                    if(team == entry.getFirstTeam().toLowerCase() || team == entry.getSecondTeam().toLowerCase()) {
                        return entry;
                    }
                }
            }
        }
        // If the match is not active or there are no games left, return an invalid ScheduleEntry.
        return ScheduleEntry.invalid();
    }

    timeBetweenGames(index, gamenumber1, gamenumber2) {
        // Index is not yet available
        if(typeof(index) == "undefined" || index.getTeams().length == 0) {
            return 0;
        }

        // If they are the same game, there is no time in between
        if(gamenumber1 == gamenumber2) {
            return 0;
        }
        // Make sure the firstGame is always the first game in order
        if(gamenumber1 > gamenumber2) {
            var temp = gamenumber2;
            gamenumber2 = gamenumber1;
            gamenumber1 = gamenumber2;
        }

        var total = 0;

        for(var i = gamenumber1; i < gamenumber2; i++) {
            var game = this.getGame(i);
            var firstTeam = index.getTeam(game.getFirstTeam());
            var secondTeam = index.getTeam(game.getSecondTeam());            

            if(firstTeam.getAvgTime() == 0) {
               firstTeam.setAvgTime(index.getAvgTime());
            }

            if(secondTeam.getAvgTime() == 0) {
               secondTeam.setAvgTime(index.getAvgTime());
            }


            total += (firstTeam.getAvgTime() + secondTeam.getAvgTime())/2;

        }

        var time_dilation = 0.3533;
        return timeUtils.formatSecondsToDate(total * time_dilation);

    }
}

module.exports = { Schedule };