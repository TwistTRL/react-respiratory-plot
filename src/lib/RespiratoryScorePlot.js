import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {memoize_one} from "memoize";
import {bisect_left, bisect_right} from "bisect";
import {toDomXCoord_Linear,
        toDomYCoord_Linear} from "plot-utils";

const COLOR_MAP = {
  "fill":"rgba(0,0,230,0.2)",
  "stroke":"rgb(0,0,230)",
  "iNOAdministration":"red",
  "anestheticsAdministration":"green",
};

const RSV_X_KEY = "TIME";
const RSV_Y_KEY = "RSS";
const INO_START_KEY = "START";
const INO_END_KEY = "END";
const ANESTHETICS_START_KEY = "START";
const ANESTHETICS_END_KEY = "END";

class RespiratoryScorePlot extends PureComponent {
  constructor(props){
    super(props);
    this.ref = React.createRef();
  }

  render() {
    let { width,height } = this.props;
    return (
      <canvas ref={this.ref} height={height} width={width} style={{display:"block",width:width,height:height}}></canvas>
    );
  }

  componentDidMount(){
    this.draw();
  }
  
  componentDidUpdate(){
    this.draw();
  }

  draw() {
    let { respiratorySupportVariable,
          iNOAdministration,
          anestheticsAdministration,
          minX,maxX,width,
          minY,maxY,height
          } = this.props;
    let sortedRSV = this.getSortedRSV(respiratorySupportVariable);
    let sortedRSVInRange = this.getSortedRSVInRange(sortedRSV,minX,maxX);
    let sortedPoints = this.getSortedPoints(sortedRSVInRange,width,minX,maxX,height,minY,maxY);
    let iNOInRange = this.getINOInRange(iNOAdministration,minX,maxX);
    let iNOPair = this.getINOPair(iNOInRange,width,minX,maxX,height,minY,maxY);
    let anestheticsInRange = this.getAnestheticsInRange(anestheticsAdministration,minX,maxX);
    let anestheticsPair = this.getAnestheticsPair(anestheticsInRange,width,minX,maxX,height,minY,maxY);
    // Clear plots
    let canvas = this.ref.current;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,width,height);
    // fill step plot
    let yOrigin = toDomYCoord_Linear(height,minY,maxY,0);
    this.fillStepPlot(ctx,width,height,yOrigin,sortedPoints,iNOPair,anestheticsPair);
  }

  getSortedRSV = memoize_one( (RSV)=>{
    return RSV.sort( (a,b)=>a[RSV_X_KEY]-b[RSV_X_KEY] );
  });

  getX = memoize_one( (RSV)=>{
    return RSV.map( (rec)=>rec[RSV_X_KEY] );
  });

  getSortedRSVInRange(sortedRSV,minX,maxX) {
    let sortedX = this.getX(sortedRSV);
    let startIdx = Math.max(0,bisect_left(sortedX,minX));
    let endIdx = Math.min(bisect_right(sortedX,maxX),sortedRSV.length-1);
    return sortedRSV.slice(startIdx,endIdx+1);
  }

  getSortedPoints(sortedRSV,width,minX,maxX,height,minY,maxY) {
    let sortedPoints = sortedRSV.map( obj=>{
        let domX = toDomXCoord_Linear(width,minX,maxX,obj[RSV_X_KEY]);
        let domY = toDomYCoord_Linear(height,minY,maxY,obj[RSV_Y_KEY]);
        return {domX,domY};
      });
    return sortedPoints;
  }

  getINOInRange(iNOAdministration,minX,maxX){
    return iNOAdministration.filter( (rec)=>!(rec[INO_END_KEY]<=minX || rec[INO_START_KEY]>=maxX) );
  }

  getINOPair(iNOAdministration,width,minX,maxX,height,minY,maxY) {
    let iNOPair = iNOAdministration.map( obj=>{
        let startDomX = toDomXCoord_Linear(width,minX,maxX,obj[INO_START_KEY]);
        let endDomX = toDomXCoord_Linear(width,minX,maxX,obj[INO_END_KEY]);
        return {startDomX,endDomX};
      });
    return iNOPair;
  }

  getAnestheticsInRange(anestheticsAdministration,minX,maxX){
    return anestheticsAdministration.filter( (rec)=>!(rec[ANESTHETICS_END_KEY]<=minX || rec[ANESTHETICS_START_KEY]>=maxX) );
  }

  getAnestheticsPair(anestheticsAdministration,width,minX,maxX,height,minY,maxY) {
    let anestheticsPair = anestheticsAdministration.map( obj=>{
        let startDomX = toDomXCoord_Linear(width,minX,maxX,obj[ANESTHETICS_START_KEY]);
        let endDomX = toDomXCoord_Linear(width,minX,maxX,obj[ANESTHETICS_END_KEY]);
        return {startDomX,endDomX};
      });
    return anestheticsPair;
  }
  
  fillStepPlot( ctx,width,height,yOrigin,sortedPoints,
                iNOPair,anestheticsPair) {
    let l = sortedPoints.length;
    if (l===0 || l===1) {
      return;
    }
    // Fill
    {
      ctx.beginPath();
      let prevP = {domX:sortedPoints[0]["domX"],domY:yOrigin};
      ctx.moveTo(prevP["domX"],prevP["domY"]);
      for (let p of sortedPoints) {
        ctx.lineTo(p["domX"],prevP["domY"]);
        ctx.lineTo(p["domX"],p["domY"]);
        prevP = p;
      }
      ctx.lineTo(sortedPoints[l-1]["domX"],yOrigin);
      ctx.closePath();
      ctx.fillStyle = COLOR_MAP["fill"];
      ctx.fill();
    }
    // Shade iNO
    {
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = COLOR_MAP["iNOAdministration"];
      for (let rec of iNOPair) {
        let startDomX = Math.round(rec["startDomX"]);
        let endDomX = Math.round(rec["endDomX"]);
        let drawWidth = endDomX-startDomX;
        if (drawWidth===0) {
          continue;
        }
        ctx.fillRect(startDomX,0,drawWidth,height);
      }
      ctx.restore();
    }
    // Shade anesthetics
    {
      ctx.save();
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = COLOR_MAP["anestheticsAdministration"];
      for (let rec of anestheticsPair) {
        let startDomX = Math.round(rec["startDomX"]);
        let endDomX = Math.round(rec["endDomX"]);
        let drawWidth = endDomX-startDomX;
        if (drawWidth===0) {
          continue;
        }
        ctx.fillRect(startDomX,0,drawWidth,height);
      }
      ctx.restore();
    }
    // Line
    {
      ctx.beginPath();
      let prevP = {domX:sortedPoints[0]["domX"],domY:sortedPoints[0]["domY"]};
      ctx.moveTo(prevP["domX"],prevP["domY"]);
      for (let p of sortedPoints) {
        ctx.lineTo(p["domX"],prevP["domY"]);
        ctx.lineTo(p["domX"],p["domY"]);
        prevP = p;
      }
      ctx.strokeStyle = COLOR_MAP["stroke"];
      ctx.stroke();
    }
  }
}

export default RespiratoryScorePlot;
