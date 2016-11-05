'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// this is the substitute interface
function substitute() {

  return {

    send: function send(username, message, cb) {
      // on done, call cb with [err, statusMessage]
      setTimeout(function () {
        if (!username || !message) {
          cb('missing username or message', null);
        } else {
          cb(null, 'sent');
        }
      }, 500);
    }

  };
}

// implement hot twitter stuff using the substitute interface
function twitter() {}

// once done, replace this with twitter
exports.default = substitute();