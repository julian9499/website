require('marko/node-require');
 
var express = require('express');
var markoExpress = require('marko/express');

var app = express();
 
var path = require('path')
app.use('/assets', express.static(path.join(__dirname, 'files/assets')))

app.use(markoExpress()); 

var api = require('./api');
app.use('/api', api);

var dropout_template = require('./files/dropout.marko');
var dropout = require('./dropout/dropout');
app.get('/dropout', function(req, res) {
    res.marko(dropout_template, {
        dropouts: dropout.getDropouts().toFixed(4)
    });
});

app.all('*', function(req, res) {
    res.status(204).send('No content.');
})

app.listen(6381, () => console.log('Dropout app listening on port 6381!'))

