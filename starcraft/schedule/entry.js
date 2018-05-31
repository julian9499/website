class ScheduleEntry {
    constructor(gameNumber, digit, firstTeam, secondTeam, map) {
        this._gameNumber = gameNumber;
        this._digit = digit;
        this._firstTeam = firstTeam;
        this._secondTeam = secondTeam;
        this._map = map;
    }
    static invalid() {
        return new this(-1, 0, 0, 0, 0);
    }
    getGameNumber() {
        return this._gameNumber;
    }
    setGameNumber(gameNumber) {
        this._gameNumber = gameNumber;
    }
    getDigit() {
        return this._digit;
    }
    setDigit(digit) {
        this._digit = digit;
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
    toString() {
        return "#" + this.getGameNumber() + " - " + this.getFirstTeam() + " vs " + this.getSecondTeam() + " on map " + this.getMap();
    }
}

module.exports = { ScheduleEntry };