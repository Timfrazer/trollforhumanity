'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var IS_PRODUCTION = process.env.IS_PRODUCTION;


var substitute = function substitute() {};

var hot = function hot() {};

var api = IS_PRODUCTION === 'true' ? hot : substitute;
exports.default = api;