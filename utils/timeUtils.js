module.exports = {

    formatSecondsToDate: (seconds) => {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds - (h * 3600)) / 60);
        if(h != 0) {
            return [h, m].map((x, i) => x.toString().padStart(2, "0") + "hm"[i]).join("");
        } else {
            return m + "m";
        }
    }

}