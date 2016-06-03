var app = angular.module('app', [
  'ui.router',
  'ct.ui.router.extras.core',
  'ct.ui.router.extras.sticky',
  'ngAnimate',
  'gettext',
  'uimodal'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  /*$locationProvider.html5Mode({enabled:true});*/

  $stateProvider
    //set up the app parent state, and its child-states
    .state('app', {
      abstract: true,
      sticky: true,
      views: {
        'master': { templateUrl: 'main.html' }
      }
    })

    .state('app.home', {
      url: '/',
      views: {
        'mainContent@app': {
          templateUrl: 'views/site/home.html',
        },
        'fabContent@app': {},
      }
    })
    .state('app.features', {
      url: '/features',
      views: {
        'mainContent@app': {
          templateUrl: 'views/site/features.html',
          controller: 'AppController'
        },
        'fabContent@app': {
          /*template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized spin"><i class="icon ion-chatbubbles"></i></button>',
          controller: function ($timeout) {
            $timeout(function () {
              document.getElementById('fab-friends').classList.toggle('on');
            }, 900);
          }*/
        }
      }
    })

    //set up the modal parent state, and its child-states
    .state("Modal", {
      abstract: true,
      sticky: true,
      views: {
        'modal': { templateUrl: 'modal.html' }
      },

      onEnter: ["$state", function($state) {
        $(document).on("keyup", function(e) {
          if(e.keyCode === 27) {
            $(document).off("keyup");
            $state.go("Modal.Default");
          }
        });

        /*$(document).on("click", ".Modal-backdrop, .Modal-holder", function() {
          $state.go("Modal.Default");
        });

        $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
          e.stopPropagation();
        });*/
      }],
    })
    .state("Modal.Default", {})
    .state("Modal.bitcoinDonate", {
      templateUrl: "modals/bitcoin.html"
    })
    .state("Modal.watchVideo", {
      templateUrl: "modals/video.html"
    });

    /*.state('splash', {
      url: '/splash',
      templateUrl: 'templates/luxore.html',
      controller: 'SplashCtrl'
    })*/

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
});

app.run(function ($rootScope, $state, $stateParams, languageService, gettextCatalog) {

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

  $state.go('app.home').then(function() {
    $state.go('Modal.Default');
  });
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

});

app.controller('AppController', function ($scope, $state, $timeout, modal) {

  $(window).on('resize', function(){
    //on window resize - update cover layer dimention and position
    if($('.cd-modal-section.modal-is-visible').length > 0) {
      window.requestAnimationFrame(modal.updateLayer);
    }
  });

  /*$('[data-type="modal-trigger"]').on('click', OpenModal(this));
  $('.cd-modal-section .cd-modal-close').on('click', CloseModal());*/

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

  $scope.$state = $state;

  $scope.donateInBitcoin = function(e) {
    // console.log("1Np2iFGAPJNxpKkPpMHeqxaAotJZZUTrqr");
    var elem = angular.element(e.target);
    modal.open(elem);
    $state.go('Modal.bitcoinDonate');
  };

  $scope.watchVideo = function(e) {
    var elem = angular.element(e.target);
    modal.open(elem);
    $state.go('Modal.watchVideo');
  };

  $scope.closeModal = function() {
    modal.close();
    $state.go('Modal.Default');
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