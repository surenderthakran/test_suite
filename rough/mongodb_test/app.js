"use strict";

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/3dphy_dev';

MongoClient.connect(url, function(err, db_3dphy) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  // insertManyDocuments(db_3dphy, function(result) {
  //     db_3dphy.close();
  // });

  // insertDocument(db_3dphy, function(result) {
  //     db_3dphy.close();
  // });

  // findDocuments(db_3dphy, function(result) {
  //     db_3dphy.close();
  // });

  findAndSortDocuments(db_3dphy, function(result) {
      db_3dphy.close();
  });
});

var findAndSortDocuments = function(db_3dphy, callback) {
    var collection = db_3dphy.collection('category');
    var category_ids = [ '33ba5130-b5fd-11e5-9661-891f9b0855b3',
   '7a02d490-bb03-11e5-8623-81e3d25b5a43',
   '5b0e5be0-b5f9-11e5-9661-891f9b0855b3',
   '6e483480-b5fc-11e5-9661-891f9b0855b3',
   'e47d60c0-b602-11e5-9661-891f9b0855b3',
   '8d09b180-bdd3-11e5-b211-c7f0dae84a68',
   '0b423612-91a8-11e5-b6f6-31c32c276e2f',
   '3135b940-b5e9-11e5-a94f-1d09599d2bf3',
   'b4779920-b5f5-11e5-a94f-1d09599d2bf3',
   '22e49990-b5f5-11e5-a94f-1d09599d2bf3',
   'dbbacc30-b5f7-11e5-9661-891f9b0855b3',
   'd7401cb0-b5fb-11e5-9661-891f9b0855b3',
   'd6eb8650-b5f6-11e5-9661-891f9b0855b3',
   'e3e55030-b5e6-11e5-a94f-1d09599d2bf3',
   '7efbf4d0-b77b-11e5-8362-a162ce056c2a',
   'b83920e0-b5e8-11e5-a94f-1d09599d2bf3',
   'e3c98e00-b5ea-11e5-a94f-1d09599d2bf3',
   'e3e77310-b5e6-11e5-a94f-1d09599d2bf3',
   '256598c0-b5ed-11e5-a94f-1d09599d2bf3',
   'ead66e30-b5f3-11e5-a94f-1d09599d2bf3',
   '2af383a0-b602-11e5-9661-891f9b0855b3',
   '6ff64260-b5eb-11e5-a94f-1d09599d2bf3',
   '0afdb301-91a8-11e5-b6f6-31c32c276e2f',
   '8f778500-b603-11e5-9661-891f9b0855b3' ];
    collection.find({"cat_id": {"$in": category_ids}}).sort({"ttl": 1}).toArray(function(err, result) {
        console.log(err);
        console.log(result);
    });
};

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
