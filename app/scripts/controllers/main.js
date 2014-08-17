'use strict';

angular.module('byronhulcher.Youtubr')

  .controller('MainCtrl', function($rootScope, $scope, $location, $routeParams, VideoService) {

    $scope.$path = $location.path.bind($location);
    $scope.videoId;
    $scope.editorForm;
    $scope.videoData;
    $scope.videoTitle = "";
    $scope.videoDuration = null;

    var getVideo = function(){
      $scope.videoId = $routeParams.videoId;
      VideoService.get($scope.videoId, 
        function(data){
          $scope.videoData = data;
        },
        function(data){
          $location.path("/example");
        });
    }

    $rootScope.$on('$routeChangeSuccess', getVideo);

    $scope.save = function(){
      VideoService.create($scope.videoData, function(data){
        $scope.videoData = data;
        $scope.videoId = data.id;
        angular.element('#editor-form').scope().editorForm.$setPristine();
      })
    }

    $scope.reset = getVideo;
  });