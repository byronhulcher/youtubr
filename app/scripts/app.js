'use strict';

angular.module('byronhulcher.Youtubr', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'mgcrea.ngStrap'])

  .constant('version', 'v0.1.2')

  .config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider
      .when('/:videoId', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/example'
      });
  });

function onYouTubeIframeAPIReady() {
  angular.element('#app-container').ready(function(){
    var appRootScope = angular.element('#app-container').scope();
    appRootScope.$broadcast('onYouTubeIframeAPIReady');
  });
}

function getParameterByName(url, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
