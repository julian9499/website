const parse5 = require('parse5');
const fileUtils = require('../../utils/fileUtils');

function _parseResults(filePath) {
    fileUtils.doesFileExist(filePath, (exits) => {
        if(exits) {
            fileUtils.readFile(filePath, (data) => {
                console.log(data);
            })
        } else {
            console.log(filePath + " is not available");
        }
    });
}

class Result {
    constructor(filePath) {
        _parseResults(filePath);
    }
}

module.exports = { Result };