(function() {
    'use strict';

    const chalk = require('chalk');
    const influx = require('influx');
    const client = influx({
      host: 'localhost',
      port: 8086,
      protocol : 'http',
      username: 'root',
      password: 'root',
      database : '_internal'
     })

     client.createDatabase("tisensortag", function(err, result) {
       if (err) {
         console.log(chalk.red("tisensortag influx db creation failed: ",err));
       } else {
         console.log(chalk.cyan("tisensortag influx db created"));
       }
     });

     client.createDatabase("gebulb", function(err, result) {
       if (err) {
         console.log(chalk.red("gebulb influx db creation failed: ",err));
       } else {
         console.log(chalk.cyan("gebulb influx db created"));
       }
     });

    setInterval(function keepalive() {
        console.log("keepalive");
    }, 60000);

})();
