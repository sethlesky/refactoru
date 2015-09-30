'use strict';

angular.module('refactorQApp')
.directive('footer', function($meteor, $http, requestQueue) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/footer/footer.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      $meteor.session('avatar').bind(scope, 'avatar');
      scope.currentAvatar = "https://avatars.githubusercontent.com/u/" + scope.avatar;
      scope.requests = requestQueue.getQueue();
      scope.addRequest = function(requestInput){
        scope.requests.save({
          'uid'       : Meteor.user().services.github.id,
          'name'      : Meteor.user().services.github.username,
          'time'      : new Date(),
          'content'   : scope.requestInput,
          'status'    : 0
        });
        scope.requestInput = '';
      }
    }
  };
});
