import React,{Component} from "react";
import {Meteor} from "meteor/meteor";

import connectionManager from "../../connection-manager";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";

class Layout extends Component{

  _switchView(){
    var mapState = document.getElementById("main-map").style.display;
    if(mapState == "none"){
      document.getElementById("main-grid").style.display = "none";
      document.getElementById("main-map").style.display = "block";
    }else {
      document.getElementById("main-map").style.display = "none";
      document.getElementById("main-grid").style.display = "block";
    }
  }
  render() {
    var styles = {
      appBar: {
        position: "fixed"
      },
      layoutContent: {
        padding: "68px 0px 0px 5px"
      }
    };
    if(this.props.authenticated){
      console.log("ddp connection is "+this.props.authenticated);
    }
    var content = this.props.content();
    var viewButton;

    viewButton = <IconButton iconClassName="material-icons" onTouchTap={this._switchView}>view_comfy</IconButton>
    return (
      <MuiThemeProvider>
        <div>
          <AppBar style={styles.appBar} title="nqm Highway Camera" showMenuIconButton={false} iconElementRight={viewButton} />
          <div style={styles.layoutContent}>
            {content}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
