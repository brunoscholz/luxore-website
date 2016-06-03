angular.module('docs', [
  'ui.router',
  'ct.ui.router.extras.core',
  'ct.ui.router.extras.sticky'
]);

angular.module('docs').config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  //set up the app parent state, and its child-states
  .state('docs', {
    abstract: true,
    sticky: true,
    views: {
      'master': { templateUrl: 'views/docs/main.html' }
    },
    controller:'DocsController'
  })
  .state('docs.index', {
    url: '/documentation',
    templateUrl:'views/docs/index.html'
  })
  .state('docs.about', {
    templateUrl:'views/docs/about.html'
  })
  ;

  $urlRouterProvider.otherwise("/documentation");
});

angular.module('docs').controller('DocsController', function ($scope, $location) {

});