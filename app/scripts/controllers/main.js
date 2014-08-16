'use strict';

angular.module('byronhulcher.Youtubr')

  .controller('MainCtrl', function($scope, $location, VideoService) {

    $scope.$path = $location.path.bind($location);
    

  });
