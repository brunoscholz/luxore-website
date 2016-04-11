/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/files.coffee
 */
module.exports = function(lineman) {
  //Override file patterns here
  return {
    js: {
      vendor: [
        "vendor/js/angular.js",
        "vendor/js/**/*.js"
      ],
      app: [
        "app/js/app.js",
        "app/js/**/*.js"
      ]
    },

    css: {
      vendor: [
        "vendor/css/normalize.css",
        'vendor/css/bootstrap.min.css',
        'vendor/css/font-awesome.min.css',
        'vendor/css/flexslider.css',
        'vendor/css/style.css',
        'vendor/css/style-responsive.css',
        'vendor/css/isotope.css',
        "vendor/css/**/*.css"
      ],
      app: [
        "app/css/main.js",
        "app/css/orange.js"
      ]
    }

    /*
    less: {
      compile: {
        options: {
          paths: ["vendor/css/normalize.css", "vendor/css//*.css", "app/css//*.less"]
        }
      }
    }*/
  };
};
