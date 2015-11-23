"use strict";

var firstNameList = require(__dirname + "/lib/firstNames.js");
var lastNameList = require(__dirname + "/lib/lastNames.js");
var streetNameList = require(__dirname + "/lib/streetNames.js");
var cityNameList = require(__dirname + "/lib/cityNames.js");
var stateNameList = require(__dirname + "/lib/stateNames.js");
var countryNameList = require(__dirname + "/lib/countryNames.js");

var uuid = require('node-uuid');

generateDistributorData();

function generateDistributorData() {
    console.log("[");
    for (var i = 0; i < 5000; i++) {
        var json = {};
        json.dst_id = uuid.v1();
        json.slt = getRandomString(["Mr", "Ms", "Mrs"]);
        json.fnm = getRandomFirstName();
        json.lnm = getRandomLastName();
        json.eid = [{
                id: json.fnm + "." + json.lnm + "@gmail.com",
                type: "work"
            },
            {
                id: json.lnm + "." + json.fnm + "@yahoo.com",
                type: "personal"
            }
        ];
        json.phn = [];
        for (var j = 0; j < 3; j++) {
            var rnd_phn = {};
            rnd_phn.isd = "+91";
            rnd_phn.num = getRandomInteger(8888888888, 9999999999).toString();
            rnd_phn.type = getRandomString(["work", "personal"]);
            json.phn.push(rnd_phn);
        }
        json.addr = {};
        json.addr.adr_ln = getRandomInteger(1000, 1010) + ", " + getRandomStreetName();
        json.addr.area = getRandomStreetName();
        json.addr.city = getRandomCityName();
        json.addr.state = getRandomStateName();
        json.addr.pin = getRandomInteger(100000, 100020).toString();
        json.addr.cntry = getRandomCountryName();
        json.dob = getRandomDate();
        json.crcl_ids = getArrayOfIntegersInRange(10, 1000, 1010);
        json.broch_ids = getArrayOfIntegersInRange(10, 2000, 2010);

        if (i !== 0) {
            console.log(",");
        }
        console.log(json);
    }
    console.log("]");
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getRandomString(array) {
    var min = 0;
    var max = array.length - 1;
    var rnd = Math.floor(Math.random()*(max-min+1)+min);

    return array[rnd];
}

function getRandomFirstName() {
    return getRandomString(firstNameList);
}

function getRandomLastName() {
    return getRandomString(lastNameList);
}

function getRandomStreetName() {
    return getRandomString(streetNameList);
}

function getRandomCityName() {
    return getRandomString(cityNameList);
}

function getRandomStateName() {
    return getRandomString(stateNameList);
}

function getRandomCountryName() {
    return getRandomString(countryNameList);
}

function getRandomDate() {
    return getRandomInteger(10, 31) + "-" + getRandomInteger(10, 12) + "-" + getRandomInteger(1970, 2000);
}

function getArrayOfIntegersInRange(maxLength, min, max) {
    var length = getRandomInteger(1, maxLength);
    var result = [];
    for (var i = 0; i < length; i++) {
        result.push(getRandomInteger(min, max).toString());
    }

    return result;
}
