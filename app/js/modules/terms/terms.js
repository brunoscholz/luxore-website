angular.module('terms', []);

angular.module('terms').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/terms-of-use', {
      templateUrl:'main/terms.html'
      //controller:'TermsController',
    })
    .when('/ethical-guidelines', {
      templateUrl:'main/ethics.html'
      //controller:'TermsController',
    });
}]);
