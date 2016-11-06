'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var accessor = function accessor(state) {
  return {

    getState: function getState() {
      return _extends({}, state);
    }

  };
};

var queueManager = function queueManager(state) {

  state.queue = [];
  state.sentQueue = [];

  return {
    addToQueue: function addToQueue(msgs) {
      state.queue = state.queue.concat(msgs);
      return true;
    },

    takeFromQueue: function takeFromQueue() {
      var qty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var ret = state.queue.splice(0, qty);
      state.sentQueue = state.sentQueue.concat(ret);
      return ret;
    },

    getSentQueue: function getSentQueue() {
      return [].concat(_toConsumableArray(state.sentQueue));
    },

    filterQueue: function filterQueue(fn) {
      state.queue = state.queue.filter(fn);
      return true;
    }
  };
};

/**
 * @param name {String}
 * @param options {Object<String>} contact information
 * @return {Object|Boolean} if success, you get an user, else a false
 */
var User = function User(name) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$email = _ref.email,
      email = _ref$email === undefined ? '' : _ref$email,
      _ref$phone = _ref.phone,
      phone = _ref$phone === undefined ? '' : _ref$phone,
      _ref$twitter = _ref.twitter,
      twitter = _ref$twitter === undefined ? '' : _ref$twitter;

  try {
    if (!name) {
      return false;
    }
    // must give at least an email, phone, or twitter handle
    var test = [email, phone, twitter].reduce(function (acc, ele) {
      return acc + ele.length;
    }, 0);
    if (test === 0) {
      return false;
    }
  } catch (e) {
    return false;
  }

  var state = {
    name: name,
    email: email,
    phone: phone,
    twitter: twitter,
    // TODO user should be initialised as unconfirmed.
    // currently the app doesn't have sms confirmation
    confirmed: true
  };

  return _extends({}, accessor(state), queueManager(state));
};

exports.default = User;