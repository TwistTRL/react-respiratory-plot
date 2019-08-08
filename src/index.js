import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RespiratoryPlotBundle from "./lib";
import {DATA_MIN_X,DATA_MAX_X,
        RESPIRTORY_SUPPORT_VARIABLE,
        INO_ADMINISTRATION,
        ANESTHETICS_ADMINISTRATION,
        LOCATION} from "./sampleData";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {startX:DATA_MAX_X-3600*1000*7,
                  endX:DATA_MAX_X,
                  minX: DATA_MIN_X,
                  maxX: DATA_MAX_X
                  };
  }
  
  render() {
    let { startX,endX,
          minX,maxX} = this.state;
    return <RespiratoryPlotBundle height={400}
                                  width={800}
                                  minX={minX}
                                  maxX={maxX}
                                  startX={startX}
                                  endX={endX}
                                  respiratorySupportVariable={RESPIRTORY_SUPPORT_VARIABLE}
                                  iNOAdministration={INO_ADMINISTRATION}
                                  anestheticsAdministration={ANESTHETICS_ADMINISTRATION}
                                  location={LOCATION}
                                  rangerUpdatingHandler={this.handleRangerUpdating}
                                  rangerUpdateHandler={this.handleRangerUpdate}
                                  rangerClickHandler={this.handleRangerClick}
                                  />
  }

  handleRangerUpdating = (startX,endX)=>{
    this.setState({startX,endX});
  }

  handleRangerUpdate = (startX,endX)=>{
    this.setState({startX,endX});
  }

  handleRangerClick = ()=>{
    let {minX,maxX,startX,endX} = this.state;
    if (startX===minX && endX===maxX) {
      this.setState({ minX:DATA_MIN_X,
                      maxX:DATA_MAX_X
                      });
    }
    else {
      this.setState({ minX:startX,
                      maxX:endX
                      });
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
