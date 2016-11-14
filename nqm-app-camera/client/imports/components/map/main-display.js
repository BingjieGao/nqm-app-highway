import MapDisplay from "./map-display";
import GridDisplay from "./grid-display";
import React,{Component,PropTypes} from "react";
import DetailControl from "../controls/detailControl";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ContentAdd from 'material-ui/svg-icons/content/add';

class MainDisplay extends Component{

  constructor(props){
    super(props);
    this.state={
      sliderTime:this.props.timeData[0]["timestamp"],
      currentSrc:"",
      currentLatLng:{},
      updateState:true,
      mapDisplay:true,
      gridDisplay:false
    }
    this._handleClick = this._handleClick.bind(this);
    this._switchView = this._switchView.bind(this);
  }

  _switchView(){
    if(this.state.mapDisplay == true){
      this.setState({
        mapDisplay:false,
        gridDisplay:true,
        sliderTime:this.props.timeData[0]["timestamp"]
      })
    }else{
      this.setState({
        mapDisplay:true,
        gridDisplay:false
      })
    }
  }

  _handleClick(srcStr){
    console.log("click on grid");
    this.setState({
      currentSrc:srcStr
    })
  }
  componentWillMount(){
    this.setState({
      sliderTime: this.props.timeData[0]["timestamp"]
    })
  }

  componentWillReceiveProps(nextProps){
    var self = this;
    if(self.state.gridDisplay == false && self.state.mapDisplay == true){
      this.setState({
        sliderTime: this.props.timeData[0]["timestamp"]
      });
    }
  }

  render(){

    var self = this;
    let mapDisplay, gridDisplay = null;
    if(self.state.mapDisplay == true){
      mapDisplay = (<MapDisplay cameraData={self.props.cameraData} timeData={this.props.timeData}/>);
    }
    if(self.state.gridDisplay == true){
      gridDisplay = (<GridDisplay cameraData={self.props.cameraData} sliderTime={self.state.sliderTime} onPicture={this._handleClick}/>);
    }
    return(
        <div className="flex-container">
          <FloatingActionButton>
            <FontIcon className="material-icons switch-view" onTouchTap={this._switchView}>view_comfy</FontIcon>
          </FloatingActionButton>
          {mapDisplay}
          {gridDisplay}
        </div>
    );
  }
}

MainDisplay.propTypes={
  cameraData: PropTypes.array,
}

export default MainDisplay;
