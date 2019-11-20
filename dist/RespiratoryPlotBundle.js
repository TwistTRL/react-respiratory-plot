"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoize = require("memoize");

var _reactPlotContainers = require("react-plot-containers");

var _reactPlotAxisPanel = require("react-plot-axis-panel");

var _reactPlotAxis = require("react-plot-axis");

var _reactPlotGradientOverlay = _interopRequireDefault(require("react-plot-gradient-overlay"));

var _reactLocationPlot = _interopRequireWildcard(require("react-location-plot"));

var _reactPlotInteractionBox = require("react-plot-interaction-box");

var _reactPlotVerticalCrosshair = _interopRequireWildcard(require("react-plot-vertical-crosshair"));

var _reactRespiratoryscoreTooltip = _interopRequireWildcard(require("react-respiratoryscore-tooltip"));

var _reactOnplotXranger = _interopRequireDefault(require("react-onplot-xranger"));

var _RespiratoryTypeYAxisSlabGrid = _interopRequireDefault(require("./RespiratoryTypeYAxisSlabGrid"));

var _RespiratoryTypeYAxisPanel = _interopRequireDefault(require("./RespiratoryTypeYAxisPanel"));

var _RespiratoryScorePlot = _interopRequireDefault(require("./RespiratoryScorePlot"));

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

var MINY = 0;
var MAXY = 100;
var LEFT_WIDTH = 200;
var RIGHT_WIDTH = 0;
var TOP_HEIGHT = 30;
var BOTTOM_HEIGHT = 30;
var LOCATION_PANEL_STRUCTURE = [{
  name: "",
  backgroundColor: "#656565",
  children: [{
    name: "Location",
    backgroundColor: "#feddaa"
  }]
}];
var TIME_PANEL_STRUCTURE = [{
  name: "",
  backgroundColor: "#656565",
  children: [{
    name: "Time",
    backgroundColor: "#feddaa"
  }]
}];

