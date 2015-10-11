'use strict';

var Glue = require('glue');
var glueManifest = require('./config/glue-manifest');
var glueOptions = require('./config/glue-options');

Glue.compose(glueManifest, glueOptions, function (err, server) {
    if (err) {
        throw err;
    }
    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
        console.log('Server running at: ' + server.info.uri);
    });
});
