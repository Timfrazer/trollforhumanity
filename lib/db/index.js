'use strict';

var MongoClient = require("mongodb").MongoClient;
var MONGODB_URI = "mongodb://127.0.0.1:27017/troll";

console.log("Connecting to MongoDB running at: " + MONGODB_URI);

MongoClient.connect(MONGODB_URI, function (err, db) {

      if (err) {
            console.log('Could not connect! Unexpected error. Details below.');
            throw err;
      }

      console.log('Connected to the database!');
      var collection = db.collection("test");

      console.log('Retrieving documents for the "test" collection...');
      collection.find().toArray(function (err, results) {
            console.log('results: ', results);

            console.log('Disconnecting from Mongo!');
            db.close();
      });
});