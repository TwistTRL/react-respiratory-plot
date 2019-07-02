import React, {PureComponent} from "react";
import PropTypes from "prop-types";
// Components
import {PlotContainer, PlotSubContainer} from "react-plot-containers";
import {StaticYPanel} from "react-plot-axis-panel";
import {DateXAxis, DateVerticalLineGrid} from "react-plot-axis";
import GradientOverlay from "react-plot-gradient-overlay";
import LocationPlot, {LocationPlotSelectionLabel,LocationPlotHoverSelector} from "react-location-plot";
import {PlotInteractionProvider,INTERACTION_MODEL_BARE} from "react-plot-interaction-box";
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
  constructor(props){
    super(props);
    this.state = {selectedLocationID:null,
                  };
  }

  selectLocation = (id)=>{
    this.setState({selectedLocationID:id});
  }
  
  render(){
    let {minX,maxX,width,height,locations} = this.props;
    let {selectedLocationID} = this.state;
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
                          data={locations}
                          />
          <LocationPlotSelectionLabel width={plotWidth}
                                      height={TOP_HEIGHT}
                                      minX={minX}
                                      maxX={maxX}
                                      data={locations}
                                      selection={selectedLocationID}
                                      />
          <PlotInteractionProvider  width={plotWidth} height={TOP_HEIGHT}
                                    transitionGraph={INTERACTION_MODEL_BARE}
                                    render={(positions)=>
            <>
              <LocationPlotHoverSelector  data={locations}
                                          minX={minX}
                                          maxX={maxX}
                                          width={plotWidth}
                                          hoveringPosition={positions.hoveringPosition}
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
  locations: PropTypes.object.isRequired,
  //~ RSS_score, // [ {time,score} ]
  //~ RSS_variables, // [ {time,...variables} ]
  //~ locations, // [ {time,start,end,name} ]
  //~ procedures, // [ {time,start,end,name} ]
}

export default RespiratoryPlot;
