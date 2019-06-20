import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RespitatoryPlot from "./lib/RespiratoryPlot";

class App extends Component {
  render() {
    return <RespitatoryPlot height={400}
                            width={800}
                            minX={0}
                            maxX={1000000}
                            />
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
