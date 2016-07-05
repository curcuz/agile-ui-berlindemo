(function() {
    'use strict';

    const influx = require('influx');
    const client = influx({
      hosts: 'http://127.0.0.1',
      port: 8083
      username: 'root',
      password: 'root'
     })

     client.createDatabase("TIsensortag", function(err, result) {
       if (err) {
         console.error("TIsensortag influx db creation failed: ",err);
       } else {
         console.log("TIsensortag influx db created");
       }
     } );

    setInterval(function functionName() {
        console.log("keepalive");
    }, 60000);

})();
