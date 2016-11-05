"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function accessor(state) {
  return {
    showState: function showState() {
      return _extends({}, state);
    },
    setState: function setState(key, data) {
      return state[key] = data;
    }
  };
}

var User = function User(_ref) {
  var name = _ref.name,
      email = _ref.email,
      phone = _ref.phone,
      twitter = _ref.twitter;

  var state = {
    name: name,
    email: email,
    phone: phone,
    twitter: twitter,
    messageQueue: [],
    confirmed: false
  };

  return _extends({}, accessor(state));
};

exports.default = User;