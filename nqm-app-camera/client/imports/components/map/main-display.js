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
import {Meteor} from "meteor/meteor";

class MainDisplay extends Component{

  constructor(props){
    super(props);
    this.state={
      currentTime:this.props.timeData[0]["timestamp"],
      currentIndex:this.props.timeData[0]["DictIndex"],
      currentSrc:"",
      currentLatLng:{},
      updateState:true,
      mapDisplay:true,
      gridDisplay:false,
      disableBefore:false,
      disableNext: false
    }
    this._switchView = this._switchView.bind(this);
    this._changeStateIndex = this._changeStateIndex.bind(this);
    this._checkStateIndex = this._checkStateIndex.bind(this);
  }

  _switchView(){
    if(this.state.mapDisplay == true){
      this.setState({
        mapDisplay:false,
        gridDisplay:true,
        currentTime:this.props.timeData[0]["timestamp"]
      })
    }else{
      this.setState({
        mapDisplay:true,
        gridDisplay:false
      })
    }
  }
  _checkStateIndex(){
    console.log('check Index now is '+this.state.currentIndex);
    console.log("current dict length is "+ this.props.timeData[0]["DictIndex"]);
    if(this.state.currentIndex >0 ){
      this.setState({
        disableBefore: false
      })
    }else{
      this.setState({
        disableBefore: true
      })
    }
    if(this.state.currentIndex < this.props.timeData[0]["DictIndex"] ){
      this.setState({
        disableNext: false
      })
    }else{
      this.setState({
        disableNext: true
      })
    }
  }
  _changeStateIndex(currentIndex){
    this.setState({
      currentIndex:currentIndex
    });
    this._checkStateIndex();
  }

  componentWillMount(){
    this.setState({
      currentTime: this.props.timeData[0]["timestamp"]
    });
    this._checkStateIndex();
  }

  componentWillReceiveProps(nextProps){
    if(this.state.gridDisplay == false && this.state.mapDisplay == true){
      this.setState({
        currentTime: this.props.timeData[0]["timestamp"],
        currentIndex: this.props.timeData[0]["DictIndex"]
      });
    }else{
      this.setState({
        currentIndex:(this.state.currentIndex - 1)>0?this.state.currentIndex - 1:0
      })
    }
    this._checkStateIndex();
  }


  render(){
    const appBarHeight = Meteor.settings.public.showAppBar !== false ? 50 : 0;
    const leftPanelWidth = 170;
    const styles = {
      root: {
        height: "100%"
      },
      mainPanel: {
        position: "absolute",        
        top: appBarHeight,
        bottom: 0,
        left: 0,
        right: 0
      },
      leftPanel: {
        background: "white",
        position: "fixed",
        top: appBarHeight,
        bottom: 0,
        width: leftPanelWidth
      }
    };
    let mapDisplay, gridDisplay = null;
    if(this.state.mapDisplay == true){
      mapDisplay = (<MapDisplay cameraData={this.props.cameraData} timeData={this.props.timeData}/>);
    }
    if(this.state.gridDisplay == true){
      gridDisplay = (<GridDisplay 
                        cameraData={this.props.cameraData} 
                        currentTime={this.state.currentTime} 
                        currentIndex={this.state.currentIndex}
                        changeStateIndex={this._changeStateIndex}
                        disableBefore={this.state.disableBefore}
                        disableNext = {this.state.disableNext}
                    />);
    }
    return(
        <div style={styles.root}>
          <div style={styles.mainPanel}>
            {mapDisplay}
            {gridDisplay}
          </div>
          <div id="floating-btn">
            <FloatingActionButton>
              <FontIcon className="material-icons switch-view" onTouchTap={this._switchView}>view_comfy</FontIcon>
            </FloatingActionButton>
          </div>
        </div>
        
    );
  }
}

MainDisplay.propTypes={
  cameraData: PropTypes.array,
}

export default MainDisplay;
