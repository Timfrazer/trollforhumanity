'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongodb = require('mongodb');

var MONGODB_URI = "mongodb://127.0.0.1:27017/troll";

// TODO
function mongo(collectionName) {

  _mongodb.MongoClient.connect(MONGODB_URI, function (err, db) {

    if (err) {
      console.error('Could not connect to Mongo! Unexpected error. Details below.');
      throw err;
    }

    var collection = db.collection("test");

    console.log('Retrieving documents for the "test" collection...');
    collection.find().toArray(function (err, results) {
      console.log('results: ', results);

      console.log('Disconnecting from Mongo!');
      db.close();
    });
  });
}

function substitute(collectionName) {

  var state = {};
  var id = 1;

  return {
    collection: collectionName,
    create: function create(data) {
      var copy = _extends({}, data);
      copy.id = id;
      state[id] = copy;
      id += 1;
      return copy;
    },
    find: function find(id) {
      return _extends({}, state[id]);
    },
    update: function update(data) {
      var id = data.id;
      state[id] = data;
      return data;
    },
    delete: function _delete(id) {
      delete state[id];
      return true;
    },
    all: function all() {
      return Object.keys(state).map(function (key) {
        return state[key];
      }).map(function (data) {
        return _extends({}, data);
      });
    }
  };
}

exports.default = substitute;