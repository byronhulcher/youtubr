'use strict';

angular.module('byronhulcher.Youtubr').factory('VideoService', ['$log', 'VideoCookieStorage', function($log, VideoCookieStorage) {
  var localVideos = {
    'example': {
      'id': 'example',
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
      if (angular.isDefined(errorCallback)) errorCallback("Cannot find video matching "+ id.toString());
    }
    else {
      data.youtubeId = getParameterByName(data.youtubeUrl, 'v');
      successCallback(data);
    };
    
  };

  service.create = function(data, successCallback, errorCallback){
    data = VideoCookieStorage.post(data);
    successCallback(data);
  };

  return service;
}]);