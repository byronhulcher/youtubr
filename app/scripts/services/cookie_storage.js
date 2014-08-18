'use strict';

angular.module('byronhulcher.Youtubr').factory('VideoCookieStorage', ['$log', '$cookieStore', function($log, $cookieStore) {
  var service = {};

  
  service.get = function(id){
    return $cookieStore.get(id);
  };

  service.post = function(data, id){
   var generateId = function(length){
      // via http://stackoverflow.com/a/19964557
      return new Array(length+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, length);
    }
    data.id = angular.isDefined(id) ? id : generateId(5);
    $cookieStore.put(data.id, data);
    return data;
  };

  return service;
}]);