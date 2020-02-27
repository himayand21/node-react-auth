"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentUserAPI = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var currentUserAPI =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, apiRoute) {
    var response, responseJSON;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("".concat(apiRoute, "/current"), {
              method: 'GET',
              headers: {
                'content-type': 'application/json',
                'authorization': "Bearer ".concat(token)
              },
              credentials: 'include'
            });

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            responseJSON = _context.sent;

            if (!responseJSON.error) {
              _context.next = 8;
              break;
            }

            throw responseJSON.error;

          case 8:
            return _context.abrupt("return", responseJSON);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function currentUserAPI(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.currentUserAPI = currentUserAPI;