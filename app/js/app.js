var app = angular.module('app', [
  'ngRoute',
  'gettext',
  'faq',
  'terms'
]);

app.config(function ($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode({enabled:true});
  //$routeProvider.otherwise({ redirectTo: '/vitrine' });
  $routeProvider
    .when('/', {
      templateUrl:'main/home.html',
      controller: 'AppController'
    })
    .when('/features', {
      templateUrl:'features.html',
      controller: 'AppController'
    })
    .otherwise({ redirectTo: '/' });
});

app.run(function ($rootScope, languageService,  gettextCatalog) {

  languageService();
  gettextCatalog.debug = true;

  $("body").delay(260).queue(function(next) {
    $(this).addClass("loaded");
    next();
  });
  //gettextCatalog.currentLanguage = 'pt_BR';

  /*$rootScope.searchQueryChanged = function(query) {
    $rootScope.searchQuery = query;
  };*/

  // adds some basic utilities to the $rootScope for debugging purposes
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };

});

app.controller('AppController', function ($scope) {

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    //console.log('routeChangeError');
  });

});

app.controller('HeaderController', function ($scope, $rootScope, languageService, $location, $route) {
    $scope.location = $location;

    $scope.selectLanguage = function (code) {
      $rootScope.changeLang(code);
    };

    $scope.home = function () {
        $location.path('/');
    };

    $scope.isNavbarActive = function (navBarPath) {
      //return navBarPath === breadcrumbs.getFirst().name;
    };
});

app.value('version', '0.1');

app.factory('promiseFactory', function($q) {
  return {
    decorate: function(promise) {
      promise.success = function(callback) {
        promise.then(callback);

        return promise;
      };

      promise.error = function(callback) {
        promise.then(null, callback);

        return promise;
      };
    },
    defer: function() {
      var deferred = $q.defer();

      this.decorate(deferred.promise);

      return deferred;
    }
  };
});