(function() {
    'use strict';

    const chalk = require('chalk');
    const express = require('express');
    const app = express();

    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

    app.listen(3000, function () {
      console.log(chalk.cyan('Fake Server listening on port 3000'));
    });

})();
