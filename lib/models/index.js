'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeUser = function makeUser(params) {

  var user = (0, _user2.default)(params.name, params.options);
  params.packages.forEach(function (pkg) {
    return user.addPackage(pkg);
  });
  return user;
};

exports.default = {
  makeUser: makeUser
};