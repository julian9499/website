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

            var roundAndGame = _parseRoundColumn(c[1]);
            results.push(new ResultEntry(
                roundAndGame[0],
                roundAndGame[1],
                replay_link,
                c[2],
                c[3],
                c[6],
                c[7],
                c[8],
                c[9],
                c[10],
                c[11],
                c[12],
                c[13],
                c[14],
                c[15],
                c[16],
                c[17],
                c[18],
                c[19],
                c[20]
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