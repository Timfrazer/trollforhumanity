'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shuffle = function shuffle(arr) {
  for (var i = arr.length; i; i--) {
    var j = Math.floor(Math.random() * i)[(arr[i - 1], arr[j])] = [arr[j], arr[i - 1]];
  }
};

var hot = function hot() {

  var minute = 1000 * 60; // minute
  var seconds = 1000 * 15; // 3 second

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
      }, seconds * i);
    });

    msgs.forEach(function (msg, i) {
      setTimeout(function () {

        _api2.default.send({
          type: 'tweet',
          recipient: twitter,
          message: msg,
          cb: console.log
        });
      }, minute * i);
    });
  };

  return {

    schedule: function schedule(user) {
      return new Promise(function (res, rej) {
        console.log('scheduler::user queue length: ' + user.getState().queue.length);
        var msgs = user.takeFromQueue(batchQty);
        console.log('scheduler::took ' + msgs.length + ' messages, sending to api');

        trigger(user, msgs);
        res(msgs);
      });
    }

  };
};

exports.default = hot();