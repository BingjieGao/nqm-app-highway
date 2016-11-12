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
      mapData:[],
      sliderTime:this.props.timeData[0]["timestamp"],
      currentSrc:"",
      currentLatLng:{},
      updateState:true
    }
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(srcStr){
    console.log("click on grid");
    this.setState({
      currentSrc:srcStr
    })
  }
  componentWillMount(){
    this.setState({
      mapData:this.props.cameraData,
      sliderTime: this.props.timeData[0]["timestamp"]
    })
  }

  componentWillReceiveProps(nextProps){
    if(document.getElementById("main-grid").style.display == "block" && this.state.updateState == true){
      console.log("will receive");
      this.setState({
        mapData:nextProps.cameraData,
        sliderTime: nextProps.timeData[0]["timestamp"],
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
        <GridDisplay cameraData={this.state.mapData} sliderTime={this.state.sliderTime} onPicture={this._handleClick}/>
      </div>
    );
  }
}

MainDisplay.propTypes={
  cameraData: PropTypes.array,
}

export default MainDisplay;
