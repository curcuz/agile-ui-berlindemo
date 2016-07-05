(function() {
    'use strict';

    const influx = require('influx');
    const client = influx({
      hosts: 'http://127.0.0.1',
      port: 8086
      username: 'dbuser',
      password: 'root',
      database: 'root'
     })

    setInterval(function functionName() {
        console.log("keepalive");
    }, 60000);

})();
