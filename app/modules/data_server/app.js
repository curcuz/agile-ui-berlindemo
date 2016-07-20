(function() {
    'use strict';

    const chalk = require('chalk');
    const influx = require('influx');
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    var serverPort = process.env.DATA_SERVER_PORT || 3000;

    function errorHandler(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    }

    var client = influx({
        host: 'localhost',
        port: 8086,
        protocol: 'http',
        username: 'root',
        password: 'root'
    });

    app.use(bodyParser.json());
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    app.use(errorHandler);

    // list buckets
    app.get('/buckets', function(req, res) {
      client.getDatabaseNames(function(err, result) {
        if(err) return next(err);
        res.status(200).send(result);
      });
    });

    // create a bucket
    app.post('/buckets', function(req, res) {
      client.createDatabase(req.body.id, function(err, result) {
        client.createRetentionPolicy('defualt', req.body.id, '7d', 1, true, function (err, result) {
          if (err) return next(err);
          res.status(200).send(result);
        })
      });
    });

    // delete a bucket
    app.delete('/buckets/:bucketsId', function(req, res) {
      client.dropDatabase(req.params.bucketsId, function(err, result) {
        if (err) return next(err);
        res.status(200).send();
      });
    });

    // purge a bucket
    app.put('/buckets/:bucketsId', function(req, res) {
      // TODO
      res.status(200).send();
    });

    // get bucket details
    app.get('/buckets/:bucketsId', function(req, res) {
      // not sure what to return here
      res.status(200).send();
    });

    // write data into a bucket
    app.put('/buckets/:bucketsId/:streamId/data', function(req, res) {
      client.writePoint(req.params.streamId, req.body, null, {db : req.params.bucketsId}, function(err, response) {
        if (err) return next(err);
        res.status(200).send(response);
      })
    });

    // read real data from bucket
    /*
    app.get('/buckets/:bucketsId/:streamId/data/:limit', function(req, res) {
      var query = 'SELECT * FROM ' + req.params.streamId + ' LIMIT ' + req.params.limit;
      client.query([req.params.bucketsId], query, function(err, results) {
        if (err) return next(err);
        res.status(200).send(results);
      })
    });

    app.listen(serverPort, function() {
      console.log(chalk.cyan('Data Server listening on port '+serverPort));
    });
    */
    var streamArray = []
    app.get('/buckets/:bucketsId/:streamId/data/:limit', function(req, res) {
      var newDate = Date.now();
      // dateString = newDate.toUTCString();

      lastUpdate = {
        id: req.params.componentId,
        value: chance.integer({min: 0, max: 20}),
        date: newDate
      }
      streamArray.unshift(lastUpdate)
      res.status(200).send(streamArray.slice(0, req.params.limit))
    });

})();
