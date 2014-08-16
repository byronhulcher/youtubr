'use strict';

angular.module('byronhulcher.Youtubr')

  // .filter('time', function() {
  //   return function(obj) {
  //     return +new Date(obj);
  //   };
  // })

  // .filter('startFrom', function() {
  //   return function(obj, index) {
  //     return obj && obj.slice(index);
  //   };
  // })

  .filter('secondsToMinutes', function(){
    return function(seconds){
      var sec = (seconds % 60).toString()
      if (sec.length < 2){
        sec = "0"+sec
      }
      var min = parseInt(seconds/60).toString();
      return min+":"+sec;
    }
  })