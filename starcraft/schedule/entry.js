class ScheduleEntry {
    constructor(gameNumber, round, firstTeam, secondTeam, map) {
        this._gameNumber = gameNumber;
        this._round = round;
        this._firstTeam = firstTeam;
        this._secondTeam = secondTeam;
        this._map = map;
    }
    static invalid() {
        return new this(-1, 0, "Unknown", "Unknown", 0);
    }
    getGameNumber() {
        return this._gameNumber;
    }
    setGameNumber(gameNumber) {
        this._gameNumber = gameNumber;
    }
    getRound() {
        return this._round;
    }
    setRound(round) {
        this._round = round;
    }
    getFirstTeam() {
        return this._firstTeam;
    }
    setFirstTeam(firstTeam) {
        this._firstTeam = firstTeam;
    }
    getSecondTeam() {
        return this._secondTeam;
    }
    setSecondTeam() {
        this._secondTeam = secondTeam;
    }
    getMap() {
        return this._map;
    }
    setMap(map) {
        this._map = map;
    }
    toString(index) {
        if(index.getTeams().length == 0) {
            return this._simpleToString();
        } else {
            return this._extendedToString(index);
        }
    }
    _simpleToString() {
        return "#" + this.getGameNumber() + " - " + this.getFirstTeam() + " vs " + this.getSecondTeam() + " on " + this.getMap();
    }
    _extendedToString(index) {
        var firstTeam = index.getTeam(this.getFirstTeam());
        var secondTeam = index.getTeam(this.getSecondTeam());

        return "#" + this.getGameNumber() + " - " + firstTeam.toString() + " vs " + secondTeam.toString() + " on " + this.getMap();
    }
}

module.exports = { ScheduleEntry };