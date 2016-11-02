import React from "react";
import {mount} from "react-mounter";
import {FlowRouter} from "meteor/kadira:flow-router";
import connectionManager from "../connection-manager";
import Header from "../imports/container/layout-container";
import Contents from "../imports/components/viewer";

FlowRouter.route("/", {
  name: "root",
  action: function(params, queryParams) {
    mount(Header, { content:function(){
      return <Contents />
    }});
  }
});
