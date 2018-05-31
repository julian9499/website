class ResultEntry {
    constructor(round, game, replay, winner, loser, map, duration, winnerScore, loserScore, wlmax, w55, w1000, w10000, l55, l1000, l10000, winaddr, loseaddr, start, finish) {
        this._round = round;
        this._game = game;
        this._replay = replay;
        this._winner = winner;
        this._loser = loser;
        this._map = map;
        this._duration = duration;
        this._winnerScore = winnerScore;
        this._loserScore = loserScore;
        this._wlmax = wlmax;
        this._w55 = w55;
        this._w1000 = w1000;
        this._w10000 = w10000;
        this._l55 = l55;
        this._l1000 = l1000;
        this._l10000 = l10000;
        this._winaddr = winaddr;
        this._loseaddr = loseaddr;
        this._start = start;
        this._finish = finish;
    }

    getRound() {
        return this._round;
    }

    setRound(round) {
        this._round = round;
    }

    getGame() {
        return this._game;
    }

    setGame(game) {
        this._game = game;
    }

    getWinner() {
        return this._winner;
    }
    
    setWinner(winner) {
        this._winner = winner;
    }

    getReplay() {
        return this._replay;
    }

    setReplay(replay) {
        this._replay = replay;
    }
    
    getLoser() {
        return this._loser;
    }
    
    setLoser(loser) {
        this._loser = loser;
    }
    
    getMap() {
        return this._map;
    }
    
    setMap(map) {
        this._map = map;
    }
    
    getDuration() {
        return this._duration;
    }
    
    setDuration(duration) {
        this._duration = duration;
    }
    
    getWinnerScore() {
        return this._winnerScore;
    }
    
    setWinnerScore(winnerScore) {
        this._winnerScore = winnerScore;
    }
    
    getLoserScore() {
        return this._loserScore;
    }
    
    setLoserScore(loserScore) {
        this._loserScore = loserScore;
    }
    
    getWLMawlmax() {
        return this._wlmax;
    }
    
    setWLMawlmax(wlmax) {
        this._wlmax = wlmax;
    }
    
    getW55() {
        return this._w55;
    }
    
    setW55(w55) {
        this._w55 = w55;
    }
    
    getW1000() {
        return this._w1000;
    }
    
    setW1000(w1000) {
        this._w1000 = w1000;
    }
    
    getW10000() {
        return this._w10000;
    }
    
    setW10000(w10000) {
        this._w10000 = w10000;
    }
    
    getL55() {
        return this._l55;
    }
    
    setL55(l55) {
        this._l55 = l55;
    }
    
    getL1000() {
        return this._l1000;
    }
    
    setL1000(l1000) {
        this._l1000 = l1000;
    }
    
    getL10000() {
        return this._l10000;
    }
    
    setL10000(l10000) {
        this._l10000 = l10000;
    }
    
    getWinnerAddress() {
        return this._winaddr;
    }
    
    setWinnerAddress(winaddr) {
        this._winaddr = winaddr;
    }
    
    getLoserAddress() {
        return this._loseaddr;
    }
    
    setLoserAddress(loseaddr) {
        this._loseaddr = loseaddr;
    }
    
    getStartingTime() {
        return this._start;
    }
    
    setStartingTime(start) {
        this._start = start;
    }
    
    getFinishTime() {
        return this._finish;
    }
    
    setFinishTime(finish) {
        this._finish = finish;
    }
    
}

module.exports = { ResultEntry };