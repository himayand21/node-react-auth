"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

function checkAuth(User) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var header, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                try {
                  header = req.header('Authorization');

                  if (!header) {
                    res.status(401).send({
                      error: {
                        status: 401,
                        key: "missing_token",
                        message: "You need an authorization token to access this information."
                      }
                    });
                  } else {
                    token = header.split(' ')[1];
                    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
                      if (err) {
                        res.status(401).send({
                          error: {
                            message: 'You are not authorized to access this information.',
                            key: "token_mismatch",
                            status: 401
                          }
                        });
                      } else {
                        User.findOne({
                          _id: decoded._id,
                          'tokens.token': token
                        }, "email _id", function (err, user) {
                          if (err || !user) {
                            res.status(401).send({
                              error: {
                                message: 'Token might have expired in a previous session.',
                                key: "token_expired",
                                status: 401
                              }
                            });
                          } else {
                            req.user = {
                              email: user.email,
                              id: user._id
                            };
                            req.token = token;
                            next();
                          }
                        });
                      }
                    });
                  }
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
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}

module.exports = checkAuth;