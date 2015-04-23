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

  // $scope.portfolios.$loaded().then(function(){
  //   var fbPortfolio = $scope.fbPortfolios.child('portfolio');
  //   var afPortfolio = $firebaseArray(fbPortfolio);
  //   $scope.portfolio = afPortfolio;
  // });

  $scope.addPortfolio = function() {
    // console.log($scope.portfolio);

    $scope.portfolios.$add($scope.portfolio);
    $scope.portfolio = {};


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
      $scope.lastPrice = response.data.LastPrice;
      console.log();
      $scope.totalPrice = $scope.lastPrice * $scope.shareNum;
    });
  };

  $scope.buyStock = function(){
    if ($scope.portfolio.portName !== undefined && $scope.user.balance >= ($scope.user.balance - $scope.totalPrice)){
      $scope.user.balance -= $scope.totalPrice;
      var stock = {
        symbol: $scope.symbol,
        cost: $scope.totalPrice,
        shares: $scope.shareNum
      }

      console.log($scope.portfolios[$scope.portfolio]);
      $scope.portfolios[0].stock = stock;
      // $scope.portfolios[0].$scope.symbol = stock;
      $scope.portfolios.$save(0);
      // console.log($scope.portfolios[0]);
      // $scope.portfolio.stock = stock;
      // // console.log($scope.portfolio.stock);
      // // console.log($scope.portfolio);
      // $scope.portfolios.$save($scope.portfolio);
      // // $scope.user.$save();
    }

    // find portfolio children and find way to add to desired one
    // console.log($scope.portfolio.child);
    // console.log();
    // console.log();
  }




}]);
