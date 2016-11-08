import MapDisplay from "./map-display";
import GridDisplay from "./grid-display";
import React,{Component,PropTypes} from "react";
import DetailControl from "../controls/detailControl";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";

class MainDisplay extends Component{

  constructor(props){
    super(props);
    this.state={
      mapData:props.cameraData,
      currentSrc:"",
      currentLatLng:{}
    }
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(srcStr){
    console.log("click on marker");
    this.setState({
      currentSrc:srcStr
    })
  }
  render(){
    return(
      <div className="flex-container">
        <MapDisplay cameraData={this.props.cameraData} timeData={this.props.timeData} onMarker={this._handleClick}/>
        <GridDisplay cameraData={this.props.cameraData} timeData={this.props.timeData} onPicture={this._handleClick}/>
        <Paper className="flex-items" id="detail-control">
            <DetailControl src={this.state.currentSrc} LatLng={this.state.currentLatLng}/>
        </Paper>
      </div>
    );
  }
}

MainDisplay.propTypes={
  cameraData: PropTypes.array,
}

export default MainDisplay;
