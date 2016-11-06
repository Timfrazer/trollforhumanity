'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _process$env = process.env,
    IS_PRODUCTION = _process$env.IS_PRODUCTION,
    TWITTER_CONSUMER_KEY = _process$env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET = _process$env.TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN_KEY = _process$env.TWITTER_ACCESS_TOKEN_KEY,
    TWITTER_ACCESS_TOKEN_SECRET = _process$env.TWITTER_ACCESS_TOKEN_SECRET;

var Twitter = require('twitter');

// this is the substitute interface
var substitute = function substitute() {
  return {

    send: function send(username, message, cb) {
      // on done, call cb with [err, statusMessage]
      setTimeout(function () {
        if (!username || !message) {
          cb('missing username or message', null);
        } else {
          cb(null, 'sub::tweet sent at ' + Date.now());
        }
      }, 500);
    }

  };
};

// implement hot twitter stuff using the substitute interface
var hot = function hot(consumer_key, consumer_secret, access_token_key, access_token_secret) {
  var client = new Twitter({ consumer_key: consumer_key, consumer_secret: consumer_secret, access_token_key: access_token_key, access_token_secret: access_token_secret });

  return {
    send: function send(usr, msg, cb) {
      return client.post('statuses/update', { status: '@' + usr + ': ' + msg }, function (err, tweet, res) {
        err ? cb(err) : cb(null, 'hot::tweet sent at ' + Date.now());
      });
    }
  };
};

var api = IS_PRODUCTION === 'true' ? hot : substitute;
exports.default = substitute(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN_KEY, TWITTER_ACCESS_TOKEN_SECRET);