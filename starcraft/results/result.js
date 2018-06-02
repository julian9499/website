const cheerio = require('cheerio');
const fileUtils = require('../../utils/fileUtils');
const { ResultEntry } = require('./entry');

const cheerioSettings = {
    normalizeWhitespace: true
};

function _readResults(filePath, callback) {
    fileUtils.doesFileExist(filePath, (exits) => {
        if(exits) {
            fileUtils.readFile(filePath, (data) => {
                callback(data);
            })
        } else {
            callback("");
            console.log(filePath + " is not available");
        }
    });
}

function _parseResults(data) {
    var results = [];

    if(data != null && data != undefined && data != "") {
        var jQuery = cheerio.load(data, cheerioSettings);

        var row = jQuery("table > tbody > tr");
        for(var i = 0; i < row.length; i++) {
            var c = cheerio.load(row[i], cheerioSettings).text().split("\n");
            var replay_link = cheerio.load(row[i], cheerioSettings)("td").find("a").attr("href");

            var roundAndGame = _parseRoundColumn(c[1].trim());
            results.push(new ResultEntry(
                roundAndGame[0],
                roundAndGame[1],
                replay_link,
                c[2].trim(),
                c[3].trim(),
                c[6].trim(),
                c[7].trim(),
                c[8].trim(),
                c[9].trim(),
                c[10].trim(),
                c[11].trim(),
                c[12].trim(),
                c[13].trim(),
                c[14].trim(),
                c[15].trim(),
                c[16].trim(),
                c[17].trim(),
                c[18].trim(),
                c[19].trim(),
                c[20].trim()
            ));
        }
    }
    return results;
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

        return new Promise((resolve, rejecct) => {
            _readResults(filePath, (data) => {
                this._results = _parseResults(data);
                resolve(this);
            });
        });

    }

    getCurrentGameNumber() {
        return this._results.length;
    }
}

module.exports = { Result };