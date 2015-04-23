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

  var stockIndex = 0;

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

      // console.log(afPortfolios.$indexFor('medical'));

      // if ($scope.portfolio.portName === 'tech'){
      //   var stockIndex = $scope.portfolio[0].length -1;
      //   console.log(stockIndex, $scope.portfolio.portName);
      //   // need to know the length to determine the index
      //   $scope.portfolios[0][stockIndex] = stock;
      //   $scope.portfolios.$save(0);
      //   stockIndex+=1;
      // }
var k = $scope.portfolios[0].$id;
      console.log('key:',k,'portfolio:',$scope.portfolios.k);
      // console.log($scope.portfolio);
      // var thisStock = stock3;

      // $scope.portfolios[0][stockIndex] = stock;
      // // $scope.portfolio.stock = stock;
      // console.log($scope.portfolios[0]);
      // // // console.log($scope.portfolio.stock);
      // // // console.log($scope.portfolio);
      // $scope.portfolios.$save(0);
      // // $scope.user.$save();
      // stockIndex+=1
    }

    // find portfolio children and find way to add to desired one
    // console.log($scope.portfolio.child);
    // console.log();
    // console.log();
  }




}]);
