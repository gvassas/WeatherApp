/*global angular */

var forecastAppControllers = (function () {
    'use strict';
    var forecastAppControllers = angular.module('forecastAppControllers', []);

    // Declare the application controller and inject the scope reference.
    forecastAppControllers.controller('AppCtrl', ['$scope', function ($scope) {
        // Define the title model.
    }]);
    // Inject the scope and new cardService reference into the controller.
    forecastAppControllers.controller('WeatherCtrl', ['$scope', 'forecastService',
        function ($scope, forecastService) {
            // Define the cards model.
            forecastService.getForecast($scope);
        }]);

    return forecastAppControllers;
}());
