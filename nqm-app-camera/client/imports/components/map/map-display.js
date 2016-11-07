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
    this.props.onMarker();
  }


  renderMap(){
    var lanlngList = [];
    // var markers = _.map(this.props.cameraData,(val,i) => {
    //   var coordinateArray = [val.latitude,val.longitude];
    //   lanlngList.push(coordinateArray);
    //   return(
    //     <Marker position={coordinateArray} key={i} onClick={this._handleClick}>
    //       <Popup>
    //         <span>
    //           <img width="240" height="200" src={"data:image/png;base64,"+val.base64String}></img>
    //         </span>
    //       </Popup>
    //     </Marker>
    //   )
    // })
    return(
      <Map center={centerPo} zoom={10} scrollWheelZoom={false} touchZoom={false}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerCluster data={this.props.cameraData} onClick={this._handleClick} />
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
  cameraData:PropTypes.array,
  onMarker: PropTypes.func
}

export default MapDisplay;
