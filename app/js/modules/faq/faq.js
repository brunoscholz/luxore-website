angular.module('faq', []);

angular.module('faq').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/faq', {
      templateUrl:'main/faq.html',
      controller:'FaqController',
    });
}]);

angular.module('faq').controller('FaqController', ['$scope', '$location',
  function ($scope, $location) {

  }]);