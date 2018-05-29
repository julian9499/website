var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var isRunning = false;
var fileArray = [];

var dirPath = path.join(__dirname, '../files/starcraft');
setInterval(function() {
    fs.access(dirPath + '/index.html', fs.constants.F_OK, (err) => {
        if(!err) {
            isRunning = true;
        }
        if(err) {
            fs.readdir(dirPath, (err, files) => {
                fileArray = files;
            });
            isRunning = false;
        }
    })
}, 5000);

router.get('/', function(req, res) {
    if(isRunning) {
        res.sendFile(dirPath + '/index.html');
    } else {
        var content = "";
        for(var i in fileArray) {
            var fileName = fileArray[i];
            if(fileName.charAt(0) != '.') {
                content += "<a href='" + fileName + "/'>" + fileName +"</a><br />";
            }
        }
        res.send(content);
    }
});

router.get('*', (req, res) => {    
    var path = (dirPath + req.path).replace('/replays', '');
    fs.access(path, fs.constants.F_OK, (err) => {
        if(!err) {
            res.sendFile(path);
        } else {
            res.sendStatus(204);
        }
    });
});


module.exports = router;