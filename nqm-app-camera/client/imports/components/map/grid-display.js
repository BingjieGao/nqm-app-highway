import React,{Component,PropTypes}from "react";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";
import DetailControl from "../controls/detailControl";

var _=lodash;
class GridDisplay extends Component{

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(event){
    this.props.onPicture();
  }


  render(){
    let imgs = _.map(this.props.cameraData,(val,i) => {
      return(
        <div className="flex-items" key={i} id={"flex-img"+i}>
          <img width="100%" src={"data:image/png;base64,"+val.base64String} id={"main-img"+i}></img>
        </div>
      )
    });
    return(
        <Paper className="flex-items" id="main-grid">
          <div className="flex-container" onClick={this._handleClick}>
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
