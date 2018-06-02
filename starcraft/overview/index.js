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

function _parseTeams(data) {
    var teams = [];

    if(data != null && data != undefined && data != "") {
        var jQuery = cheerio.load(data, cheerioSettings);

        var row = jQuery("table:nth-of-type(2) > tbody > tr");
        for(var i = 0; i < row.length; i++) {
            var c = cheerio.load(row[i], cheerioSettings).text().split("\n");
            var colour = cheerio.load(row[i], cheerioSettings)("td").attr("bgcolor");

            teams.push(new Team(
                c[1],
                _colourToRace(colour),
                c[2],
                c[3],
                c[4],
                c[5],
                c[6],
                c[7],
                c[8],
                c[9]
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
                resolve(this);
            });
        });
    }

    getTeams() {
        return this._teams;
    }

    getTeam(name) {
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