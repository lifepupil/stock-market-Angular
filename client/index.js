'use strict';

angular.module('stock-market-Angular', ['firebase'])

.run(['$rootScope', '$window', function($rootScope, $window) {
  $rootScope.fbRoot = new $window.Firebase('https://stock-market-angular.firebaseio.com/');

}])


.controller('master', ['$scope','$firebaseObject', '$firebaseArray', '$http', '$window', function($scope, $firebaseObject, $firebaseArray, $http, $window) {
  var fbUser = $scope.fbRoot.child('user');
  var afUser = $firebaseObject(fbUser);
  $scope.user = afUser;

  var fbPortfolios = $scope.fbRoot.child('portfolios');
  var afPortfolios = $firebaseArray(fbPortfolios);
  $scope.portfolios = afPortfolios;

  $scope.addPortfolio = function() {
    // console.log($scope.portfolio);
    $scope.portfolios.$add($scope.portfolio);


  };

  // console.log('account name', $scope.accountName);

  $scope.saveUser = function(){
    // $scope.user = $scope.user.name;
    console.log('name', $scope.user.name, 'balance', $scope.user.balance);
    $scope.user.$save();
  };


  $scope.getQuote = function() {
    var upperCaseSymbol = angular.uppercase($scope.symbol);
    $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+upperCaseSymbol+'&callback=JSON_CALLBACK').then(function(response) {
      console.info('quote', response.data.LastPrice);
    });
  };




}]);
