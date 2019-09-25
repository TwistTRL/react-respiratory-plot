import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {memoize_one} from "memoize";
// Components
import {PlotContainer, PlotSubContainer} from "react-plot-containers";
import {StaticYPanel} from "react-plot-axis-panel";
import {DateXAxis, DateVerticalLineGrid} from "react-plot-axis";
import GradientOverlay from "react-plot-gradient-overlay";
import LocationPlot, {LocationPlotSelectionLabel,LocationPlotHoverSelector} from "react-location-plot";
import {PlotInteractionProvider,INTERACTION_MODEL_BARE} from "react-plot-interaction-box";
import VerticalCrosshair, {VerticalCrosshairSelector} from "react-plot-vertical-crosshair";
import RespiratoryScoresTooltip, {RespiratoryScoresTooltipSelector} from "react-respiratoryscore-tooltip";
import OnPlotXRanger from "react-onplot-xranger";
// Some specialized components
import RespiratoryTypeYAxisSlabGrid from "./RespiratoryTypeYAxisSlabGrid";
import RespiratoryTypeYAxisPanel from "./RespiratoryTypeYAxisPanel";
import RespiratoryScorePlot from "./RespiratoryScorePlot";

const MINY = 0;
const MAXY = 100;

const LEFT_WIDTH = 150
const RIGHT_WIDTH = 0
const TOP_HEIGHT = 30
const BOTTOM_HEIGHT = 30

const LOCATION_PANEL_STRUCTURE = [
  {name:"",backgroundColor:"#656565",children:[{name:"Location",backgroundColor:"#feddaa"}]},
];

const TIME_PANEL_STRUCTURE = [
  {name:"",backgroundColor:"#656565",children:[{name:"Time",backgroundColor:"#feddaa"}]},
];

class RespiratoryPlotBundle extends PureComponent {
  constructor(props){
    super(props);
    this.state = {tooltip__selectedLocationID: null,
                  tooltip__selectedRespiratorySupportVariableID: null,
                  tooltip__hoveringTimeStamp: null,
                  tooltip__hoveringClientX: null,
                  tooltip__hoveringClientY: null,
                  location__selectedLocationID: null,
                  };
  }
  
  render(){
    let { minX,maxX,width,height,
          respiratorySupportVariable,
          iNOAdministration,
          anestheticsAdministration,
          location,
          crosshairX,
          startX,endX,
          } = this.props;
    let { tooltip__selectedLocationID,
          tooltip__selectedRespiratorySupportVariableID,
          tooltip__hoveringTimeStamp,
          tooltip__hoveringClientX,
          tooltip__hoveringClientY,
          location__selectedLocationID
          } = this.state;
    let locationMap = this.indexLocation(location);
    let RSVMap = this.indexRSV(respiratorySupportVariable);
    let plotWidth = width - LEFT_WIDTH - RIGHT_WIDTH;
    let plotHeight = height - TOP_HEIGHT - BOTTOM_HEIGHT;
    return (
      <PlotContainer  leftWidth={LEFT_WIDTH}
                      plotWidth={plotWidth}
                      rightWidth={RIGHT_WIDTH}
                      topHeight={TOP_HEIGHT}
                      plotHeight={plotHeight}
                      bottomHeight={BOTTOM_HEIGHT}
                      >
        {/*===========================*/}
        <PlotSubContainer>
          <StaticYPanel categoryStructure={LOCATION_PANEL_STRUCTURE}
                        width={LEFT_WIDTH}
                        height={TOP_HEIGHT}
                        rowHeight={TOP_HEIGHT}
                        />
        </PlotSubContainer>
        <PlotSubContainer>
          <LocationPlot   width={plotWidth}
                          height={TOP_HEIGHT}
                          minX={minX}
                          maxX={maxX}
                          data={location}
                          />
          <LocationPlotSelectionLabel width={plotWidth}
                                      height={TOP_HEIGHT}
                                      minX={minX}
                                      maxX={maxX}
                                      data={location}
                                      selection={location__selectedLocationID}
                                      />
          <PlotInteractionProvider  width={plotWidth} height={TOP_HEIGHT}
                                    transitionGraph={INTERACTION_MODEL_BARE}
                                    render={(interactions)=>
            <>
              <LocationPlotHoverSelector  data={location}
                                          minX={minX}
                                          maxX={maxX}
                                          width={plotWidth}
                                          hoveringPosition={interactions.hoveringPosition}
                                          selectHandler={this.selectLocation}
                                          />
            </>
                                    }/>
        </PlotSubContainer>
        <PlotSubContainer>
          {/*STUFF HERE*/}
        </PlotSubContainer>
        {/*===========================*/}
        <PlotSubContainer>
          <RespiratoryTypeYAxisPanel  width={LEFT_WIDTH}
                                      height={plotHeight}
                                      minY={MINY}
                                      maxY={MAXY}
                                      />
        </PlotSubContainer>
        <PlotSubContainer>
          <RespiratoryTypeYAxisSlabGrid minY={MINY}
                                        maxY={MAXY}
                                        width={plotWidth}
                                        height={plotHeight}
                                        />
          <DateVerticalLineGrid width={plotWidth}
                                height={plotHeight}
                                minX={minX}
                                maxX={maxX}
                                />
          <RespiratoryScorePlot respiratorySupportVariable={respiratorySupportVariable}
                                iNOAdministration={iNOAdministration}
                                anestheticsAdministration={anestheticsAdministration}
                                minX={minX} maxX={maxX} width={plotWidth}
                                minY={0} maxY={100} height={plotHeight}
                                />
          <VerticalCrosshair  width={plotWidth}
                              height={plotHeight}
                              minX={minX}
                              maxX={maxX}
                              X={crosshairX}
                              />
          <PlotInteractionProvider  width={plotWidth} height={plotHeight}
                                    transitionGraph={INTERACTION_MODEL_BARE}
                                    render={(interactions)=>
            <>
              <VerticalCrosshairSelector  width={plotWidth}
                                          minX={minX}
                                          maxX={maxX}
                                          hoveringPosition={interactions["hoveringPosition"]}
                                          selectHandler={this.selectCrosshair}
                                          />
              <LocationPlotHoverSelector  data={location}
                                          minX={minX}
                                          maxX={maxX}
                                          width={plotWidth}
                                          hoveringPosition={interactions.hoveringPosition}
                                          selectHandler={this.selectLocation}
                                          />
              <RespiratoryScoresTooltipSelector hoveringPosition={interactions.hoveringPosition}
                                                width={plotWidth}
                                                minX={minX}
                                                maxX={maxX}
                                                location={location}
                                                respiratorySupportVariable={respiratorySupportVariable}
                                                selectHandler={this.selectTooltip}
                                                />
              <OnPlotXRanger  minX={minX}
                              maxX={maxX}
                              width={plotWidth}
                              height={plotHeight}
                              startX={startX}
                              endX={endX}
                              snap={3600*1000}
                              showHandle={true}
                              updatingHandler={ this.handleRangerUpdating }
                              updateHandler={ this.handleRangerUpdate }
                              clickHandler={ this.handleRangerClick }
                              />
            </>
                                    }/>
        </PlotSubContainer>
        <PlotSubContainer>
          {/*STUFF HERE*/}
        </PlotSubContainer>
        {/*===========================*/}
        <PlotSubContainer>
          <StaticYPanel categoryStructure={TIME_PANEL_STRUCTURE}
                        width={LEFT_WIDTH}
                        height={BOTTOM_HEIGHT}
                        rowHeight={BOTTOM_HEIGHT}
                        />
        </PlotSubContainer>
        <PlotSubContainer>
          <div style={{width:plotWidth,height:BOTTOM_HEIGHT,backgroundColor:"#feddaa"}}></div>
          <DateXAxis  width={plotWidth}
                      height={BOTTOM_HEIGHT}
                      minX={minX}
                      maxX={maxX}
                      tickPosition={"top"}
                      />
        </PlotSubContainer>
        <PlotSubContainer>
          {/*STUFF HERE*/}
        </PlotSubContainer>
        {/*Other absolutely positioned stuff*/}
        <div style={{position:"absolute",left:LEFT_WIDTH,pointerEvents:"none"}}>
          <GradientOverlay  width={10}
                            height={height}
                            />
          <RespiratoryScoresTooltip timeStamp={tooltip__hoveringTimeStamp}
                                    location={tooltip__selectedLocationID===null?null:locationMap[tooltip__selectedLocationID]}
                                    ECMOVADVariable={null}
                                    respiratorySuppportVariable={tooltip__selectedRespiratorySupportVariableID===null?null: RSVMap[tooltip__selectedRespiratorySupportVariableID]}
                                    clientX={tooltip__hoveringClientX}
                                    clientY={tooltip__hoveringClientY}
                                    />
        </div>
      </PlotContainer>
    );
  }

