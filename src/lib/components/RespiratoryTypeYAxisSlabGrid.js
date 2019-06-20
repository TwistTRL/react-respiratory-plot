import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {toDomYCoord_Linear} from "plot-utils";

const SLAB = [{start:0,end:5,color:"#fffef9"},
              {start:5,end:15,color:"#fff7e4"},
              {start:15,end:25,color:"#fffef9"},
              {start:25,end:35,color:"#fff7e4"},
              {start:35,end:70,color:"#fffef9"},
              {start:70,end:80,color:"#fff7e4"},
              {start:80,end:100,color:"#fffef9"},
              ];

class RespiratoryTypeYAxisSlabGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.ref= React.createRef();
  }
  
  render() {
    let {width,height} = this.props;
    return (
      <canvas ref={this.ref}  width={1} height={height}
                              style={{width:width,height:height,display:"block"}}
                              >
      </canvas>
    );
  }

  componentDidMount(){
    this.draw();
  }
  
  componentDidUpdate() {
    this.draw();
  }

  draw() {
    let { minY,maxY,
          height} = this.props;
    // Plot
    let canvas = this.ref.current;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,1,height);
    for (let row of SLAB){
      let start = Math.round(toDomYCoord_Linear(height,minY,maxY,row.end));
      let end = Math.round(toDomYCoord_Linear(height,minY,maxY,row.start));
      ctx.fillStyle = row.color;
      ctx.fillRect(0,start,1,end-start);
    }
  }
}

RespiratoryTypeYAxisSlabGrid.propTypes = {
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default RespiratoryTypeYAxisSlabGrid;


