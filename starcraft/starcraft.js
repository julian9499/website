var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
const { Schedule } = require("./schedule/schedule");
const { Result } = require("./results/result");

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
        var content = "<head><style>@font-face { font-family: \"Comic Sans WF\"; src: url(\"/assets/comic_sans.ttf\") format(\"truetype\"); } body { text-align: center; } a { font-size: 80px; font-family: \"Comic Sans WF\", \"Comic Sans MS\", \"Comic Sans\" }; </style></head>";
        for(var i in fileArray) {
            var fileName = fileArray[i];
            if(fileName.charAt(0) != '.') {
                content += "<a href='/starcraft/" + fileName + "/'>" + fileName.replace('_round', 'Tournament ') +"</a><br />";
            }
        }
        res.send(content);
    }
});

router.get('*', (req, res) => {    
    var path = (dirPath + req.path).replace('/replays', '');
    fs.access(path, fs.constants.F_OK, (err) => {
        if(!err) {
            res.sendFile(path, {dotfiles: 'deny'});
        } else {
            res.sendStatus(204);
        }
    });
});


module.exports = router;
