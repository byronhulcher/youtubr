'use strict';

angular.module('byronhulcher.Youtubr').factory('VideoService', ['$log', function($log) {
  var service = {}

  service.get = function(id, successCallback, errorCallback){
    // check localVideos for id
    //  if exists, successCallback(retreivedObject)
    // else check remote for id 
    //  if exists, successCallback(retreivedObject)
    //  else, errorCallback(errorMessage)
  }

  service.create = function(data, successCallback, errorCallback){
    // send post to /video/ with data
    // if success, add newlyCreatedObject to localVideos then successCallback(newlyCreatedOject)
    //  else, errorCallback(errorMessage)
  }

  return service;
}]);