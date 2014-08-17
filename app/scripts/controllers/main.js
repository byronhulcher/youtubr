'use strict';

angular.module('byronhulcher.Youtubr')

  .controller('MainCtrl', function($rootScope, $scope, $location, $routeParams, $route, VideoService) {

    $scope.$path = $location.path.bind($location);
    $scope.videoId;
    $scope.editorForm;
    $scope.videoData;
    $scope.videoTitle = "";
    $scope.videoDuration = null;

    var getVideo = function(){
      $scope.videoId = $routeParams.videoId;
      if (!angular.isDefined($scope.videoId)) return;
      VideoService.get($scope.videoId, 
        function(data){
          $scope.videoData = data;
        },
        function(data){
          console.log("Cannot find video data matching id ", $scope.videoId, " re-routing to /example");
          $location.path("/example");
        });
    }

    $rootScope.$on('$routeChangeSuccess', getVideo);

    $scope.save = function(){
      VideoService.create($scope.videoData, function(data){
        // $location.path("/"+data.id);
        $scope.videoData = data;
        $scope.videoId = data.id;
        angular.element('#editor-form').scope().editorForm.$setPristine();
      })
    }

    $scope.reset = getVideo;
  });