  indexArrayBy(array,key) {
    let ret = {};
    for (let rec of array) {
      ret[rec[key]] = rec;
    }
    return ret;
  }

  indexLocation = memoize_one((location)=>{
    return this.indexArrayBy(location,"ID");
  });

  indexRSV = memoize_one((respiratorySupportVariable)=>{
    return this.indexArrayBy(respiratorySupportVariable,"ID");
  });

  selectLocation = (location__selectedLocationID)=>{
    this.setState({location__selectedLocationID});
  }
  
  selectCrosshair = (crosshairX)=>{
    let {crosshairUpdateHandler} = this.props;
    crosshairUpdateHandler(crosshairX)
  }

  selectTooltip =  (tooltip__hoveringTimeStamp,
                    tooltip__selectedLocationID,
                    tooltip__selectedRespiratorySupportVariableID,
                    tooltip__hoveringClientX,
                    tooltip__hoveringClientY
                    )=>{
    this.setState({ tooltip__hoveringTimeStamp,
                    tooltip__selectedRespiratorySupportVariableID,
                    tooltip__selectedLocationID,
                    tooltip__hoveringClientX,
                    tooltip__hoveringClientY});
  }

  handleRangerUpdating = (startX,endX)=>{
    let {rangerUpdatingHandler} = this.props;
    rangerUpdatingHandler(startX,endX);
  }

  handleRangerUpdate = (startX,endX)=>{
    let {rangerUpdateHandler} = this.props;
    rangerUpdateHandler(startX,endX);
  }

  handleRangerClick = ()=>{
    let {rangerClickHandler} = this.props;
    rangerClickHandler();
  }
  
  handlePlotDblClick = ()=>{
    let {plotDblClickHandler} = this.props;
    plotDblClickHandler();
  }
}

RespiratoryPlotBundle.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  location: PropTypes.array.isRequired,
  respiratorySupportVariable: PropTypes.array.isRequired,
  iNOAdministration: PropTypes.array.isRequired,
  anestheticsAdministration: PropTypes.array.isRequired,
  rangerUpdateHandler: PropTypes.func.isRequired,
  rangerClickHandler: PropTypes.func.isRequired,
}

export default RespiratoryPlotBundle;
