angular.module('docs', ['ui.router']);

angular.module('docs').config(['$stateProvider, $urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('docs', {
      url:'/documentation',
      templateUrl:'views/docs/index.html',
      controller:'DocsController',
    });
}]);

angular.module('docs').controller('DocsController', ['$scope', '$location',
  function ($scope, $location) {

  }]);