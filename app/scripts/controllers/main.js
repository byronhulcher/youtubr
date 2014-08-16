'use strict';

angular.module('byronhulcher.Youtubr')

  .controller('MainCtrl', function($rootScope, $scope, $location, $routeParams, $interval, VideoService) {

    $scope.$path = $location.path.bind($location);
    $scope.videoId;
    $scope.editorForm;

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

    function onPlayerStateChange(event){
      if (event.data == 0){
        $scope.player.seekTo($scope.videoData.startSeconds);
      }
      if (event.data == 1){
        startPlayerInterval();
        $scope.videoTitle = $scope.player.getVideoData().title;
        $scope.videoDuration = parseInt($scope.player.getDuration());
      }
      else {
        stopPlayerInterval();
      }
    }

    var playerInterval;
    var currentTime; 
    var startPlayerInterval = function(){
      if ( angular.isDefined(playerInterval) ) return;

      playerInterval = $interval(function() {
        currentTime = $scope.player.getCurrentTime();
        // console.log(currentTime);
        if (angular.isDefined($scope.videoData.startSeconds) && currentTime < $scope.videoData.startSeconds){
          $scope.player.seekTo($scope.videoData.startSeconds);
        }
        if (angular.isDefined($scope.videoData.endSeconds) && currentTime > $scope.videoData.endSeconds){
          $scope.player.seekTo($scope.videoData.startSeconds);
        }
      }, 100);
    }

    var stopPlayerInterval = function(){
      if (angular.isDefined(playerInterval)) {
        $interval.cancel(playerInterval);
        playerInterval = undefined;
      }
    }

    $scope.$on('$destroy', function(){
      stopPlayerInterval();
    })

    function loadPlayer(){
      if (!angular.isDefined($scope.player) || !angular.isDefined($scope.player.loadVideoById) || !angular.isDefined($scope.videoData.youtubeId)) return;
      $scope.player.loadVideoById({
        'videoId': $scope.videoData.youtubeId,
        'startSeconds': $scope.videoData.startSeconds, 
        'endSeconds': $scope.videoData.endSeconds
      });
    };

    $rootScope.$on('onYouTubeIframeAPIReady', function(){
      $scope.player = new YT.Player('videoDiv', {
        width: '420',
        height: '315',
        // videoId: $scope.videoData.youtubeId,
        events: {
          'onReady': loadPlayer,
          'onStateChange': onPlayerStateChange,
        },
        playerVars: {
          autoplay: 1,
          // controls: 0,
          enablejsapi: 1,
          loop: 1,
          rel: 0,
          showinfo: 0,
        }
      });  
    });

    $scope.$watch('videoData.youtubeUrl', function(newValue, oldValue){
      if (angular.isDefined(newValue) && (newValue != oldValue)){
        if (angular.isDefined(oldValue)) delete $scope.videoId;
        $scope.videoData.youtubeId = getParameterByName($scope.videoData.youtubeUrl, 'v');
        loadPlayer();
      }
    });

    $scope.save = function(){
      VideoService.create($scope.videoData, function(data){
        console.log($scope);
        $scope.videoData = data;
        $scope.videoId = data.id;
        angular.element('#editor-form').scope().editorForm.$setPristine();
      })
    }

    $scope.reset = getVideo;
  });