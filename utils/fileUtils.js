const fs = require('fs');

module.exports = {
    createReadStream: (path) => {
        return fs.createReadStream(path);
    },

    doesFileExist: (path, callback) => {
        fs.access(path, fs.constants.F_OK, (err) => {
            if(!err) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
};