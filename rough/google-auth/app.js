'use strict';

var express = require('express');

var app = express();

var server = app.listen(9999, function() {
    var host = server.address().address;
    var port = server.address().port;

    app.use('/', require(__dirname + "/routes.js"));

    console.log("App listening at port: %s", port);
});