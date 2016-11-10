import React,{Component,PropTypes}from "react";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";
import DetailControl from "../controls/detailControl";
import Slider from 'material-ui/Slider';
import { Meteor } from "meteor/meteor";

var _=lodash;
class GridDisplay extends Component{

  constructor(props) {
    super(props);
    this.state={
      timestampArray:new Array(128).fill(0),
      currentBase64String:""
    }
    this._handleSlider = this._handleSlider.bind(this);
  }
  _handleHTTPcalls(folderName,fileIndex){
    Meteor.call("getBase64String",folderName,fileIndex,(err,response) => {
      if(err)
        console.log(err);
      else if(response.length>0){
        document.getElementById("main-img"+folderName).src = "data:image/png;base64,"+response;
      }
    })
  }
  _handleSlider(event,value){
    var index = String(event.target.nextSibling.getAttribute("name")).replace("slider","");
    var cloneArray = this.state.timestampArray.slice(0);
    cloneArray[Number(index)] = value;
    this.setState({
      timestampArray:cloneArray
    });
    console.log(index);
    console.log(value)
    this._handleHTTPcalls(index,(10-value));
  }
  render(){
    console.log(this.props.cameraData[0]);
    let imgs = _.map(this.props.cameraData,(val,i) => {
      return(
        <div className="flex-items" key={i} id={"flex-img"+i}>
          <img width="100%" src={val.src.trim()} id={"main-img"+i}></img>
          <div id={"slider"+i}>
            <Slider 
              min={0}
              max={10}
              step={1}
              defaultValue={0}
              value={this.state.timestampArray[i]}
              name={"slider"+i}
              onChange={this._handleSlider}
            />
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
  onPicture: PropTypes.func
}

export default GridDisplay;
