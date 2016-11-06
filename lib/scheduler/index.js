'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hot = function hot() {

  var interval = 1000 * 60; // minute
  // const interval = 1000 * 2 // 2 second

  var count = 0;
  var batchQty = 24;

  var trigger = function trigger(user, msgs) {
    var _user$getState = user.getState(),
        phone = _user$getState.phone,
        twitter = _user$getState.twitter;

    msgs.forEach(function (msg, i) {
      setTimeout(function () {

        _api2.default.send({
          type: 'sms',
          recipient: phone,
          message: msg,
          cb: console.log
        });

        _api2.default.send({
          type: 'tweet',
          recipient: twitter,
          message: msg,
          cb: console.log
        });
      }, interval * i);
    });
  };

  return {

    schedule: function schedule(user) {
      return new Promise(function (res, rej) {
        console.log('scheduler::user queue length: ' + user.getState().queue.length);
        var msgs = user.takeFromQueue(batchQty);

        trigger(user, msgs);
        res(msgs);
      });
    }

  };
};

exports.default = hot();