import React,{Component,PropTypes}from "react";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";
import DetailControl from "../controls/detailControl";

var _=lodash;
class GridDisplay extends Component{

  constructor(props) {
    super(props);
    this.state={
      mapData:props.cameraData,
      currentSrc:"",
      currentLatLng:{}
    }
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(event){
    console.log(event.target);
    var currentSrc = event.target.src;
    let srcIndex = _.findIndex(this.state.mapData,{"src":currentSrc});
    this.setState({
      currentSrc:currentSrc,
      currentLatLng:{
        "lat":this.props.cameraData[srcIndex]["latitude"],
        "lng":this.props.cameraData[srcIndex]["longitude"]
      }
    })
  }

  componentDidMount(){
    ReactDom.render(
      <DetailControl src={this.state.currentSrc} LatLng={this.state.currentLatLng}/>,document.getElementById("detail-control")
    );
  }
  componentDidUpdate(){
    ReactDom.render(
      <DetailControl src={this.state.currentSrc} LatLng={this.state.currentLatLng}/>,document.getElementById("detail-control")
    );
  }

  render(){
    let imgs = _.map(this.props.cameraData,(val,i) => {
      return(
        <div className="flex-items" key={i} id={"flex-img"+i}>
          <img width="100%" src={val.src} id={"main-img"+i}></img>
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
  cameraData:PropTypes.array
}

export default GridDisplay;
