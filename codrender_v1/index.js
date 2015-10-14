'use strict';

var Hapi = require("hapi");

var server = new Hapi.Server();
server.connection({
        host: "0.0.0.0",
        port: 80
});

server.route({
        method: "GET",
        path: "/",
        handler: function(request, reply){
                reply("Finally made it!!");
        }
});

server.start(function() {
        console.log("Server running at: " + server.info.uri);
});

/*
var Glue = require('glue');
var glueManifest = require('./config/manifest');
var glueOptions = require('./config/options');

Glue.compose(glueManifest, glueOptions, function (err, server) {
    if (err) {
        throw err;
    }
    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
        console.log('Server running at: ' + server.info.uri);
    });
});
*/
