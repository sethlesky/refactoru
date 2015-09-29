'use strict';

angular.module('refactorQApp')
.directive('footer', function($meteor, $http) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/footer/footer.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      $meteor.session('avatar').bind(scope, 'avatar');
      scope.currentAvatar = "https://avatars.githubusercontent.com/u/" + scope.avatar;
      scope.addRequest = function(requestInput){
        console.log(requestInput);
        scope.requestInput = '';
      }
    }
  };
});
