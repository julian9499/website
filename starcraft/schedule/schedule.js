const { ScheduleEntry } = require('./entry');
const fileUtils = require('../../utils/fileUtils');
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
                var map = regexExecution[5];
                
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
        // Set the current game number equal to zero.
        this._currentgame = 0;

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

    getCurrentGame() {
        return this._currentgame;
    }

    setCurrentGame(gamenumber) {
        this._currentgame = gamenumber;
    }

    isActive() {
        if(this._currentgame < 0) {
            return false;
        } else {
            return true;
        }
    }

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
        return new ScheduleEntry(-1, 0, 0, 0, 0);
    }

}

module.exports = { Schedule };