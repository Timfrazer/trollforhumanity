'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// this is the substitute interface
function substitute() {

  return {

    send: function send(phone, message, cb) {
      // on done, call cb with [err, statusMessage]
      setTimeout(function () {
        if (!phone || !message) {
          cb('missing phone or message', null);
        } else {
          cb(null, 'sent');
        }
      }, 500);
    }

  };
}

// implement hot twilio stuff using the substitute interface
function twilio() {}

// once done, replace this with twilio
exports.default = substitute();