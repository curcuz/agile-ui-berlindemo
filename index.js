(function() {
    'use strict';

    const chalk = require('chalk');
    const influx = require('influx');
    const client = influx({
      host: 'http://127.0.0.1',
      port: 8086,
      username: 'root',
      password: 'root'
     })

     client.createDatabase("TIsensortag", function(err, result) {
       if (err) {
         console.log(chalk.red("TIsensortag influx db creation failed: ",err));
       } else {
         console.log(chalk.cyan("TIsensortag influx db created"));
       }
     } );

    setInterval(function keepalive() {
        console.log("keepalive");
    }, 60000);

})();
