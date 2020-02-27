"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("./api");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  user: null,
  token: null,
  error: null,
  message: null,
  loading: false
};

function withAuth(WrappedComponent, apiRoute) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Component) {
    _inherits(_temp, _Component);

    function _temp(props) {
      var _this;

      _classCallCheck(this, _temp);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(_temp).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "signup",
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(body) {
          var _ref2, user, token;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;

                  _this.setState({
                    loading: true
                  });

                  _context.next = 4;
                  return (0, _api.signupAPI)(body, apiRoute);

                case 4:
                  _ref2 = _context.sent;
                  user = _ref2.user;
                  token = _ref2.token;

                  _this.setState(_objectSpread({}, initialState, {
                    user: user,
                    token: token,
                    message: "Signed up and logged in."
                  }));

                  _context.next = 13;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](0);

                  _this.setState(_objectSpread({}, initialState, {
                    error: _context.t0
                  }));

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 10]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());

      _defineProperty(_assertThisInitialized(_this), "login",
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(body) {
          var _ref4, user, token;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;

                  _this.setState({
                    loading: true
                  });

                  _context2.next = 4;
                  return (0, _api.loginAPI)(body, apiRoute);

                case 4:
                  _ref4 = _context2.sent;
                  user = _ref4.user;
                  token = _ref4.token;

                  _this.setState(_objectSpread({}, initialState, {
                    user: user,
                    token: token,
                    message: "Logged in."
                  }));

                  _context2.next = 13;
                  break;

                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2["catch"](0);

                  _this.setState(_objectSpread({}, initialState, {
                    error: _context2.t0
                  }));

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[0, 10]]);
        }));

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }());

      _defineProperty(_assertThisInitialized(_this), "logout",
      /*#__PURE__*/
      function () {
        var _ref5 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(token, allDeviceFlag) {
          var _ref6, message;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;

                  _this.setState({
                    loading: true
                  });

                  _context3.next = 4;
                  return (0, _api.logoutAPI)(token, allDeviceFlag, apiRoute);

                case 4:
                  _ref6 = _context3.sent;
                  message = _ref6.message;

                  _this.setState(_objectSpread({}, initialState, {
                    message: message
                  }));

                  _context3.next = 12;
                  break;

                case 9:
                  _context3.prev = 9;
                  _context3.t0 = _context3["catch"](0);

                  _this.setState(_objectSpread({}, initialState, {
                    error: _context3.t0
                  }));

                case 12:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[0, 9]]);
        }));

        return function (_x3, _x4) {
          return _ref5.apply(this, arguments);
        };
      }());

      _defineProperty(_assertThisInitialized(_this), "getCurrentUser",
      /*#__PURE__*/
      function () {
        var _ref7 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(token) {
          var _ref8, user;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;

                  _this.setState({
                    loading: true
                  });

                  _context4.next = 4;
                  return (0, _api.currentUserAPI)(token, apiRoute);

                case 4:
                  _ref8 = _context4.sent;
                  user = _ref8.user;

                  _this.setState(_objectSpread({}, initialState, {
                    user: user,
                    message: "Fetched logged in user details."
                  }));

                  _context4.next = 12;
                  break;

                case 9:
                  _context4.prev = 9;
                  _context4.t0 = _context4["catch"](0);

                  _this.setState(_objectSpread({}, initialState, {
                    error: _context4.t0
                  }));

                case 12:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[0, 9]]);
        }));

        return function (_x5) {
          return _ref7.apply(this, arguments);
        };
      }());

      _this.state = initialState;
      return _this;
    }

    _createClass(_temp, [{
      key: "render",
      value: function render() {
        return _react["default"].createElement(WrappedComponent, _extends({}, this.props, this.state, {
          login: this.login,
          logout: this.logout,
          signup: this.signup,
          getCurrentUser: this.getCurrentUser
        }));
      }
    }]);

    return _temp;
  }(_react.Component), _temp;
}

var _default = withAuth;
exports["default"] = _default;