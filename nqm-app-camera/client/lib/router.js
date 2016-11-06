import React from "react";
import {mount} from "react-mounter";
import {FlowRouter} from "meteor/kadira:flow-router";
import connectionManager from "../connection-manager";
import Header from "../imports/container/layout-container";
import Contents from "../imports/components/viewer";
import {Meteor} from "meteor/meteor";
import "leaflet";
import "leaflet.markercluster";

let sharedkey;

if (Meteor.settings.public.shareId){
  console.log("shareId exist");
  sharedkey = Meteor.settings.public.sharedId;
}

// Register a trigger to be called before every route.
FlowRouter.triggers.enter([function (context, redirect) {

  // If the connection manager hasn't established a DDP connection yet, do it now.
  if (!connectionManager.connected) {
    connectionManager.connect();
  }

  if (!sharedkey){
    console.log("connectionManager authenticated to ",Meteor.settings.public.shareId,Meteor.settings.public.sharekey);
    connectionManager.authorise(Meteor.settings.public.shareId, "1234554321");
  }

  if (context.queryParams.access_token) {
    connectionManager.useToken(context.queryParams.access_token);
    // Redirect to root page after authentication.
    redirect("/");
  }
}]);

FlowRouter.route("/", {
  name: "root",
  action: function(params, queryParams) {
    mount(Header, { content:function(){
      return <Contents />
    }});
  }
});

FlowRouter.route("/auth-server", {
  name: "authServerRedirect",
  triggersEnter: [function (context, redirect) {
    console.log("redirecting to auth server");
    window.location = Meteor.settings.public.authServerURL + "/auth/?rurl=" + window.location.href;
  }]
});
