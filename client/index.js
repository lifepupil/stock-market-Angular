'use strict';

angular.module('stock-market-Angular', ['firebase']);

.run(['$rootScope', '$window', function($rootScope, $window) {
  $rootScope.fbRoot = new $window.Firebase('https://stock-market-angular.firebaseio.com/');
}])

.controller('master', ['$scope','$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

}]);
