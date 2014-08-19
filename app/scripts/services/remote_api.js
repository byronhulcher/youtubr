'use strict';
var localhost = "http://localhost:8080/api/" 
var remotehost = "https://yserver-21666.onmodulus.net/api/"

var useRemoteAPI = false;

try{
  var request = new XMLHttpRequest();
  request.open('GET', localhost, false);
  request.send(null);
}
catch(err){
  console.log("Can't reach localhost API, using remote API at " + remotehost);
  useRemoteAPI = true;
}

var apiHost = useRemoteAPI ? remotehost : localhost;

angular.module('byronhulcher.Youtubr').factory('VideoRemoteAPI', ['$log', function($log) {
  var service = {};
  var modelUrl = 'video/';
  var endpointUrl = apiHost + modelUrl;
  service.get = function(id){
    var request = new XMLHttpRequest();
    var methodUrl = endpointUrl + id;
    request.open('GET', methodUrl, false);  // `false` makes the request synchronous
    try{
      request.send(null);
      var response = JSON.parse(request.response);
      return response;
    }
    catch(err){
    }
  };

  service.post = function(data){
    var request = new XMLHttpRequest();
    var methodUrl = endpointUrl;
    request.open("POST", methodUrl, false);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    try{
      request.send(JSON.stringify(data));
      var response = JSON.parse(request.response);
      return response["_id"];
    }
    catch(err){
    }
  };

  return service;
}]);