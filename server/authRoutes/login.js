"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = require("express").Router();

function login(User) {
  return router.post("/login",
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var body, bodyKeys, email, password, user, validationError;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              body = req.body;
              bodyKeys = Object.keys(body);

              if (!bodyKeys.includes('email') || !bodyKeys.includes('password')) {
                res.status(400).send({
                  error: {
                    status: 400,
                    message: "Missing email/password key in request.",
                    key: "missing_email_password_key"
                  }
                });
              }

              email = body.email, password = body.password;
              user = new User({
                email: email,
                password: password
              });
              _context2.next = 8;
              return user.validateUser();

            case 8:
              validationError = _context2.sent;

              if (validationError) {
                res.status(422).send({
                  error: _objectSpread({
                    status: 422
                  }, validationError)
                });
              } else {
                User.findOne({
                  email: email
                }, "email password tokens", function (err, validUser) {
                  if (!validUser) {
                    res.status(401).send({
                      error: {
                        status: 401,
                        message: "Login failed! Email is not registered.",
                        key: "email_not_registered"
                      }
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
                                  error: {
                                    status: 401,
                                    message: "Login failed! Password does not match.",
                                    key: "password_mismatch"
                                  }
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

              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              res.status(500).send({
                error: {
                  key: "server_error",
                  message: "Some error occured.",
                  status: 500
                }
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = login;