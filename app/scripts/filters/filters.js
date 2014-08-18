'use strict';

angular.module('byronhulcher.Youtubr')

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