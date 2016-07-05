(function() {
    'use strict';

    const influx = require('influx');
    const client = influx({
      hosts: 'http://127.0.0.1',
      port: 8083
      username: 'root',
      password: 'root',
      database: '_internal'
     })

    setInterval(function functionName() {
        console.log("keepalive");
    }, 60000);

})();
