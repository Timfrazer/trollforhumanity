'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var seed = require('../../seeds/UncomfortableTruths.json').messages;

var hot = function hot() {
  return {
    fetch: function fetch() {
      var ret = seed.map(function (arr) {
        return arr[0];
      });
      return ret;
    }
  };
};

exports.default = hot();