var app = angular.module('app', [
  'ui.router',
  'ngAnimate',
  'gettext'

]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  /*$locationProvider.html5Mode({enabled:true});*/

  $stateProvider
    .state('app', {
      url: '/',
      views: {
        'master': {
          templateUrl: 'main.html',
          controller: 'AppController'
        },
        'mainContent@app': {
          templateUrl: 'views/site/home.html',
          controller: 'AppController'
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'master': {
          templateUrl: 'main.html',
          controller: 'AppController'
        },
        'mainContent': {
          templateUrl: 'views/site/home.html',
        },
        'fabContent': {}
      }
    })

    /*.state('splash', {
      url: '/splash',
      templateUrl: 'templates/luxore.html',
      controller: 'SplashCtrl'
    })*/

    .state('features', {
      url: '/features',
      views: {
        'mainContent': {
          templateUrl: 'views/site/features.html',
          controller: 'AppController'
        },
        'fabContent': {
          /*template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized spin"><i class="icon ion-chatbubbles"></i></button>',
          controller: function ($timeout) {
            $timeout(function () {
              document.getElementById('fab-friends').classList.toggle('on');
            }, 900);
          }*/
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});

app.run(function ($rootScope, languageService, gettextCatalog) {

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

  /*$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $rootScope.currentState = toState.name;
  });*/

  // adds some basic utilities to the $rootScope for debugging purposes
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope.alert = function(thing) {
    alert(thing);
  };

});

app.controller('AppController', function ($scope, $state, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.isExpanded = false;
  $scope.hasHeaderFabLeft = false;
  $scope.hasHeaderFabRight = false;

  var navIcons = document.getElementsByClassName('ion-navicon');
  for (var i = 0; i < navIcons.length; i++) {
    navIcons.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  }

  $scope.donate = function() {
    console.log("1Np2iFGAPJNxpKkPpMHeqxaAotJZZUTrqr");
  };

  $scope.hideNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
  };

  $scope.showNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
  };

  $scope.noHeader = function() {
    var content = $('.main-content');
    for (var i = 0; i < content.length; i++) {
      if (content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }
  };

  $scope.setExpanded = function(bool) {
    $scope.isExpanded = bool;
  };

  $scope.setHeaderFab = function(location) {
    var hasHeaderFabLeft = false;
    var hasHeaderFabRight = false;

    switch (location) {
      case 'left':
        hasHeaderFabLeft = true;
        break;
      case 'right':
        hasHeaderFabRight = true;
        break;
    }

    $scope.hasHeaderFabLeft = hasHeaderFabLeft;
    $scope.hasHeaderFabRight = hasHeaderFabRight;
  };

  $scope.hasHeader = function() {
    var content = $('.main-content');
    for (var i = 0; i < content.length; i++) {
      if (!content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }
  };

  $scope.hideHeader = function() {
    $scope.hideNavBar();
    $scope.noHeader();
  };

  $scope.showHeader = function() {
    $scope.showNavBar();
    $scope.hasHeader();
  };

  $scope.clearFabs = function() {
    var fabs = document.getElementsByClassName('button-fab');
    if (fabs.length && fabs.length > 1) {
      fabs[0].remove();
    }
  };

  //$state.go('app.index');

  $scope.$on('$routeChangeError', function(event, current, previous, rejection) {
    //console.log('routeChangeError');
  });
});

app.controller('HeaderController', function ($scope, $rootScope, languageService, $location) {
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