angular.module('faq', ['ui.router']);

angular.module('faq').config(['$stateProvider, $urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('faq', {
      url: '/faq',
      templateUrl:'views/site/faq.html',
      controller:'FaqController',
    });
}]);

angular.module('faq').controller('FaqController', ['$scope', '$location',
  function ($scope, $location) {

  }]);