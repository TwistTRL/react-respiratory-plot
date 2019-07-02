import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RespitatoryPlot from "./lib/RespiratoryPlot";

const LOCATIONS = { 1:{id:1,name:"8s",start:0,end:180500},
                    2:{id:2,name:"8e",start:180500,end:350400},
                    3:{id:3,name:"8s",start:350400,end:522200},
                    4:{id:4,name:"other",start:522200,end:648800},
                    5:{id:5,name:"8e",start:648800,end:766600},
                    6:{id:6,name:"home",start:766600,end:766600}
                    };



const RSS = ( function(){
    let time = [...new Array(100),].map( i=>Math.random()*1000000 )
  }());

const ECMOScore = [];

class App extends Component {
  render() {
    return <RespitatoryPlot height={400}
                            width={800}
                            minX={0}
                            maxX={1000000}
                            locations={LOCATIONS}
                            />
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
