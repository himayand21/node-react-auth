"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutAPI = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logoutAPI =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(token, allDeviceFlag, apiRoute) {
    var response, responseJSON;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(allDeviceFlag);
            _context.next = 3;
            return fetch("".concat(apiRoute, "/logout"), {
              method: 'POST',
              body: JSON.stringify({
                allDevices: allDeviceFlag
              }),
              headers: {
                'content-type': 'application/json',
                'authorization': "Bearer ".concat(token)
              },
              credentials: 'include'
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            responseJSON = _context.sent;

            if (!responseJSON.error) {
              _context.next = 9;
              break;
            }

            throw responseJSON.error;

          case 9:
            return _context.abrupt("return", responseJSON);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function logoutAPI(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.logoutAPI = logoutAPI;