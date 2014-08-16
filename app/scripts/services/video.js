'use strict';

angular.module('byronhulcher.Youtubr').factory('VideoService', ['$log', function($log) {
  var localVideos = {
    'test1': {
      'id': 'test1',
      'youtubeUrl': 'https://www.youtube.com/watch?v=bLlj_GeKniA',
      'startSeconds': 5,
      'endSeconds': 11
    }
  };

  var service = {};

  service.getLocalVideos = function(){ return localVideos };

  service.get = function(id, successCallback, errorCallback){
    // check localVideos for id
    //  if exists, successCallback(retreivedObject)
    // else check remote for id 
    //  if exists, successCallback(retreivedObject)
    //  else, errorCallback(errorMessage)

    if (typeof(localVideos[id]) == "undefined"){
      errorCallback("Unable to find video matching id "+id.toString())
    }
    else {
      successCallback(angular.copy(localVideos[id]));
    }
    
  };

  service.create = function(data, successCallback, errorCallback){
    // send post to /video/ with data
    // if success, add newlyCreatedObject to localVideos then successCallback(newlyCreatedOject)
    //  else, errorCallback(errorMessage)

    var generateId = function(length){
      // via http://stackoverflow.com/a/19964557
      return new Array(length+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, length);
    }
    var newId = generateId(5);
    localVideos[newId] = data;
    localVideos[newId].id = newId;
    successCallback(angular.copy(localVideos[newId]));

  };

  return service;
}]);