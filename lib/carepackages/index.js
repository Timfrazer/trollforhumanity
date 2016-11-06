'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cat = require('./cat');

var _cat2 = _interopRequireDefault(_cat);

var _yak = require('./yak');

var _yak2 = _interopRequireDefault(_yak);

var _fomo = require('./fomo');

var _fomo2 = _interopRequireDefault(_fomo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loaders = [_cat2.default, _yak2.default, _fomo2.default];

var hot = function hot() {
  return {

    load: function load(user) {
      return new Promise(function (res, rej) {
        // get user subscriptions
        var packages = Object.keys(user.activePackages());
        var alreadySent = user.getSentQueue().map(function (msg) {
          return msg.uuid;
        });

        // load each subscription with messages
        var queue = [];
        packages.forEach(function (name) {
          switch (name) {
            case 'cat':
              queue.push(_cat2.default.fetch());
              break;
            case 'yak':
              queue.push(_cat2.default.fetch());
              break;
            case 'fomo':
              queue.push(_cat2.default.fetch());
              break;
            default:
              break;
          }
        });
        // TODO
        // loaders.reduce( (acc, loader) => acc.concat( loader.fetchExcept( alreadySent ) ), queue )

        // console.log( `carepackage::loading ${queue[0].length} messages to user's queue` )
        user.addToQueue(queue[0]);
        // console.log( `carepackage::loaded ${user.getState().queue.length} messages to user` )

        // return user
        res(user);
      });
    }

  };
};

exports.default = hot();