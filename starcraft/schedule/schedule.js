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
        // Assign an empty array to the variable to avoid 'undefined' when the file is being parsed.
        this._gameList = [];

        // Parse the file and assign the results to _gameList.
        _parseFile(fileLocation, (list) => {
            this._gameList = list;
        });
    }

    getList() {
        return this._gameList;
    }

}

module.exports = { Schedule };