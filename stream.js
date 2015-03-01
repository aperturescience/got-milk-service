'use strict';

// get data from Relayr
var Relayr = require('relayr');

var app_id = 'aafaa8a6-58b5-4f8a-9485-018846e695f3';
var token  = 'jpWnlsJTYBMXmyTjJIq8b4zOS2vYrWw6';

// sensor ID's
var light_sensor = '0a4fe703-51b6-48c0-b32f-f1e621911cf8';
var temp_sensor  = 'af62797a-73db-492d-8aa9-0c0263612512';
// var scales       = '73927f8d-5135-40d0-9aa9-3837cee5e1e3';

(function init() {

  var relayr = new Relayr(app_id);

  // connect to all the sensors

  // connect to the light sensor
  connectToLightSensor(relayr, token);

  // connect to the light sensor
  connectToTemparatureSensor(relayr, token);

  // connect to scales
  // connectToScales(relayr, token);

  relayr.on('connect', function () {
    console.log('——— Connected to the Relayr platform! Mooo! ———');
  });

})();

module.exports = function(req, res) {

  res.type('text/event-stream');

  // listen for data on our custom API endpoint
  global.emitter.addListener('message', function(msg) {
    console.log('consumed', msg);

    res.status(200)
      .write('data: ' + JSON.stringify(msg) + '\n\n');
  });

};

function connectToTemparatureSensor(relayr, token) {

  relayr.connect(token, temp_sensor);

  relayr.on(temp_sensor, function (topic, data) {

    // discard irrelevant data
    if (data.deviceId !== temp_sensor)
      return;

    var temp = data.readings[0].value;
    global.emitter.emit('message', {
      device     : 'temp_sensor',
      temperature: Math.round(temp),
    });
  });

}

function connectToLightSensor(relayr, token) {

  relayr.connect(token, light_sensor);

  relayr.on(light_sensor, function (topic, data) {

    // discard irrelevant data
    if (data.deviceId !== light_sensor)
      return;

    var lum = data.readings[0].value;
    global.emitter.emit('message', {
      device    : 'light_sensor',
      luminosity: lum,
    });
  });

}

// function connectToScales(relayr, token) {

//   relayr.connect(token, scales);

//   relayr.on('connect', function () {
//     console.log('——— Connected to the scales! Mooo! ———');
//   });

//   relayr.on('data', function (topic, data) {

//     // discard irrelevant data
//     if (data.deviceId !== scales)
//       return;

//     var lum = data.readings[0].value;
//     global.emitter.emit('message', {
//       device    : 'scale',
//       luminosity: lum,
//     });
//   });

// }