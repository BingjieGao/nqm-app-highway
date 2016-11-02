import React,{Component,Prototype} from 'react'
import {Meteor} from 'meteor/meteor';
import Paper from "material-ui/Paper";
import MapWidget from "./map/map-wgt";


class VisualExplorer extends Component{
  renderMap(){
    return <MapWidget />
  }
  render(){
    return(
      <div className="container">
        <MapWidget sourceId={Meteor.settings.public.resourceId}/>
      </div>
    )
  }
}
export default VisualExplorer;
