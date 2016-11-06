'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    _process$env$IS_DEV = _process$env.IS_DEV,
    IS_DEV = _process$env$IS_DEV === undefined ? 'true' : _process$env$IS_DEV,
    _process$env$TWILIO_S = _process$env.TWILIO_SID,
    TWILIO_SID = _process$env$TWILIO_S === undefined ? '' : _process$env$TWILIO_S,
    _process$env$TWILIO_A = _process$env.TWILIO_AUTH,
    TWILIO_AUTH = _process$env$TWILIO_A === undefined ? '' : _process$env$TWILIO_A,
    _process$env$TWILIO_N = _process$env.TWILIO_NUMBER,
    TWILIO_NUMBER = _process$env$TWILIO_N === undefined ? '' : _process$env$TWILIO_N;


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
function hot(sid, token, twilioNumber) {

  return {
    send: function send(phone, message, cb) {
      var client = (0, _twilio2.default)(sid, token);

      var payload = {
        body: message,
        to: phone,
        from: twilioNumber
      };

      client.sendMessage(payload, cb);
    }
  };
}

var api = IS_DEV === 'true' ? substitute : hot;
exports.default = api(TWILIO_SID, TWILIO_AUTH, TWILIO_NUMBER);