import { Meteor } from 'meteor/meteor';
import {HTTP} from "meteor/http";
import Promise from "bluebird";
import request from "request";

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
    "getBase64String":function(folderName,fileIndex){
      var getURL = "http://localhost:3100/img/"+folderName+"/"+fileIndex;
      console.log(getURL);
      var options = {
                      headers: 
                        {
                          'Content-Type': 'image/gif',
                          "User-Agent": "Meteor/1.0"
                        },
                      npmRequestOptions: {
                          encoding: "base64"
                        }
                    }
      Promise.promisifyAll(HTTP);
      return HTTP.callAsync("GET",getURL,options)
        .then((response) => {
          console.log("meteor server response");
          //response = JSON.parse(response);
          console.log(response);
          return response.content;
        })
        .catch((err) => {
          console.log("meteor server error");
          return err;
        })
    }
  })
});
