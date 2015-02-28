var request = require('request');

setInterval(function() {

  var data = {
    weight: getRandomInt(0, 1000)
  };

  console.log(data);

  request({
    uri    : 'http://gilles.local:3001/consumer',
    method : 'POST',
    body   : data,
    json   : true,
  });
}, 1000);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}