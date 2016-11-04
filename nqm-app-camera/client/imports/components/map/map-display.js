import React,{Component,PropTypes}from "react";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer,Polygon,Polyline,Rectangle} from 'react-leaflet';
import DetailControl from "../controls/detailControl";


let _=lodash;
const centerPo = [50.92089,-1.1];
class MapDisplay extends Component{

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
    var thisLatLng = event.target.getLatLng();
    let srcIndex = _.findIndex(this.state.mapData,{"latitude":thisLatLng["lat"],"longitude":thisLatLng["lng"]});
    console.log(this.state.mapData[srcIndex]["src"]);
    this.setState({
      currentSrc:this.state.mapData[srcIndex]["src"],
      currentLatLng:thisLatLng
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

  renderMap(){
    var lanlngList = [];
    var markers = _.map(this.state.mapData,(val,i) => {
      var coordinateArray = [val.latitude,val.longitude];
      lanlngList.push(coordinateArray);
      return(
        <Marker position={coordinateArray} key={i} onClick={this._handleClick}>
          <Popup>
            <span>
              <img width="240" height="200" src={val.src}></img>
            </span>
          </Popup>
        </Marker>
      )
    })
    return(
      <Map center={centerPo} zoom={10}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
      </Map>
    )
  }
  render(){
    return(
        <Paper className="flex-items" id="main-map" hidden={this.props.mapView}>
          {this.renderMap()}
        </Paper>
    )
  }
}

MapDisplay.propTypes={
  cameraData:PropTypes.array
}

export default MapDisplay;
