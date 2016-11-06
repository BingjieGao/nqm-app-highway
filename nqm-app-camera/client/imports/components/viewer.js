import React,{Component,Prototype} from 'react'
import {Meteor} from 'meteor/meteor';
import Paper from "material-ui/Paper";
import MapWidget from "./map/map-wgt";


class VisualExplorer extends Component{
  renderMap(){
    return <MapWidget />
  }
  render(){
    var filter = {};
    var options={sort:{ID:1}}
    return(
      <div className="container">
        <MapWidget sourceId={Meteor.settings.public.latestId} filter={filter} options={options}/>
      </div>
    )
  }
}
export default VisualExplorer;
