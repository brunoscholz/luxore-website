var appL = angular.module('app.languages', [
  'gettext'
]);

appL.factory('userStorage', function ($rootScope, $window) {
  var service = {
    model: {
        lang: ''
    },
    SaveState: function () {
      //sessionStorage.userStorage = angular.toJson(service.model);
      $window.localStorage.setItem('userPrefs', angular.toJson(service.model));
    },
    RestoreState: function () {
      //service.model = angular.fromJson(sessionStorage.userStorage);
      service.model = angular.fromJson($window.localStorage.getItem('userPrefs'));
    }
  };

  /*$rootScope.$on("savestate", service.SaveState);
  $rootScope.$on("restorestate", service.RestoreState);*/

  return service;
});

appL.service('languageService', function ($rootScope, $window, gettextCatalog, userStorage) {
    var self = this;

    var userPrefs = userStorage;

    $rootScope.languages = [
        { id: 'en', name: 'English', country: 'us' },
        { id: 'pt_BR', name: 'Português', country: 'br' }
        /*{ id: 'es', name: 'Español', country: 'es' },
        { id: 'fr', name: 'Français', country: 'fr' },*/
    ];

    /*
        { id: 'de', name: 'Deutsch' },
        { id: 'hu', name: 'Magyar' },
        { id: 'nl', name: 'Nederlands' },
        { id: 'ru', name: 'Pусский' },
        { id: 'zh', name: '中文' }
    */

    $rootScope.changeLang = function (changed) {
        if (!changed) { return; }

        var lang = findLang(changed);

        if (lang) {
            userPrefs.model.lang = lang;
            userPrefs.SaveState();
            $rootScope.lang = lang;
            $rootScope.selectedLang = $rootScope.lang.id;
            $rootScope.selectedCountry = $rootScope.lang.country;
            gettextCatalog.setCurrentLanguage(lang.id);
            console.log('Language changed to:', lang.name);
        }
    };

    var detectLang = function () {
        console.log("Language: " + $window.navigator.languages);
        console.log("Browser : " + $window.navigator.browserLanguage);
        console.log("User    : " + $window.navigator.userLanguage);
        var lang = $window.navigator.languages ? $window.navigator.languages[0] : null;
            lang = lang || $window.navigator.language || $window.navigator.browserLanguage || $window.navigator.userLanguage;

        if (lang.indexOf('-') !== -1) { lang = lang.split('-')[0]; }
        if (lang.indexOf('_') !== -1) { lang = lang.split('_')[0]; }

        return findLang(lang) || $rootScope.languages[0];
    };

    var findLang = function (id) {
        return _.find($rootScope.languages, function (lang) {
            return (lang.id === id) || (lang === id);
        });
    };

    return function () {
        userPrefs.RestoreState();
        if (userPrefs.model !== null) {
            $rootScope.lang = userPrefs.model.lang;
        }
        else {
            $rootScope.lang = detectLang();
            userPrefs.model = { lang: '' };
            userPrefs.model.lang = $rootScope.lang;
            userPrefs.SaveState();
        }

        $rootScope.selectedLang = $rootScope.lang.id;
        $rootScope.selectedCountry = $rootScope.lang.country;
        // console.log($rootScope.lang);
        // console.log($rootScope.selectedLang);
        gettextCatalog.setCurrentLanguage($rootScope.lang.id);
        // console.log(angular.fromJson($window.localStorage.getItem('userPrefs')));
    };
});