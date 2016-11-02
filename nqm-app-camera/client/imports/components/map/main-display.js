import MapDisplay from "./map-display";
import GridDisplay from "./grid-display";
import React,{Component,PropTypes} from "react";
import DetailControl from "../controls/detailControl";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";

class MainDisplay extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="flex-container">
        <MapDisplay cameraData={this.props.cameraData}/>
        <GridDisplay cameraData={this.props.cameraData}/>
        <Paper className="flex-items" id="detail-control">
        </Paper>
      </div>
    );
  }
}

MainDisplay.propTypes={
  cameraData:PropTypes.array
}

export default MainDisplay;
