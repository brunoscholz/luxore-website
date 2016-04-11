angular.module('resources.profiles', ['mongolabResource']);
angular.module('resources.profiles').factory('Profile', ['mongolabResource', function ($mongolabResource) {
  var profile = $mongolabResource('profile');

  profile.forUser = function (user) {
    return profile.query({userId:user._id.$oid});
  };

  return profile;
}]);