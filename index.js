(function() {
    'use strict';

    const influx = require('influx');
    const client = influx({
      hosts: 'http://127.0.0.1',
      port: 8083
      username: 'dbuser',
      password: 'f4ncyp4ass',
      database: 'my_database'
     })

    setInterval(function functionName() {
        console.log("keepalive");
    }, 60000);

})();