var RespiratoryPlotBundle =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(RespiratoryPlotBundle, _PureComponent);

  function RespiratoryPlotBundle(props) {
    var _this;

    _classCallCheck(this, RespiratoryPlotBundle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RespiratoryPlotBundle).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "indexLocation", (0, _memoize.memoize_one)(function (location) {
      return _this.indexArrayBy(location, "ID");
    }));

    _defineProperty(_assertThisInitialized(_this), "indexRSV", (0, _memoize.memoize_one)(function (respiratorySupportVariable) {
      return _this.indexArrayBy(respiratorySupportVariable, "ID");
    }));

    _defineProperty(_assertThisInitialized(_this), "selectLocation", function (location__selectedLocationID) {
      _this.setState({
        location__selectedLocationID: location__selectedLocationID
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectCrosshair", function (crosshairX) {
      var crosshairUpdateHandler = _this.props.crosshairUpdateHandler;
      crosshairUpdateHandler(crosshairX);
    });

    _defineProperty(_assertThisInitialized(_this), "selectTooltip", function (tooltip__hoveringTimeStamp, tooltip__selectedLocationID, tooltip__selectedRespiratorySupportVariableID, tooltip__hoveringClientX, tooltip__hoveringClientY) {
      _this.setState({
        tooltip__hoveringTimeStamp: tooltip__hoveringTimeStamp,
        tooltip__selectedRespiratorySupportVariableID: tooltip__selectedRespiratorySupportVariableID,
        tooltip__selectedLocationID: tooltip__selectedLocationID,
        tooltip__hoveringClientX: tooltip__hoveringClientX,
        tooltip__hoveringClientY: tooltip__hoveringClientY
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRangerUpdating", function (startX, endX) {
      var rangerUpdatingHandler = _this.props.rangerUpdatingHandler;
      rangerUpdatingHandler(startX, endX);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRangerUpdate", function (startX, endX) {
      var rangerUpdateHandler = _this.props.rangerUpdateHandler;
      rangerUpdateHandler(startX, endX);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRangerClick", function () {
      var rangerClickHandler = _this.props.rangerClickHandler;
      rangerClickHandler();
    });

    _defineProperty(_assertThisInitialized(_this), "handlePlotDblClick", function () {
      var plotDblClickHandler = _this.props.plotDblClickHandler;
      plotDblClickHandler();
    });

    _this.state = {
      tooltip__selectedLocationID: null,
      tooltip__selectedRespiratorySupportVariableID: null,
      tooltip__hoveringTimeStamp: null,
      tooltip__hoveringClientX: null,
      tooltip__hoveringClientY: null,
      location__selectedLocationID: null
    };
    return _this;
  }

  _createClass(RespiratoryPlotBundle, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          minX = _this$props.minX,
          maxX = _this$props.maxX,
          width = _this$props.width,
          height = _this$props.height,
          respiratorySupportVariable = _this$props.respiratorySupportVariable,
          iNOAdministration = _this$props.iNOAdministration,
          anestheticsAdministration = _this$props.anestheticsAdministration,
          location = _this$props.location,
          crosshairX = _this$props.crosshairX,
          startX = _this$props.startX,
          endX = _this$props.endX;
      var _this$state = this.state,
          tooltip__selectedLocationID = _this$state.tooltip__selectedLocationID,
          tooltip__selectedRespiratorySupportVariableID = _this$state.tooltip__selectedRespiratorySupportVariableID,
          tooltip__hoveringTimeStamp = _this$state.tooltip__hoveringTimeStamp,
          tooltip__hoveringClientX = _this$state.tooltip__hoveringClientX,
          tooltip__hoveringClientY = _this$state.tooltip__hoveringClientY,
          location__selectedLocationID = _this$state.location__selectedLocationID;
      var locationMap = this.indexLocation(location);
      var RSVMap = this.indexRSV(respiratorySupportVariable);
      var plotWidth = width - LEFT_WIDTH - RIGHT_WIDTH;
      var plotHeight = height - TOP_HEIGHT - BOTTOM_HEIGHT;
      return _react.default.createElement(_reactPlotContainers.PlotContainer, {
        leftWidth: LEFT_WIDTH,
        plotWidth: plotWidth,
        rightWidth: RIGHT_WIDTH,
        topHeight: TOP_HEIGHT,
        plotHeight: plotHeight,
        bottomHeight: BOTTOM_HEIGHT
      }, _react.default.createElement(_reactPlotContainers.PlotSubContainer, null, _react.default.createElement(_reactPlotAxisPanel.StaticYPanel, {
        categoryStructure: LOCATION_PANEL_STRUCTURE,
        width: LEFT_WIDTH,
        height: TOP_HEIGHT,
        rowHeight: TOP_HEIGHT
      })), _react.default.createElement(_reactPlotContainers.PlotSubContainer, null, _react.default.createElement(_reactLocationPlot.default, {
        width: plotWidth,
        height: TOP_HEIGHT,
        minX: minX,
        maxX: maxX,
        data: location
      }), _react.default.createElement(_reactLocationPlot.LocationPlotSelectionLabel, {
        width: plotWidth,
        height: TOP_HEIGHT,
        minX: minX,
        maxX: maxX,
        data: location,
        selection: location__selectedLocationID
      }), _react.default.createElement(_reactPlotInteractionBox.PlotInteractionProvider, {
        width: plotWidth,
        height: TOP_HEIGHT,
        transitionGraph: _reactPlotInteractionBox.INTERACTION_MODEL_BARE,
        render: function render(interactions) {
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactLocationPlot.LocationPlotHoverSelector, {
            data: location,
            minX: minX,
            maxX: maxX,
            width: plotWidth,
            hoveringPosition: interactions.hoveringPosition,
            selectHandler: _this2.selectLocation
          }));
        }
      })), _react.default.createElement(_reactPlotContainers.PlotSubContainer, null), _react.default.createElement(_reactPlotContainers.PlotSubContainer, null, _react.default.createElement(_RespiratoryTypeYAxisPanel.default, {
        width: LEFT_WIDTH,
        height: plotHeight,
        minY: MINY,
        maxY: MAXY
      })), _react.default.createElement(_reactPlotContainers.PlotSubContainer, null, _react.default.createElement(_RespiratoryTypeYAxisSlabGrid.default, {
        minY: MINY,
        maxY: MAXY,
        width: plotWidth,
        height: plotHeight
      }), _react.default.createElement(_reactPlotAxis.DateVerticalLineGrid, {
        width: plotWidth,
        height: plotHeight,
        minX: minX,
        maxX: maxX
      }), _react.default.createElement(_RespiratoryScorePlot.default, {
        respiratorySupportVariable: respiratorySupportVariable,
        iNOAdministration: iNOAdministration,
        anestheticsAdministration: anestheticsAdministration,
        minX: minX,
        maxX: maxX,
        width: plotWidth,
        minY: 0,
        maxY: 100,
        height: plotHeight
      }), _react.default.createElement(_reactPlotVerticalCrosshair.default, {
        width: plotWidth,
        height: plotHeight,
        minX: minX,
        maxX: maxX,
        X: crosshairX
      }), _react.default.createElement(_reactPlotInteractionBox.PlotInteractionProvider, {
        width: plotWidth,
        height: plotHeight,
        transitionGraph: _reactPlotInteractionBox.INTERACTION_MODEL_BARE,
        render: function render(interactions) {
          return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactPlotVerticalCrosshair.VerticalCrosshairSelector, {
            width: plotWidth,
            minX: minX,
            maxX: maxX,
            hoveringPosition: interactions["hoveringPosition"],
            selectHandler: _this2.selectCrosshair
          }), _react.default.createElement(_reactLocationPlot.LocationPlotHoverSelector, {
            data: location,
            minX: minX,
            maxX: maxX,
            width: plotWidth,
            hoveringPosition: interactions.hoveringPosition,
            selectHandler: _this2.selectLocation
          }), _react.default.createElement(_reactRespiratoryscoreTooltip.RespiratoryScoresTooltipSelector, {
            hoveringPosition: interactions.hoveringPosition,
            width: plotWidth,
            minX: minX,
            maxX: maxX,
            location: location,
            respiratorySupportVariable: respiratorySupportVariable,
            selectHandler: _this2.selectTooltip
          }), _react.default.createElement(_reactOnplotXranger.default, {
            minX: minX,
            maxX: maxX,
            width: plotWidth,
            height: plotHeight,
            startX: startX,
            endX: endX,
            snap: 3600 * 1000,
            showHandle: true,
            updatingHandler: _this2.handleRangerUpdating,
            updateHandler: _this2.handleRangerUpdate,
            clickHandler: _this2.handleRangerClick
          }));
        }
      })), _react.default.createElement(_reactPlotContainers.PlotSubContainer, null), _react.default.createElement(_reactPlotContainers.PlotSubContainer, null, _react.default.createElement(_reactPlotAxisPanel.StaticYPanel, {
        categoryStructure: TIME_PANEL_STRUCTURE,
        width: LEFT_WIDTH,
        height: BOTTOM_HEIGHT,
        rowHeight: BOTTOM_HEIGHT
      })), _react.default.createElement(_reactPlotContainers.PlotSubContainer, null, _react.default.createElement("div", {
        style: {
          width: plotWidth,
          height: BOTTOM_HEIGHT,
          backgroundColor: "#feddaa"
        }
      }), _react.default.createElement(_reactPlotAxis.DateXAxis, {
        width: plotWidth,
        height: BOTTOM_HEIGHT,
        minX: minX,
        maxX: maxX,
        tickPosition: "top"
      })), _react.default.createElement(_reactPlotContainers.PlotSubContainer, null), _react.default.createElement("div", {
        style: {
          position: "absolute",
          left: LEFT_WIDTH,
          pointerEvents: "none"
        }
      }, _react.default.createElement(_reactPlotGradientOverlay.default, {
        width: 10,
        height: height
      }), _react.default.createElement(_reactRespiratoryscoreTooltip.default, {
        timeStamp: tooltip__hoveringTimeStamp,
        location: tooltip__selectedLocationID === null ? null : locationMap[tooltip__selectedLocationID],
        ECMOVADVariable: null,
        respiratorySuppportVariable: tooltip__selectedRespiratorySupportVariableID === null ? null : RSVMap[tooltip__selectedRespiratorySupportVariableID],
        clientX: tooltip__hoveringClientX,
        clientY: tooltip__hoveringClientY
      })));
    }
  }, {
    key: "indexArrayBy",
    value: function indexArrayBy(array, key) {
      var ret = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var rec = _step.value;
          ret[rec[key]] = rec;
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

      return ret;
    }
  }]);

  return RespiratoryPlotBundle;
}(_react.PureComponent);

RespiratoryPlotBundle.propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  minX: _propTypes.default.number.isRequired,
  maxX: _propTypes.default.number.isRequired,
  location: _propTypes.default.array.isRequired,
  respiratorySupportVariable: _propTypes.default.array.isRequired,
  iNOAdministration: _propTypes.default.array.isRequired,
  anestheticsAdministration: _propTypes.default.array.isRequired,
  rangerUpdateHandler: _propTypes.default.func.isRequired,
  rangerClickHandler: _propTypes.default.func.isRequired
};
var _default = RespiratoryPlotBundle;
exports.default = _default;