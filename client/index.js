"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("@babel/polyfill");

var _withAuth = require("./withAuth");

Object.keys(_withAuth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _withAuth[key];
    }
  });
});