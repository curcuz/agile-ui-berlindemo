(function() {
    'use strict';

    const chalk = require('chalk');
    const request = require('request');
    const SensorTag = require('sensortag');
    const express = require('express');
    const app = express();
    const bodyParser = require("body-parser");
    const chance = require('chance').Chance();
    const _ = require('lodash');

    let serverPort = process.env.AGILE_SERVER_PORT || 8000;
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

    var agileDevices = [] // these are "registered devices"
    var wildDevices = require('./devices.json') // devices found by "/discovery"
    var discovery = {
      on: false,
      protocols: [
        {
          "name": "BLE",
          "status": "RUNNING"
        },
        {
          "name": "ZigBee",
          "status": "NONE"
        },
        {
          "name": "ZWave",
          "status": "FAILURE"
        }
      ]
    }

    app.get('/api/protocols/devices', function(req, res) {
      // only send response if discover mode is turned on.
      if (discovery.on) {
        res.status(200).send(wildDevices)
      } else {
        res.status(200).send([])
      }
    });

    app.get('/api/devices', function(req, res) {
      res.status(200).send(agileDevices)
    });

    app.post('/api/devices', function(req, res) {
      var device = req.body
      agileDevices.push(device)
      _.pullAllWith(wildDevices, [device], _.isEqual);
      res.status(200).send(device)
    });

    app.delete('/api/devices/:deviceid', function(req, res) {
      var deviceid = req.params.deviceid
      device = _.find(agileDevices, { 'id': deviceid });
      wildDevices.push(device)
      _.pullAllWith(agileDevices, [device], _.isEqual);
      res.status(204).send()
    });

    app.get('/api/devices/:deviceid', function(req, res) {
      var deviceid = req.params.deviceid
      device = _.find(agileDevices, { 'id': deviceid });
      res.status(200).send(device)
    });

    app.get('/api/protocals/discovery', function(req, res) {
      res.status(200).send(discovery)
    });

    app.post('/api/protocals/discovery', function(req, res) {
      discovery.on = true
      res.status(200).send(discovery)
    });

    app.delete('/api/protocols/discovery', function(req, res) {
      discovery.on = false
      res.status(204).send()
    });

    app.post('/api/protocols/discovery', function(req, res) {
      discovery.on = true
      res.status(200).send(discovery)
    });

    app.get('/api/protocols/discovery', function(req, res) {
      console.log(discovery.on)
      if (discovery.on)
        res.status(200).send(discovery.protocols)
      else {
        res.status(200).send([])
      }
    });

    app.get('/api/device/:deviceId/:componentId/lastUpdate', function(req, res) {
      var newDate = new Date(Date.now());
      dateString = newDate.toUTCString();

      lastUpdate = {
        id: req.params.componentId,
        value: chance.integer({min: -20, max: 20}),
        time: dateString
      }
      res.status(200).send(lastUpdate)
    });


    app.post('/api/device/:deviceid/:componentid/subscribe', function(req, res) {
      // responds with data stream
      res.status(200)
    });

    app.listen(serverPort, function() {
      console.log(chalk.cyan('Agile Server listening on port '+serverPort));
    });

})();
