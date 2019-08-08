import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {LinearSpaceYPanel} from "react-plot-axis-panel";

const CATEGORY_STRUCTURE = [
  {name:"",backgroundColor:"#a8e6e3",
    start:0,end:25,
    children:[{name:"MASK/BB/NC",start:0,end:5},
              {name:"HFNC/CPAP",start:5,end:15},
              {name:"BIPAP",start:15,end:25}
              ]},
  {name:"",backgroundColor:"#fb8730",
    start:25,end:80,
    children:[{name:"BVM/PSV",start:25,end:35},
              {name:"PCV/VCV",start:35,end:70},
              {name:"HFOV/HFJV",start:70,end:80}
              ]},
  {name:"",backgroundColor:"#ee1621",
    start:80,end:100,
    children:[{name:"ECMO",start:80,end:100}]},
]

class RespiratoryTypeYAxisPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.ref= React.createRef();
  }
  
  render() {
    let {width,height,minY,maxY} = this.props;
    return (
      <LinearSpaceYPanel  categoryStructure={CATEGORY_STRUCTURE}
                          height={height}
                          width={width}
                          minY={minY}
                          maxY={maxY}
                          />
    );
  }
}

RespiratoryTypeYAxisPanel.propTypes = {
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default RespiratoryTypeYAxisPanel;


