// get data from Relayr
// var Relayr = require("relayr");

var app_id = 'aafaa8a6-58b5-4f8a-9485-018846e695f3';
var dev_id = 'e2eeb6dd-d8b4-4179-b153-49a367143d7e';
var token  = 'jpWnlsJTYBMXmyTjJIq8b4zOS2vYrWw6';

// var scale_id = "d9bf0203-8f64-401b-bd53-13c0b20aeeff";

// var relayr = new Relayr(app_id);

module.exports = function(req, res) {

  // relayr.connect(token, dev_id);

  // listen for data on our custom API endpoint
  emitter.addListener('message', function(msg) {
    console.log('emitted', msg);

    var weight = msg.weight;

    res.status(200)
      .write('data: ' + JSON.stringify(weight) + '\n\n');
  });

  res.type('text/event-stream');

  // relayr.on('data', function (topic, data) {

  //   var lum = data.readings[0].value;
  //   // console.log(lum);

  //   res.status(200)
  //     .write('data: ' + JSON.stringify(lum) + '\n\n');
  // });

  // relayr.on("connect", function () {
  //   console.log('Connected to the Relayr platform! Mooo!');
  // });

};

