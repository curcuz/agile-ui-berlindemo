(function() {
    'use strict';

    const chalk = require('chalk');
    const influx = require('influx');
    const client = influx({
        host: 'localhost',
        port: 8086,
        protocol: 'http',
        username: 'root',
        password: 'root',
        database: '_internal'
    });

    client.createDatabase("tisensortag", function(err, result) {
        if (err) {
            console.log(chalk.red("tisensortag influx db creation failed: ", err));
        } else {
            console.log(chalk.cyan("tisensortag influx db created"));
        }
    });

    client.createDatabase("gebulb", function(err, result) {
        if (err) {
            console.log(chalk.red("gebulb influx db creation failed: ", err));
        } else {
            console.log(chalk.cyan("gebulb influx db created"));
        }
    });

    //fake data: write a single point, providing an integer timestamp and time precision 's' for seconds
    client.writePoint(tisensortag.series.humidity, {time: new Date(), value: 232}, null, function done() {
      console.log(chalk.yellow('faking humidity sensortag data entry'));
    })

    setInterval(function keepalive() {
        console.log("keepalive");
    }, 60000);

})();
