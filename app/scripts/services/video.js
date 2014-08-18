'use strict';

angular.module('byronhulcher.Youtubr').factory('VideoService', ['$log', 'VideoCookieStorage', 'VideoRemoteAPI', function($log, VideoCookieStorage, VideoRemoteAPI) {
  var localVideos = {
    'example': {
      '_id': 'example',
      'youtubeUrl': 'https://www.youtube.com/watch?v=bLlj_GeKniA',
      'startSeconds': 5,
      'endSeconds': 11
    }
  };

  var service = {};

  service.getLocalVideos = function(){ return localVideos };

  service.get = function(id, successCallback, errorCallback){
    var data = localVideos[id];
    if (!angular.isDefined(data)){
      data = VideoCookieStorage.get(id);
    }
    if (!angular.isDefined(data)){
      data = VideoRemoteAPI.get(id);
    }
    if (!angular.isDefined(data)){
      if (angular.isDefined(errorCallback)) errorCallback("Cannot find video matching "+ id.toString());
    }
    else {
      successCallback(data);
    };
    
  };

  service.create = function(data, successCallback, errorCallback){
    var id = VideoRemoteAPI.post(data);
    data = VideoCookieStorage.post(data, id);
    successCallback(data);
  };

  return service;
}]);