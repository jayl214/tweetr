"use strict";

const ObjectId      = require('mongodb').ObjectID;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {


      db.collection('tweets').insertOne(newTweet, function(err, result) {
        if (err) {
          return callback(err);
        };

        callback(null, true);
      });



    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {


      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        };
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });

    },

    updateLikeCounter: function(id, callback){
      db.collection("tweets").findOne(
        {_id: ObjectId(id)},
        {like_counter: 1, _id: 0}, function(err, tweetLikeCounter){


            if ( tweetLikeCounter.like_counter == 0 ){
              // update value to 1
              db.collection("tweets").update(
                {_id: ObjectId(id)},
                {$set: {like_counter: 1}}
              )
            } else {
              // update value to 0
              db.collection("tweets").update(
                {_id: ObjectId(id)},
                {$set: {like_counter: 0}}
              )
            }
            callback(null);

          }
        )


    }

  };
}
