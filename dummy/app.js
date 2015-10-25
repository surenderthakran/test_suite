"use strict";

var express = require('express');

var routes = require('./routes/index');

var app = express();

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.json({
      sts: 0,
      msg: "404 Not Found!"
  });
});

var server = app.listen(3000, function () {
  console.log("\n====== Initializing node server ======");
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
