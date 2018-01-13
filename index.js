require('marko/node-require');
 
var express = require('express');
var markoExpress = require('marko/express');
var dropout = require('./files/dropout.marko');
 
var app = express();
 
var path = require('path')
app.use('/assets', express.static(path.join(__dirname, 'files/assets')))

app.use(markoExpress()); 

app.get('/dropout', function(req, res) {

    var amount_of_days = 292;
    var amount_of_students_on_day_1 = 450;
    var percentage_that_drops_out = 0.40;

    var students_per_day_that_drop_out = (amount_of_students_on_day_1/amount_of_days) * percentage_that_drops_out;

    var now = new Date();
    var starting_date = new Date("2017-09-04");

    var current_day_in_year = Math.round(Math.abs((now.getTime() - starting_date.getTime())/(86400000)));

    var dropped_out = Math.floor(current_day_in_year * students_per_day_that_drop_out);

    res.marko(dropout, {
        dropouts: dropped_out
    });
});

app.all('*', function(req, res) {
    res.status(204).send('No content.');
})

app.listen(6381, () => console.log('Dropout app listening on port 6381!'))

