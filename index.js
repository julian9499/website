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
    var amount_of_students_on_day_1 = 433;
    var percentage_that_drops_out = 0.50;

    var scaling_factor = 200;

    var now = new Date();
    var starting_date = new Date("2017-09-04");

    var current_day_in_year = Math.round(Math.abs((now.getTime() - starting_date.getTime())/(86400000)));

    var dropped_out_ratio = Math.log(current_day_in_year + 1) / (2 * Math.log(scaling_factor));

    if(current_day_in_year > (amount_of_days/2)) {
        dropped_out_ratio = dropped_out_ratio + (Math.log(current_day_in_year + 1 - (amount_of_days/2))) / (2*Math.log(scaling_factor));
    }

    dropped_out_ratio = dropped_out_ratio / 2;

    var dropped_out = (dropped_out_ratio * amount_of_students_on_day_1).toFixed(2);

    res.marko(dropout, {
        dropouts: dropped_out
    });
});

app.all('*', function(req, res) {
    res.status(204).send('No content.');
})

app.listen(6381, () => console.log('Dropout app listening on port 6381!'))

