function _parseDate(datestring) {
    var charArray = Array.from(datestring);
    if(datestring.length != 15) {
        // console.log(datestring + " has an incorrect size.");
        return new Date();
    } else {
        var year    = charArray.slice(0, 4).join("");
        var month   = parseInt(charArray.slice(4,6).join("")) - 1;
        var day     = charArray.slice(6,8).join("");
        var hour    = charArray.slice(9,11).join("");
        var minute  = charArray.slice(11,13).join("");
        var second  = charArray.slice(13,15).join("");
        return new Date(Date.UTC(year, month, day, hour, minute, second));
    }
}

class ResultDate {
    constructor(datestring) {
        this._date = _parseDate(datestring);
    }

    getDate() {
        return this._date;
    }

    setDate(date) {
        this._date = date;
    }
}

module.exports = { ResultDate }; 