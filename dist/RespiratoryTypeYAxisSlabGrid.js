"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _plotUtils = require("plot-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SLAB = [{
  start: 0,
  end: 5,
  color: "#fffef9"
}, {
  start: 5,
  end: 15,
  color: "#fff7e4"
}, {
  start: 15,
  end: 25,
  color: "#fffef9"
}, {
  start: 25,
  end: 35,
  color: "#fff7e4"
}, {
  start: 35,
  end: 70,
  color: "#fffef9"
}, {
  start: 70,
  end: 80,
  color: "#fff7e4"
}, {
  start: 80,
  end: 100,
  color: "#fffef9"
}];

var RespiratoryTypeYAxisSlabGrid =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RespiratoryTypeYAxisSlabGrid, _PureComponent);

  function RespiratoryTypeYAxisSlabGrid(props) {
    var _this;

    _classCallCheck(this, RespiratoryTypeYAxisSlabGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RespiratoryTypeYAxisSlabGrid).call(this, props));
    _this.ref = _react.default.createRef();
    return _this;
  }

  _createClass(RespiratoryTypeYAxisSlabGrid, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height;
      return _react.default.createElement("canvas", {
        ref: this.ref,
        width: 1,
        height: height,
        style: {
          width: width,
          height: height,
          display: "block"
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.draw();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this$props2 = this.props,
          minY = _this$props2.minY,
          maxY = _this$props2.maxY,
          height = _this$props2.height; // Plot

      var canvas = this.ref.current;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 1, height);

      for (var _i = 0, _SLAB = SLAB; _i < _SLAB.length; _i++) {
        var row = _SLAB[_i];
        var start = Math.round((0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, row.end));
        var end = Math.round((0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, row.start));
        ctx.fillStyle = row.color;
        ctx.fillRect(0, start, 1, end - start);
      }
    }
  }]);

  return RespiratoryTypeYAxisSlabGrid;
}(_react.PureComponent);

RespiratoryTypeYAxisSlabGrid.propTypes = {
  minY: _propTypes.default.number.isRequired,
  maxY: _propTypes.default.number.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired
};
var _default = RespiratoryTypeYAxisSlabGrid;
exports.default = _default;