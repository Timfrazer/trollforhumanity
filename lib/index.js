'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _carePackages = require('./carePackages');

var _carePackages2 = _interopRequireDefault(_carePackages);

var _scheduler = require('./scheduler');

var _scheduler2 = _interopRequireDefault(_scheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var fakeMsg = [{ message: 'you are a troll, bigly', time: new Date(Date.now()) }, { message: 'you are a tremendous troll', time: new Date(Date.now()) }];

var hot = function hot() {

  return {

    troll: function troll(params) {
      return new Promise(function (res, rej) {
        var user = _models2.default.makeUser(params);
        _carePackages2.default.load(user);
        _scheduler2.default.schedule(user);

        res(fakeMsg);
      });
    }
  };
};

// const api = IS_PRODUCTION === 'true' ? hot : substitute
exports.default = hot();