import React, {PureComponent} from "react";
import PropTypes from "prop-types";
// Components
import {PlotContainer, PlotSubContainer} from "react-plot-containers";
import {StaticYPanel} from "react-plot-axis-panel";
import {DateXAxis, DateVerticalLineGrid} from "react-plot-axis";
import GradientOverlay from "react-plot-gradient-overlay";
// Some specialized components
import RespiratoryTypeYAxisSlabGrid from "./components/RespiratoryTypeYAxisSlabGrid";
import RespiratoryTypeYAxisPanel from "./components/RespiratoryTypeYAxisPanel";

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

class RespiratoryPlot extends PureComponent {
  render(){
    let {minX,maxX,width,height} = this.props;
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
          {/*STUFF HERE*/}
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
        <div style={{position:"absolute",left:LEFT_WIDTH}}>
          <GradientOverlay  width={10}
                            height={height}
                            />
        </div>
      </PlotContainer>
    );
  }
}

RespiratoryPlot.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minX: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  //~ RSS_score, // [ {time,score} ]
  //~ RSS_variables, // [ {time,...variables} ]
  //~ locations, // [ {time,start,end,name} ]
  //~ procedures, // [ {time,start,end,name} ]
}

export default RespiratoryPlot;
