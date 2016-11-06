'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var IS_PRODUCTION = process.env.IS_PRODUCTION;


var substitute = function substitute() {

  var hr = 1000 * 60 * 60;

  return {

    troll: function troll(params) {
      return new Promise(function (res, rej) {
        var msgs = [{ message: 'tim is a troll, bigly', time: new Date(Date.now() + hr) }, { message: 'shaun is also a troll, tremendously', time: new Date(Date.now() + 2 * hr) }];

        setTimeout(function () {
          res(msgs);
        }, 500);
      });
    }

  };
};

var hot = function hot() {

  return {
    troll: troll
  };
};

var api = IS_PRODUCTION === 'true' ? hot : substitute;
exports.default = api();