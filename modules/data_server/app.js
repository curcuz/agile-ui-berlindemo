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
    const express = require('express');
    const app = express();
    const bodyParser = require("body-parser");

    let serverPort = process.env.DATA_SERVER_PORT || 3000;
    function errorHandler(err, req, res, next) {
      res.status(500);
      res.render('error', { error: err });
    }

    app.use(bodyParser.json());
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use(errorHandler);

    // list buckets
    app.get('/buckets', function(req, res) {
      res.status(200).send();
    });

    // create a bucket
    app.post('/buckets', function(req, res) {
      res.status(200).send();
    });

    // delete a bucket
    app.delete('/buckets/:bucketsId', function(req, res) {
      res.status(200).send();
    });

    // purge a bucket
    app.put('/buckets/:bucketsId', function(req, res) {
      res.status(200).send();
    });

    // get bucket details
    app.get('/buckets/:bucketsId', function(req, res) {
      res.status(200).send();
    });

    // write data into a bucket
    app.put('/buckets/:bucketsId/data', function(req, res) {
      res.status(200).send();
    });

    // read data from bucket
    app.get('/buckets/:bucketsId/data/:limit', function(req, res) {
      res.status(200).send();
    });

/*
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
*/

    app.listen(serverPort, function() {
      console.log(chalk.cyan('Data Server listening on port '+serverPort));
    });

})();
