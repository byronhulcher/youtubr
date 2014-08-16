'use strict';

angular.module('byronhulcher.Youtubr', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'mgcrea.ngStrap'])

  .constant('version', 'v0.1.1')

  .config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/features', {
        templateUrl: 'views/features.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  });

