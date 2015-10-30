"use strict";

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var distributorData = require(__dirname + "/distributor.js");

var url = 'mongodb://localhost:27017/3dphy_live';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertDocuments(db, function(result) {
      db.close();
  });
});

var insertDocuments = function(db, callback) {
  var collection = db.collection('distributor');
  collection.insertMany(distributorData, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
};
