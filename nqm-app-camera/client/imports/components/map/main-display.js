import MapDisplay from "./map-display";
import GridDisplay from "./grid-display";
import React,{Component,PropTypes} from "react";
import DetailControl from "../controls/detailControl";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";

class MainDisplay extends Component{

  constructor(props){
    super(props);
    var originalData = props.cameraData;
    this.state={
      mapData:originalData,
      currentSrc:"",
      currentLatLng:{},
      updateState:true
    }
    this._handleClick = this._handleClick.bind(this);
    this._renderGridwithData = this._renderGridwithData.bind(this);
  }
  _handleClick(srcStr){
    console.log("click on grid");
    this.setState({
      currentSrc:srcStr
    })
  }
  _renderGridwithData(){
    this.setState({
      mapData:this.props.cameraData
    })
  }
  componentWillReceiveProps(nextProps){
    if(document.getElementById("main-grid").style.display == "block" && this.state.updateState){
      console.log("will receive");
      this.setState({
        mapData:nextProps.cameraData,
        updateState:false
      })
    }else if(document.getElementById("main-grid").style.display == "none"){
      this.setState({
        updateState:true
      })
    }
  }

  render(){
    return(
      <div className="flex-container">
        <MapDisplay cameraData={this.props.cameraData} timeData={this.props.timeData}/>
        <GridDisplay cameraData={this.state.mapData} timeData={this.props.timeData} onPicture={this._handleClick}/>
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
