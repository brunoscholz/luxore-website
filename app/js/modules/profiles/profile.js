angular.module('profiles', []);

angular.module('profiles').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/profile', {
      templateUrl:'home.html',
      controller:'ProfileController',
    });
}]);

angular.module('profiles').controller('ProfileController', ['$scope', '$location',
  function ($scope, $location) {

  }]);