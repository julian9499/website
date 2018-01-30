module.exports = {
    getDropouts: function() {
        // Starting variables
        var amount_of_days = 292;
        var amount_of_students_on_day_1 = 433;
        var target_percentage_that_drops_out = 0.50;
        var starting_date = new Date("2017-09-04");

        // Makes sure that the ratio reaches 1 at the end of the first year
        var scaling_factor = 200;

        // Current date
        var now = new Date();

        // Get the amount of days since starting_date
        var current_day_in_year = Math.round(Math.abs((now.getTime() - starting_date.getTime())/(86400000)));

        // Get the ratio of dropouts based on the current day in the year
        var dropped_out_ratio = Math.log(current_day_in_year + 1) / (2 * Math.log(scaling_factor));

        // If we are past the first half of the year, add an increase for The Februari Purge
        if(current_day_in_year > (amount_of_days/2)) {
            dropped_out_ratio = dropped_out_ratio + (Math.log(current_day_in_year + 1 - (amount_of_days/2))) / (2*Math.log(scaling_factor));
        }

        // Get the current dropped out ratio
        dropped_out_ratio = dropped_out_ratio * target_percentage_that_drops_out;

        // Get the current amount of dropouts
        var dropped_out = (dropped_out_ratio * amount_of_students_on_day_1).toFixed(2);

        return dropped_out;
    }
}