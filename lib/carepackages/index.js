'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function substitute() {
  return {
    get: function get(type, qty, rejectList, cb) {
      // TODO this func is incomplete, does not handle reject list
      qty = Number(qty);
      // make rejectList an optional argument
      if (typeof rejectList === 'function' && !cb) {
        cb = rejectList;
        rejectList = [];
      }

      var messages = {};
      var DB_QTY = 30;

      // generate dummy
      for (var i = 0; i < DB_QTY; i++) {
        messages[i + 1] = 'Sample message ' + Math.floor(Math.random() * 100);
      }

      // LOGIC


      var ret = [];
      var keys = Object.keys(messages);

      for (var _i = 0; _i < qty; _i++) {
        // get a random key
        var key = keys[Math.floor(Math.random() * keys.length)];

        // if requesting more than we have
        if (_i >= DB_QTY) {
          break;
        }

        ret.push(messages[key]);
      }

      cb(null, { type: type, messages: ret });
    }
  };
}

exports.default = substitute();