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
    views: {
      'mainContent@docs': {
        templateUrl:'views/docs/index.html'
      }
    }
  })
  .state('docs.about', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/about.html' } }
  })
  .state('docs.looks', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/looks.html' } }
  })
  .state('docs.coin', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/coin.html' } }
  })
  .state('docs.studios', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/studios.html' } }
  })
  .state('docs.news', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/news.html' } }
  })
  .state('docs.gamification', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/gamification.html' } }
  })
  .state('docs.social', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/social.html' } }
  })
  .state('docs.lists', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/lists.html' } }
  })
  .state('docs.search', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/search.html' } }
  })
  .state('docs.tags', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/tags.html' } }
  })
  .state('docs.tips', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/tips.html' } }
  })
  .state('docs.profile', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/profile.html' } }
  })
  .state('docs.notifications', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/notifications.html' } }
  })
  .state('docs.messenger', {
    views: { 'mainContent@docs': { templateUrl:'views/docs/features/messenger.html' } }
  })

  ;

  $urlRouterProvider.otherwise("/documentation");
});

angular.module('docs').controller('DocsController', function ($scope, $location) {

});