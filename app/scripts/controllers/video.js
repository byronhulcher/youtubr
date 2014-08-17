angular.module('byronhulcher.Youtubr')
  .controller('VideoCtrl', function($rootScope, $scope, $interval, $timeout, $route){
    $scope.ready = false;

    function onPlayerStateChange(event){
      if (event.data == 0){
        $scope.player.seekTo($scope.videoData.startSeconds);
      }
      if (event.data == 1){
        startPlayerInterval();
        $scope.videoTitle = $scope.player.getVideoData().title;
        $scope.videoData.title = $scope.videoTitle;
        $scope.videoDuration = parseInt($scope.player.getDuration());
        $scope.videoData.duration = $scope.videoDuration;
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
      $scope.ready = true;
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

    $timeout(function(){
      if (!$scope.ready) $scope.refreshing=true;
    }, 2*1000);
    // $timeout(function(){
    //   if (!$scope.ready) location.reload();
    // }, 4*1000);
  });