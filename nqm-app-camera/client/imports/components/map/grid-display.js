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
      currentBase64String:"",
      indexArray:this.props.indexArray
    }
    this._getPrev = this._getPrev.bind(this);
    this._getNext = this._getNext.bind(this);

  }
  _onChangeIndex(indexArray){
    this.props.changeStateIndex(indexArray);
  }
  _handleHTTPcalls(folderName,fileIndex){
    Meteor.call("getBase64String",folderName,fileIndex,(err,response) => {
      if(err)
        console.log(err);
      else{
        if(response == "NO IMAGE"){}else{
          if(response.length>0){
            document.getElementById("main-img"+folderName).src = "data:image/png;base64,"+response;
            //document.getElementById("img-timestamp"+folderName).innerHTML = new Date(response.timestamp).toUTCString();
            var newIndexArray = [].concat(this.props.indexArray);
            newIndexArray[folderName] = fileIndex;
            this._onChangeIndex(newIndexArray);
          }
        }
      }
    });
    Meteor.call("getTimestamp",folderName,fileIndex,(err,response) => {
      if(err)
        console.log(err);
      else{
        if(response == "NO IMAGE"){}else{
          response = JSON.parse(response);
          document.getElementById("img-timestamp"+folderName).innerHTML = new Date(response.timestamp).toUTCString();
          // this.setState({
          //   currentIndex:fileIndex
          // });
          // this._onChangeIndex(fileIndex);
        }
      }
    })
  }
  _getPrev(event){
    var folderName = String(event.target.parentNode.parentNode.parentNode.getAttribute("id")).replace("slider","");
    var fileIndex = this.props.indexArray[folderName] - 1;
    if(fileIndex<0 || fileIndex>Meteor.settings.public.imgLength){

    }else{
      this._handleHTTPcalls(folderName,fileIndex);
    }
  }
  _getPlay(event){
    
  }
  _getNext(event){
    var folderName = String(event.target.parentNode.parentNode.parentNode.getAttribute("id")).replace("slider","");
    var fileIndex = this.props.indexArray[folderName] + 1;
    if(fileIndex<0 || fileIndex>Meteor.settings.public.imgLength){

    }else{
      this._handleHTTPcalls(folderName,fileIndex);
    }
  }

  render(){
    const styleNevigate = {
      right:{
        float:"right"
      }
    }
    let imgs = _.map(this.props.cameraData,(val,i) => {
      return(
        <div className="flex-items" key={val.ID} id={"flex-img"+val.ID}>
          <img width="100%" src={val.src.trim()+"?timestamp="+this.props.currentTime.getTime()} id={"main-img"+val.ID}></img>
          <div className="slider-timestamp" id={"img-timestamp"+val.ID}>{this.props.currentTime.toUTCString()}</div>
          <div id={"slider"+val.ID} className="prev-next">
            <IconButton iconClassName="material-icons" onTouchTap={this._getPrev} disabled={this.props.disableBeforeArray[val.ID]}>navigate_before</IconButton>
            <IconButton iconClassName="material-icons" onTouchTap={this._getNext} disabled={this.props.disableNextArray[val.ID]} style={styleNevigate.right}>navigate_next</IconButton>
          </div>
        </div>
      )
    });
    return(
        <div id="main-grid">
          <div className="flex-container">
            {imgs}
          </div>
        </div>
    )
  }
}
GridDisplay.propTypes={
  cameraData:PropTypes.array,
  indexArray:PropTypes.array,
  changeStateIndex:PropTypes.func,
  disableBeforeArray: PropTypes.array,
  disableNextArray: PropTypes.array
}

export default GridDisplay;