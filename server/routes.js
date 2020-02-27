"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = require("express").Router();

var mongoose = require("mongoose");

var auth = require("./auth");

require("./model");

var User = mongoose.model("User");
router.post("/login",
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
              User.findOne({
                email: email
              }, "email password tokens", function (err, validUser) {
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
router.post("/signup",
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res, next) {
    var _req$body2, email, password, user, validationError;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            user = new User({
              email: email,
              password: password
            });
            _context4.next = 5;
            return user.validateUser();

          case 5:
            validationError = _context4.sent;

            if (validationError) {
              res.status(401).send({
                error: validationError
              });
            } else {
              User.findOne({
                email: email
              }, "email",
              /*#__PURE__*/
              function () {
                var _ref4 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3(err, existingUser) {
                  var token;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (!existingUser) {
                            _context3.next = 4;
                            break;
                          }

                          res.status(403).send({
                            error: "Email is already in use."
                          });
                          _context3.next = 10;
                          break;

                        case 4:
                          _context3.next = 6;
                          return user.generateAuthToken();

                        case 6:
                          token = _context3.sent;
                          _context3.next = 9;
                          return user.save();

                        case 9:
                          res.status(200).send({
                            user: {
                              email: user.email,
                              id: user._id
                            },
                            token: token
                          });

                        case 10:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x9, _x10) {
                  return _ref4.apply(this, arguments);
                };
              }());
            }

            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            res.status(400).send({
              error: "Some error occured"
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
router.get("/current", auth, function (req, res, next) {
  res.send(req.user);
});
router.post('/logout', auth,
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var allDevices, user, token;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            try {
              allDevices = req.body.allDevices, user = req.user, token = req.token;
              User.findById(user.id, "tokens",
              /*#__PURE__*/
              function () {
                var _ref6 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee5(err, loggedInUser) {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (!allDevices) {
                            _context5.next = 7;
                            break;
                          }

                          loggedInUser.tokens = [];
                          _context5.next = 4;
                          return loggedInUser.save();

                        case 4:
                          res.status(200).send({
                            message: "Logged out from all devices."
                          });
                          _context5.next = 11;
                          break;

                        case 7:
                          loggedInUser.tokens = loggedInUser.tokens.filter(function (eachToken) {
                            return eachToken.token != token;
                          });
                          _context5.next = 10;
                          return loggedInUser.save();

                        case 10:
                          res.status(200).send({
                            message: "Logged out from this device."
                          });

                        case 11:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x13, _x14) {
                  return _ref6.apply(this, arguments);
                };
              }());
            } catch (error) {
              res.status(400).send({
                error: "Some error occured"
              });
            }

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;