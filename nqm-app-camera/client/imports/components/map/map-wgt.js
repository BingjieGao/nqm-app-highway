import React,{Component,PropTypes} from "react";
import { Meteor } from "meteor/meteor";

import MapContainer from "./map-container";
import Paper from "material-ui/Paper";


class MapWidget extends Component{
  render(){
    return <MapContainer
            sourceId={this.props.sourceId}
            options={this.props.options}
            filter={this.props.filter}
          />
  }
}
MapWidget.propTypes={
  sourceId:PropTypes.string.isRequired,
  options:PropTypes.object
}

export default MapWidget;
