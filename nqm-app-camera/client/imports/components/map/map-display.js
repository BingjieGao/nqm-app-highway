import React,{Component,PropTypes}from "react";
import ReactDom from "react-dom";
import Paper from "material-ui/Paper";
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer,Polygon,Polyline,Rectangle} from 'react-leaflet';
import MarkerCluster from "./marker-cluster";


let _=lodash;
const centerPo = [50.92089,-1.1];
class MapDisplay extends Component{

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(event){
    console.log("map marker clicked");
    console.log(event.target);
  }

  renderMap(){
    var lanlngList = [];
    return(
      <Map center={centerPo} zoom={10} scrollWheelZoom={false} touchZoom={false}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerCluster data={this.props.cameraData} timeData={this.props.timeData} onClick={this._handleClick} />
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
  cameraData:PropTypes.array.isRequired,
  timeData:PropTypes.array.isRequired,
  onDataChange:PropTypes.func
}

export default MapDisplay;
