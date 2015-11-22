"use strict";

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var distributorData = require(__dirname + "/distributor.js");

var url = 'mongodb://localhost:27017/3dphy_dev';

MongoClient.connect(url, function(err, db_3dphy) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  insertManyDocuments(db_3dphy, function(result) {
      db_3dphy.close();
  });

  // insertDocument(db_3dphy, function(result) {
  //     db_3dphy.close();
  // });

  // findDocuments(db_3dphy, function(result) {
  //     db_3dphy.close();
  // });
});

var findDocuments = function(db_3dphy, callback) {
    var collection = db_3dphy.collection('distributor');
    collection.find({}).toArray(function(err, result) {
        console.log(err);
        console.log(result);
    });
};

var insertDocument = function(db_3dphy, callback) {
  var collection = db_3dphy.collection('distributor');
  collection.insertOne({a: 1}, function(err, result) {
    console.log(err);
    console.log(result);
    console.log("Inserted documents into the document collection");
    callback(result);
  });
};

var insertManyDocuments = function(db_3dphy, callback) {
  var collection = db_3dphy.collection('distributor');
  collection.insertMany(distributorData, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted documents into the document collection");
    callback(result.insertedCount);
  });
};
