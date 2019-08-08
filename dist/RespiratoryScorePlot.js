"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoize = require("memoize");

var _bisect = require("bisect");

var _plotUtils = require("plot-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var COLOR_MAP = {
  "fill": "rgba(0,0,230,0.2)",
  "stroke": "rgb(0,0,230)",
  "iNOAdministration": "red",
  "anestheticsAdministration": "green"
};
var RSV_X_KEY = "TIME";
var RSV_Y_KEY = "RSS";
var INO_START_KEY = "START";
var INO_END_KEY = "END";
var ANESTHETICS_START_KEY = "START";
var ANESTHETICS_END_KEY = "END";

var RespiratoryScorePlot =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RespiratoryScorePlot, _PureComponent);

  function RespiratoryScorePlot(props) {
    var _this;

    _classCallCheck(this, RespiratoryScorePlot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RespiratoryScorePlot).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getSortedRSV", (0, _memoize.memoize_one)(function (RSV) {
      return RSV.sort(function (a, b) {
        return a[RSV_X_KEY] - b[RSV_X_KEY];
      });
    }));

    _defineProperty(_assertThisInitialized(_this), "getX", (0, _memoize.memoize_one)(function (RSV) {
      return RSV.map(function (rec) {
        return rec[RSV_X_KEY];
      });
    }));

    _this.ref = _react.default.createRef();
    return _this;
  }

  _createClass(RespiratoryScorePlot, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height;
      return _react.default.createElement("canvas", {
        ref: this.ref,
        height: height,
        width: width,
        style: {
          display: "block",
          width: width,
          height: height
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
          respiratorySupportVariable = _this$props2.respiratorySupportVariable,
          iNOAdministration = _this$props2.iNOAdministration,
          anestheticsAdministration = _this$props2.anestheticsAdministration,
          minX = _this$props2.minX,
          maxX = _this$props2.maxX,
          width = _this$props2.width,
          minY = _this$props2.minY,
          maxY = _this$props2.maxY,
          height = _this$props2.height;
      var sortedRSV = this.getSortedRSV(respiratorySupportVariable);
      var sortedRSVInRange = this.getSortedRSVInRange(sortedRSV, minX, maxX);
      var sortedPoints = this.getSortedPoints(sortedRSVInRange, width, minX, maxX, height, minY, maxY);
      var iNOInRange = this.getINOInRange(iNOAdministration, minX, maxX);
      var iNOPair = this.getINOPair(iNOInRange, width, minX, maxX, height, minY, maxY);
      var anestheticsInRange = this.getAnestheticsInRange(anestheticsAdministration, minX, maxX);
      var anestheticsPair = this.getAnestheticsPair(anestheticsInRange, width, minX, maxX, height, minY, maxY); // Clear plots

      var canvas = this.ref.current;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height); // fill step plot

      var yOrigin = (0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, 0);
      this.fillStepPlot(ctx, width, height, yOrigin, sortedPoints, iNOPair, anestheticsPair);
    }
  }, {
    key: "getSortedRSVInRange",
    value: function getSortedRSVInRange(sortedRSV, minX, maxX) {
      var sortedX = this.getX(sortedRSV);
      var startIdx = Math.max(0, (0, _bisect.bisect_left)(sortedX, minX));
      var endIdx = Math.min((0, _bisect.bisect_right)(sortedX, maxX), sortedRSV.length - 1);
      return sortedRSV.slice(startIdx, endIdx + 1);
    }
  }, {
    key: "getSortedPoints",
    value: function getSortedPoints(sortedRSV, width, minX, maxX, height, minY, maxY) {
      var sortedPoints = sortedRSV.map(function (obj) {
        var domX = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, obj[RSV_X_KEY]);
        var domY = (0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, obj[RSV_Y_KEY]);
        return {
          domX: domX,
          domY: domY
        };
      });
      return sortedPoints;
    }
  }, {
    key: "getINOInRange",
    value: function getINOInRange(iNOAdministration, minX, maxX) {
      return iNOAdministration.filter(function (rec) {
        return !(rec[INO_END_KEY] <= minX || rec[INO_START_KEY] >= maxX);
      });
    }
  }, {
    key: "getINOPair",
    value: function getINOPair(iNOAdministration, width, minX, maxX, height, minY, maxY) {
      var iNOPair = iNOAdministration.map(function (obj) {
        var startDomX = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, obj[INO_START_KEY]);
        var endDomX = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, obj[INO_END_KEY]);
        return {
          startDomX: startDomX,
          endDomX: endDomX
        };
      });
      return iNOPair;
    }
  }, {
    key: "getAnestheticsInRange",
    value: function getAnestheticsInRange(anestheticsAdministration, minX, maxX) {
      return anestheticsAdministration.filter(function (rec) {
        return !(rec[ANESTHETICS_END_KEY] <= minX || rec[ANESTHETICS_START_KEY] >= maxX);
      });
    }
  }, {
    key: "getAnestheticsPair",
    value: function getAnestheticsPair(anestheticsAdministration, width, minX, maxX, height, minY, maxY) {
      var anestheticsPair = anestheticsAdministration.map(function (obj) {
        var startDomX = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, obj[ANESTHETICS_START_KEY]);
        var endDomX = (0, _plotUtils.toDomXCoord_Linear)(width, minX, maxX, obj[ANESTHETICS_END_KEY]);
        return {
          startDomX: startDomX,
          endDomX: endDomX
        };
      });
      return anestheticsPair;
    }
  }, {
    key: "fillStepPlot",
    value: function fillStepPlot(ctx, width, height, yOrigin, sortedPoints, iNOPair, anestheticsPair) {
      var l = sortedPoints.length;

      if (l === 0 || l === 1) {
        return;
      } // Fill


      {
        ctx.beginPath();
        var prevP = {
          domX: sortedPoints[0]["domX"],
          domY: yOrigin
        };
        ctx.moveTo(prevP["domX"], prevP["domY"]);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = sortedPoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;
            ctx.lineTo(p["domX"], prevP["domY"]);
            ctx.lineTo(p["domX"], p["domY"]);
            prevP = p;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        ctx.lineTo(sortedPoints[l - 1]["domX"], yOrigin);
        ctx.closePath();
        ctx.fillStyle = COLOR_MAP["fill"];
        ctx.fill();
      } // Shade iNO

      {
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = COLOR_MAP["iNOAdministration"];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = iNOPair[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var rec = _step2.value;
            var startDomX = Math.round(rec["startDomX"]);
            var endDomX = Math.round(rec["endDomX"]);
            var drawWidth = endDomX - startDomX;

            if (drawWidth === 0) {
              continue;
            }

            ctx.fillRect(startDomX, 0, drawWidth, height);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        ctx.restore();
      } // Shade anesthetics

      {
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = COLOR_MAP["anestheticsAdministration"];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = anestheticsPair[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _rec = _step3.value;

            var _startDomX = Math.round(_rec["startDomX"]);

            var _endDomX = Math.round(_rec["endDomX"]);

            var _drawWidth = _endDomX - _startDomX;

            if (_drawWidth === 0) {
              continue;
            }

            ctx.fillRect(_startDomX, 0, _drawWidth, height);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        ctx.restore();
      } // Line

      {
        ctx.beginPath();
        var _prevP = {
          domX: sortedPoints[0]["domX"],
          domY: sortedPoints[0]["domY"]
        };
        ctx.moveTo(_prevP["domX"], _prevP["domY"]);
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = sortedPoints[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _p = _step4.value;
            ctx.lineTo(_p["domX"], _prevP["domY"]);
            ctx.lineTo(_p["domX"], _p["domY"]);
            _prevP = _p;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        ctx.strokeStyle = COLOR_MAP["stroke"];
        ctx.stroke();
      }
    }
  }]);

  return RespiratoryScorePlot;
}(_react.PureComponent);

var _default = RespiratoryScorePlot;
exports.default = _default;