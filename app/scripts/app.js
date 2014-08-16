'use strict';

angular.module('byronhulcher.Youtubr', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'mgcrea.ngStrap'])

  .constant('version', 'v0.1.2')

  .config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  });

