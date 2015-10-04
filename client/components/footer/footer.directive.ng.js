'use strict';

angular.module('refactorQApp')
.directive('footer', function($meteor, $http, requestQueue) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/footer/footer.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      $meteor.session('githubId').bind(scope, 'githubId');
      scope.requests = requestQueue.getQueue();
      scope.addRequest = function(requestInput){
        scope.requests.save({
          'uid'       : Meteor.user().services.github.id,
          'name'      : Meteor.user().profile.name || Meteor.user().services.github.username,
          'time'      : new Date(),
          'content'   : scope.requestInput,
          'status'    : 0
        });
        scope.requestInput = '';

        angular.element("#uiViewContainer").animate({scrollTop: angular.element("#viewContainer").height()}, "slow");
      }
    }
  };
});
