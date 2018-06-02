module.exports = {

    formatSecondsToDate: (seconds) => {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds - (h * 3600)) / 60);
        // var s = Math.floor(seconds - (h * 3600) - (m * 60));
        return [h, m].map((x, i) => x.toString().padStart(2, "0") + "hm"[i]).join("");
    }

}