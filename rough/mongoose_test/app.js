"use strict";

var mongoose = require('mongoose');

mongoose.set('debug', true);

// var dbConnection = mongoose.createConnection('mongodb://localhost:27017/3dphy_live');
var dbConnection = mongoose.createConnection({
    host: "127.0.0.1",
    port: 27017,
    database: "3dphy_live",
    options: {}
});

var Schema = mongoose.Schema;

var distributorSchema = new Schema({
    dist_id: String,
    // slt: getRandomString(["Mr", "Ms", "Mrs"]),
    slt: String,
    fnm: String,
    lnm: String,
    eid: String,
    phn: [{
        isd: String,
        num: Number,
        // type: getRandomString(["work", "personal"])
        type: String
    }],
    addr: {
        adr_ln: String,
        area: String,
        city: String,
        state: String,
        pin: Number,
        cntry: String
    },
    // dob: getRandomDate(),
    dob: String,
    crcl_ids: [Number],
    broch_ids: [Number]
});

var distributorModel = dbConnection.model('Distributor', distributorSchema);

dbConnection.on("open", function(result) {
    console.log("in open");
    // console.log(dbConnection);
    distributorModel.find({}, function(err, docs) {
        console.log(err);
        console.log(docs);
    });
});
