var fs = require("fs");
var debug = require("debug")("index");
var _=require("lodash");
var TdxApi = require("nqm-api-tdx");
var config = require("./config.json");

var regexStr = /.*L\.marker\(\[\S+(.*)\S+\]/gm;
var regexSrcStr = /.*src\=\"+\S(.*)\S+\"/gm;
var TDXconfig = {
  "commandHost": "https://cmd.nq-m.com",
  "queryHost": "https://q.nq-m.com"
};
var tdxAPI = new TdxApi(TDXconfig);
debug(config.shareId);
debug(config.shareKey);

tdxAPI.authenticate(config.shareId,config.shareKey,function(err,accessToken){
  if(err)
    throw err;
  else{
    insertData(tdxAPI,config);
  }
})


function insertData(tdxAPI,config){
  var entryList = [];
  fs.readFile("./camera.log","utf-8",(err,data) => {
    if(err)
      throw err;
    else{
      //debug(data);
      var markerArray = data.match(regexStr);
      var srcArray = data.match(regexSrcStr);

      _.forEach(markerArray,(val,i) => {
        val = val.replace(/L\.marker\(\[/i,"");
        val = val.replace(/\]/i,"");
        markerArray[i] = val;
        srcArray[i] = srcArray[i].replace(/src\=\"/i,"").replace(/\"/i,"").replace(/width\=.*/i,"");
        var coordinateArray = val.split(",");
        var entry = {
          ID:i,
          latitude:Number(coordinateArray[0]),
          longitude:Number(coordinateArray[1]),
          src:srcArray[i]
        }
        entryList.push(entry);
      })
      debug(entryList);
      tdxAPI.addDatasetData(config.sourceId,entryList,function(err,response){
        if(err)
          throw err;
        else{
          debug(response);
        }
      })
    }
  })
}
