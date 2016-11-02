import React,{Component,PropTypes} from "react";
import { Meteor } from "meteor/meteor";

import MapContainer from "./map-container";
import Paper from "material-ui/Paper";


class MapWidget extends Component{
  render(){
    return <MapContainer sourceId={this.props.sourceId}/>
  }
}
MapWidget.propTypes={
  sourceId:PropTypes.string.isRequired
}

export default MapWidget;
