(function() {
    'use strict';

    const chalk = require('chalk');
    const express = require('express');
    const compression = require('compression');
    const serveStatic = require('serve-static');

    const app = express();

    let serverPort = process.env.AGILE_CLIENT_PORT || 1337;

    app.use(compression());
    app.use(serveStatic(__dirname + '/public', {
        'index': ['index.html']
    }));

    app.listen(serverPort, function() {
      console.log(chalk.cyan('Agile Client listening on port '+serverPort));
    });

})();
