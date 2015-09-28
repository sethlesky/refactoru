'use strict';

angular.module('refactorQApp')
.directive('footer', function($meteor, $http) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/footer/footer.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      $meteor.session('avatar').bind(scope, 'avatar');
      // query https://api.github.com/users/[username]
      // $http;
      // console.log("https://api.github.com/users/" + scope.avatar);
      if (scope.avatar)
        scope.currentAvatar = "https://avatars.githubusercontent.com/u/" + scope.avatar;
    }
  };
});
