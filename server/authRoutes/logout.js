"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = require("express").Router();

var auth = require("../checkAuth");

function logout(model) {
  return router.post('/logout', auth(model),
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var body, user, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              try {
                body = req.body, user = req.user, token = req.token;
                model.findById(user.id, "tokens",
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(err, loggedInUser) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(body && body.allDevices)) {
                              _context.next = 7;
                              break;
                            }

                            loggedInUser.tokens = [];
                            _context.next = 4;
                            return loggedInUser.save();

                          case 4:
                            res.status(200).send({
                              message: "Logged out from all devices."
                            });
                            _context.next = 11;
                            break;

                          case 7:
                            loggedInUser.tokens = loggedInUser.tokens.filter(function (eachToken) {
                              return eachToken.token != token;
                            });
                            _context.next = 10;
                            return loggedInUser.save();

                          case 10:
                            res.status(200).send({
                              message: "Logged out from this device."
                            });

                          case 11:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              } catch (error) {
                res.status(500).send({
                  error: {
                    key: "server_error",
                    message: "Some error occured.",
                    status: 500
                  }
                });
              }

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = logout;