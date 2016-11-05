'use strict'
import { MongoClient } from 'mongodb'
const MONGODB_URI = "mongodb://127.0.0.1:27017/troll";

// TODO
function mongo( collectionName ) {

  MongoClient.connect( MONGODB_URI, function (err, db) {

    if (err) {
      console.error('Could not connect to Mongo! Unexpected error. Details below.');
      throw err;
    }

    let collection = db.collection("test");

    console.log('Retrieving documents for the "test" collection...');
    collection.find().toArray((err, results) => {
          console.log('results: ', results);

          console.log('Disconnecting from Mongo!');
          db.close();
        });
  });

}

function substitute( collectionName ) {
  
  let state = {}
  let id = 1

  return {
    collection: collectionName,
    create: function ( data ) {
      let copy = Object.assign( {}, data )
      copy.id = id
      state[id] = copy
      id += 1
      return copy
    },
    find: function ( id ) {
      return Object.assign( {}, state[id] )
    },
    update: function ( data ) {
      let id = data.id
      state[id] = data
      return data
    },
    delete: function ( id ) {
      delete state[id]
      return true
    },
    all: function () {
      return Object.keys( state )
        .map( function(key) { return state[key] } )
        .map( function(data) { return Object.assign( {}, data ) } )
    }
  }
}

export default substitute
