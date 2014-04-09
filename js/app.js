// Declare module that references our controllers.
var forecastApp = angular.module('forecastApp', ['ngRoute', 'highcharts-ng', 'forecastAppControllers']).config(function ($routeProvider) {

    /*
     Inject the AngularJS routing (ngRoute) service so we can
     access the $routeProvider reference in our routing function.
     Also inject the 'cardAppControllers' service which we will
     define in 'controllers.js'.
     */

    'use strict';


    $routeProvider.when("/home", {
        templateUrl: 'views/forecast.html',
        controller: 'WeatherCtrl'
    })
        .otherwise({ redirectTo: '/home' });
});

