const { Team } = require('../team/team');
const fileUtils = require('../../utils/fileUtils');
const cheerio = require('cheerio');

const cheerioSettings = {
    normalizeWhitespace: true
};

function _readIndex(filePath, callback) {
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

// unfortunate name
function _colourToRace(colour) {
    switch(colour) {
        case "#c27ba0":
            return "zerg";
        case "#f1c232":
            return "protoss";
        case "#6fa8dc":
            return "terran";
        default:
            return "unknown";
    }
}

var avgTime = "0:00";

function _parseTeams(data) {
    var teams = [];

    if(data != null && data != undefined && data != "") {
        var jQuery = cheerio.load(data, cheerioSettings);

        avgTime = jQuery("table:nth-of-type(2) > tfoot > tr > td:nth-of-type(6)").text();

        var row = jQuery("table:nth-of-type(2) > tbody > tr");
        for(var i = 0; i < row.length; i++) {
            var c = cheerio.load(row[i], cheerioSettings).text().split("\n");
            var colour = cheerio.load(row[i], cheerioSettings)("td").attr("bgcolor");

            teams.push(new Team(
                c[1].trim(),
                _colourToRace(colour.trim()),
                c[2].trim(),
                c[3].trim(),
                c[4].trim(),
                c[5].trim(),
                c[6].trim(),
                c[7].trim(),
                c[8].trim(),
                c[9].trim()
            ));
        }
    }
    return teams;
}

class Index {

    constructor(filePath) {
        this._teams = [];

        return new Promise((resolve, rejecct) => {
            _readIndex(filePath, (data) => {
                this._teams = _parseTeams(data);
                this._avgTime = avgTime;
                resolve(this);
            });
        });
    }

    getTeams() {
        return this._teams;
    }

    getAvgTime() {
        return this._avgTime;
    }

    getTeam(name) {
        name = name + "";
        for(var i in this._teams) {
            var team = this._teams[i];
            if(team.getName().toUpperCase() == name.toUpperCase()) {
                return team;
            }
        }
        return Team.invalid();
    }

}

module.exports = { Index };