'use strict';

angular.module('byronhulcher.Youtubr').factory('VideoRemoteAPI', ['$log', function($log) {
  var service = {};

  
  service.get = function(id){
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:8080/api/video/'+id, false);  // `false` makes the request synchronous
    try{
      request.send(null);
      var response = JSON.parse(request.response);
      return response;
    }
    catch(err){
    }
  };

  service.post = function(data){
    var request = new XMLHttpRequest();   // new HttpRequest instance 
    request.open("POST", "http://localhost:8080/api/video/", false);
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