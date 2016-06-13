var app = angular.module('app', [
  'ui.router',
  'ct.ui.router.extras.core',
  'ct.ui.router.extras.sticky',
  'timer',
  'ngAnimate',
  'gettext',
  'ngClipboard',
  'uimodal',
  'docs'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  /*$locationProvider.html5Mode({enabled:true});*/

  var states = [];
  // Root of main app states
  states.push({
    name: 'app',
    abstract: true,
    views: {
      'master': { controller: 'AppController', templateUrl: 'main.html' },
    },
    deepStateRedirect: { default: "app.home" },
    sticky: true
  });
  
  // Home
  states.push({
    name: 'app.home',
    url: '/',
    views: {
      'mainContent@app': {
        controller: 'AppController',
        templateUrl: 'views/site/home.html'
      },
      'fabContent@app': {},
    },
    deepStateRedirect: { default: "app" }
  });
  states.push({
    name: 'app.features',
    url: '/features',
    views: {
      'mainContent@app': {
        templateUrl: 'views/site/features.html'
      },
      'fabContent@app': {
        /*template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized spin"><i class="icon ion-chatbubbles"></i></button>',
        controller: function ($timeout) {
          $timeout(function () {
            document.getElementById('fab-friends').classList.toggle('on');
          }, 900);
        }*/
      }
    },
  });

  states.push({
    name: 'app.faq',
    url: '/faq',
    views: {
      'mainContent@app': {
        templateUrl:'views/site/faq.html'
      }
    }
    //controller:'FaqController',
  });
  states.push({
    name: 'app.terms',
    url: '/terms-of-use',
    views: {
      'mainContent@app': {
        templateUrl:'views/site/terms.html'
      }
    }
  });
  states.push({
    name: 'app.ethics',
    url: '/ethical-guidelines',
    views: {
      'mainContent@app': {
        templateUrl:'views/site/ethics.html'
      }
    }
  });

  states.push({
    name: 'app.team',
    url: '/team',
    views: {
      'mainContent@app': {
        templateUrl:'views/site/team.html'
      }
    }
  });

  //set up the modal parent state, and its child-states
  states.push({
    name: "Modal",
    abstract: true,
    sticky: true,
    views: {
      'modal': { templateUrl: 'modal.html' }
    },

    onEnter: ["$state", function($state) {
      $(document).on("keyup", function(e) {
        if(e.keyCode === 27) {
          $(document).off("keyup");
          //$state.go("Modal.Default");
          //$scope.closeModal();
        }
      });

      /*$(document).on("click", ".Modal-backdrop, .Modal-holder", function() {
        $state.go("Modal.Default");
      });

      $(document).on("click", ".Modal-box, .Modal-box *", function(e) {
        e.stopPropagation();
      });*/
    }],
    deepStateRedirect: { default: "Modal.Default" },
  });
  states.push({
    name: "Modal.Default"
  });
  states.push({
    name:  "Modal.bitcoinDonate",
    templateUrl: "modals/bitcoin.html"
  });
  states.push({
    name:  "Modal.watchVideo",
    templateUrl: "modals/video.html"
  });

  angular.forEach(states, function(state) { $stateProvider.state(state); });
  $urlRouterProvider.otherwise("/");
});

app.run(function ($rootScope, $state, $stateParams, languageService, gettextCatalog, $timeout, $window) {

  languageService();
  gettextCatalog.debug = true;
  //gettextCatalog.currentLanguage = 'pt_BR';

  /*$rootScope.searchQueryChanged = function(query) {
    $rootScope.searchQuery = query;
  };*/

  $("body").delay(260).queue(function(next) {
    $(this).addClass("loaded");
    next();
  });

  $rootScope.$state = $state;
  // This code applies a default background state for the modal
  $rootScope.$on("$stateChangeStart", function(evt, toState, toParams, fromState) {
    // Is initial transition and is going to modal1.*?
    if (fromState.name === '' && /Modal.*/.exec(toState.name)) {
      evt.preventDefault(); // cancel initial transition

      // go to app.home, then go to modal1.whatever
      $state.go("app.home", null, { location: false }).then(function() {
        $state.go(toState, toParams); }
      );
    }
  });

  $rootScope.$on("$stateChangeSuccess", function() {
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    $timeout(function() {
      $window.ga('send', 'pageview', $window.location.pathname+$window.location.hash);
    });
  });
});

app.controller('AppController', function ($scope, $state, ngClipboard, modal) {
  $scope.toClipboard = function(element) {
    ngClipboard.toClipboard(element);
    Materialize.toast('Address Copied!', 4000, 'rounded');
  };

  $(window).on('resize', function() {
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
    console.log(elem);
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

app.controller('NewsletterController', function ($scope, languageService, NewsletterData) {
  $scope.user = { email:'' };

  function sendMailSuccess(data) {
    alert('email sent to ' + $scope.user.email);
    console.log(data);
    //$scope.error = null;
  }

  function sendMailError(data) {
    alert('error while sending email to ' + $scope.user.email);
    //$scope.error = data;
    console.log(data);
  }

  $scope.sendEmail = function (usr) {
    NewsletterData.SendEmail({ email: $scope.user.email, subject: 'Newsletter Subscription' })
      .success(sendMailSuccess)
      .error(sendMailError);
  };
});

angular.module('app').factory('NewsletterData', function($http) {
  var data = {};

  data.SendEmail = function SendEmail(data) { return $http.post('../send_email.php', data); };
  //data.getPerson = function getPerson(id) { return $http.get('read_one.php?id=' + id); };

  return data;
});

app.controller('HeaderController', function ($scope, $rootScope, languageService, $location) {
  $scope.location = $location;

  $scope.selectLanguage = function (code) {
    $rootScope.changeLang(code);
  };

  $scope.home = function () {
      $location.path('/');
  };

  // KICKSTARTER Start Date Sat Jun 20 2016 09:00:00 GMT-0400
  // miliseconds: 1466427600000
  // {{'support us on kickstarter'|translate}}
  $scope.kickTimer = 1466413200000;
  $scope.timerRunning = false;
  var timeStarted = false;

  var d1 = new Date();
  var d2 = new Date($scope.kickTimer);

  $scope.startClock = function() {
    if (!timeStarted) {
      $scope.$broadcast('timer-start');
      $scope.timerRunning = true;
      timeStarted = true;
    } else if ((timeStarted) && (!$scope.timerRunning)) {
      $scope.$broadcast('timer-resume');
      $scope.timerRunning = true;
    }
  };

  $scope.stopClock = function() {
    if ((timeStarted) && ($scope.timerRunning)) {
      $scope.$broadcast('timer-stop');
      $scope.timerRunning = false;
    }
  };

  $scope.resetClock = function() {
    if ((!$scope.timerRunning)) {
      $scope.$broadcast('timer-reset');
    }
  };

  $scope.$on('timer-stopped', function(event, data) {
      timeStarted = true;
  });

  $scope.isNavbarActive = function (navBarPath) {
    //return navBarPath === breadcrumbs.getFirst().name;
  };

  if(d1 < d2) {
    console.log('Starting the clock!');
    $scope.startClock();
  }
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