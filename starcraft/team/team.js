class Team {
    constructor(name, race, games, win, loss, winpercentage, avgTime, hour, crash, timeout) {
        this._name = name;
        this._race = race;
        this._games = games;
        this._win = win;
        this._loss = loss;
        this._winpercentage = winpercentage;
        this._avgTime = avgTime;
        this._hour = hour;
        this._crash = crash;
        this._timeout = timeout;
    }

    static invalid() {
        return new this("Unknown", "unknown", 0, 0, 0, 0, 0, 0, 0, 0);
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getRace() {
        return this._race;
    }

    setRace(race) {
        this._race = race;
    }

    getWinrate() {
        return this._winpercentage;
    }

    toString() {
        return this._name + " (" + this.raceToLetter() + " - " + this._win + "/" + this._games + ")"
    }

    raceToLetter() {
        return this._race.charAt(0).toUpperCase();
    }
}

module.exports = { Team };