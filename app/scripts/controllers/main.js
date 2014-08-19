'use strict';

angular.module('byronhulcher.Youtubr')

  .controller('MainCtrl', function($rootScope, $scope, $location, $routeParams, $route, VideoService) {

    $scope.$path = $location.path.bind($location);
    $scope.videoId;
    $scope.editorForm;
    $scope.videoData;
    
    var getVideo = function(){
      $scope.videoId = $routeParams.videoId;
      if (!angular.isDefined($scope.videoId)) return;
      VideoService.get($scope.videoId, 
        function(data){
          $scope.videoData = data;
          $scope.backupData = angular.copy(data);
        },
        function(data){
          $scope.error = true;
        });
    }

    $rootScope.$on('$routeChangeSuccess', getVideo);

    $scope.save = function(){
      delete $scope.videoData["_id"];
      VideoService.create($scope.videoData, function(data){
        $scope.videoData = data;
        $scope.videoId = data["_id"];
        angular.element('#editor-form').scope().editorForm.$setPristine();
      })
    }

    $scope.reset = function(){
      angular.extend($scope.videoData, $scope.backupData);
    }
  });