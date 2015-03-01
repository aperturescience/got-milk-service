'use strict';

var request = require('request');

var mqtt = require('mqtt');

var interval = 1000;

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

var client = mqtt.connect({
  servers: [{
    'host': 'mqtt.relayr.io',
    'port': 8883
  }],
  username: 'd4b7cc40-e399-4367-8ab6-90f165a98315',
  password: 'EP6d.Q9CD9h5',
  clientId: 'GotMilk!',
  protocol: 'mqtts',
  certPath: __dirname + '/lib/relayr.crt',
  rejectUnauthorized: false
});

client.subscribe('/v1/73927f8d-5135-40d0-9aa9-3837cee5e1e3');

client.on('message', function(topic, msg) {

  msg = JSON.parse(msg);

  if (!msg.weight)
    return;

  var data = {
    device: 'scale',
    // weight: getRandomInt(0, 1000),
    weight: Math.round(msg.weight),
  };

  console.log(data);

  request({
    uri    : 'http://gilles.local:3001/consumer',
    method : 'POST',
    body   : data,
    json   : true,
  });

});

  // send fridge closed event
  // setTimeout(closeFridge, 2000);
  // setTimeout(openFridge, 4000);

function closeFridge() {

  request({
    uri    : 'http://gilles.local:3001/consumer',
    method : 'POST',
    body   : {
      device: 'light_sensor',
      luminosity: 90
    },
    json   : true,
  });
}

function openFridge() {

  request({
    uri    : 'http://gilles.local:3001/consumer',
    method : 'POST',
    body   : {
      device: 'light_sensor',
      luminosity: 300
    },
    json   : true,
  });
}