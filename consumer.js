module.exports = function(req, res, next) {

  var data = req.body;
  emitter.emit('message', data);

  console.log(data);

  res.end();
};