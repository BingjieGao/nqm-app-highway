import React,{PropTypes} from "react";
import ReactDOM from 'react-dom';
import {MapLayer} from "react-leaflet";

let _=lodash;
class MarkerCluster extends MapLayer{
  constructor(props){
    super(props);

    this._markers = {};
  }

  _handleClick(event){
    console.log("markercluster click");
    this.props.onClick();
  }

  componentWillMount(){
    let markers = [];
    this.leafletElement = L.markerClusterGroup();
    var cssIcon = L.divIcon({
        className: 'css-icon'
    });
    _.forEach(this.props.data,(val,i) => {
      var popup ='<span><img width="240" height="200" src=data:image/png;base64,'+val.base64String+'></img></span>';
      this._markers[''+i+''] = L.marker(new L.LatLng(val.latitude,val.longitude),{
        title:val.src,
        id:i
      });
      this._markers[''+i+''].bindPopup(popup).on('click',(e) => {this._handleClick});
      markers.push(this._markers[''+i+'']);
    });

    this.leafletElement.addLayers(markers);
  }

  render(){
    return null;
  }
}

MarkerCluster.propTypes={
  data: PropTypes.array,
  onClick: PropTypes.func
}

export default MarkerCluster;
