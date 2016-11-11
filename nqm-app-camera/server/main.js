import { Meteor } from 'meteor/meteor';
import {HTTP} from "meteor/http";
import Promise from "bluebird";

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
    "getBase64String":function(folderName,fileIndex){
      var getURL = "http://localhost:3100/img/"+folderName+"/"+fileIndex;
      console.log(getURL);
      var options = {
                      headers: 
                        {
                          'Content-Type': 'application/json',
                          "User-Agent": "Meteor/1.0"
                        },
                      npmRequestOptions: {
                          encoding: "utf-8"
                        }
                    }
      Promise.promisifyAll(HTTP);
      return HTTP.callAsync("GET",getURL,options)
        .then((response) => {
          console.log("meteor server response");
          console.log(response.content);
          return response.content;
        })
        .catch((err) => {
          console.log("meteor server error");
          return err;
        })
    }
  })
});
