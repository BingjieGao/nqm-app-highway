import React,{Component,PropTypes}from "react";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";
import DetailControl from "../controls/detailControl";
import Slider from 'material-ui/Slider';
import { Meteor } from "meteor/meteor";
import IconButton from 'material-ui/IconButton';

var _=lodash;
class GridDisplay extends Component{

  constructor(props) {
    super(props);
    this.state={
      timestampArray:new Array(128).fill(0),
      currentBase64String:"",
      currentIndex:this.props.currentIndex
    }
    this._getPrev = this._getPrev.bind(this);
    this._getNext = this._getNext.bind(this);

  }
  _handleHTTPcalls(folderName,fileIndex){
    Meteor.call("getBase64String",folderName,fileIndex,(err,response) => {
      if(err)
        console.log(err);
      else{
        //console.log(response);
        if(response == "NO IMAGE"){}else{
          response = JSON.parse(response);
          if(response.base64String.data.length>0){
            document.getElementById("main-img"+folderName).src = "data:image/png;base64,"+new Buffer(response.base64String.data).toString("base64");
            document.getElementById("img-timestamp"+folderName).innerHTML = new Date(response.timestamp).toUTCString();
            this.setState({
              currentIndex:fileIndex - 1
            })
          }
        }
      }
    })
  }
  _getPrev(event){
    var folderName = String(event.target.parentNode.parentNode.parentNode.getAttribute("id")).replace("slider","");
    console.log(folderName);
    var fileIndex = this.state.currentIndex - 1;
    this._handleHTTPcalls(folderName,fileIndex);
  }
  _getPlay(event){
    
  }
  _getNext(event){
    var folderName = String(event.target.parentNode.parentNode.parentNode.getAttribute("id")).replace("slider","");
    var fileIndex = this.state.currentIndex + 1;
    console.log(folderName);
    this._handleHTTPcalls(folderName,fileIndex);
  }

  render(){
 
    let imgs = _.map(this.props.cameraData,(val,i) => {
      return(
        <div className="flex-items" key={val.ID} id={"flex-img"+val.ID}>
          <img width="100%" src={val.src.trim()+"?timestamp="+this.props.currentTime.getTime()} id={"main-img"+val.ID}></img>
          <div className="slider-timestamp" id={"img-timestamp"+val.ID}>{this.props.currentTime.toUTCString()}</div>
          <div id={"slider"+val.ID}>
            <IconButton iconClassName="material-icons" onTouchTap={this._getPrev}>navigate_before</IconButton>
            <IconButton iconClassName="material-icons" onTouchTap={this._getPlay}>play_circle_outline</IconButton>
            <IconButton iconClassName="material-icons" onTouchTap={this._getNext}>navigate_next</IconButton>
          </div>
        </div>
      )
    });
    return(
        <Paper className="flex-items" id="main-grid">
          <div className="flex-container">
            {imgs}
          </div>
        </Paper>
    )
  }
}
GridDisplay.propTypes={
  cameraData:PropTypes.array,
  currentIndex:PropTypes.number
}

export default GridDisplay;