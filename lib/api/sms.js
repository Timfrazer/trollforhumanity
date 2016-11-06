'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    IS_PRODUCTION = _process$env.IS_PRODUCTION,
    TWILIO_SID = _process$env.TWILIO_SID,
    TWILIO_AUTH = _process$env.TWILIO_AUTH,
    TWILIO_NUMBER = _process$env.TWILIO_NUMBER;


// this is the substitute interface
function substitute() {

  return {

    send: function send(phone, message, cb) {
      // on done, call cb with [err, statusMessage]
      setTimeout(function () {
        if (!phone || !message) {
          cb('missing phone or message', null);
        } else {
          cb(null, 'sub::sms sent at ' + Date.now());
        }
      }, 500);
    }

  };
}

// implement hot twilio stuff using the substitute interface
function hot(sid, token, twilioNumber) {

  return {
    send: function send(phone, message, cb) {
      var client = (0, _twilio2.default)(sid, token);

      var payload = {
        body: message,
        to: phone,
        from: twilioNumber
      };

      client.sendMessage(payload, function (err, res) {
        if (err) {
          cb(err);
        } else {
          cb(null, 'hot::sms sent at ' + Date.now());
        }
      });
    }
  };
}

var api = IS_PRODUCTION === 'true' ? hot : substitute;
exports.default = substitute(TWILIO_SID, TWILIO_AUTH, TWILIO_NUMBER);