'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tweet = require('./tweet');

var _tweet2 = _interopRequireDefault(_tweet);

var _sms = require('./sms');

var _sms2 = _interopRequireDefault(_sms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_PRODUCTION = process.env.IS_PRODUCTION;


var substitute = function substitute() {
  return {
    send: function send(_ref) {
      var type = _ref.type,
          recipient = _ref.recipient,
          message = _ref.message,
          cb = _ref.cb;

      setTimeout(function () {
        var time = new Date(Date.now());
        cb(null, 'sub::sent ' + type + ' to ' + recipient + ' at ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getMinutes());
      }, 500);
    }
  };
};

var hot = function hot() {
  return {
    send: function send(_ref2) {
      var type = _ref2.type,
          recipient = _ref2.recipient,
          message = _ref2.message,
          cb = _ref2.cb;

      switch (type) {
        case 'tweet':
          _tweet2.default.send(recipient, message, cb);
          break;
        case 'sms':
          _sms2.default.send(recipient, message, cb);
          break;
        default:
          cb('API::type not recognised');
          break;
      }
    }
  };
};

var api = IS_PRODUCTION === 'true' ? hot : substitute;
exports.default = substitute();