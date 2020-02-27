"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = require("express").Router();

function login(model) {
  return router.post("/login",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var _req$body, email, password, user, validationError;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              user = new User({
                email: email,
                password: password
              });
              _context2.next = 5;
              return user.validateUser();

            case 5:
              validationError = _context2.sent;

              if (validationError) {
                res.status(401).send({
                  error: validationError
                });
              } else {
                model.findOne({
                  email: email
                }, "email password tokens", function (err, validUser) {
                  if (err) {
                    throw err;
                  }

                  if (!validUser) {
                    res.status(401).send({
                      error: "Login failed! Email is not registered."
                    });
                  } else {
                    validUser.comparePassword(password,
                    /*#__PURE__*/
                    function () {
                      var _ref2 = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee(err, isMatch) {
                        var token;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                if (isMatch) {
                                  _context.next = 4;
                                  break;
                                }

                                res.status(401).send({
                                  error: "Login failed! Password does not match."
                                });
                                _context.next = 10;
                                break;

                              case 4:
                                _context.next = 6;
                                return validUser.generateAuthToken();

                              case 6:
                                token = _context.sent;
                                _context.next = 9;
                                return validUser.save();

                              case 9:
                                res.status(200).send({
                                  user: {
                                    email: validUser.email,
                                    id: validUser._id
                                  },
                                  token: token
                                });

                              case 10:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      return function (_x4, _x5) {
                        return _ref2.apply(this, arguments);
                      };
                    }());
                  }
                });
              }

              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              res.status(400).send({
                error: "Some error occured."
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = login;