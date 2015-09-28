'use strict';

angular.module('refactorQApp')
.directive('footer', function() {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/footer/footer.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      if (Meteor.userId()) {
        // scope.avatar = Session.get('avatar');
        Tracker.autorun(function(){
          if(Meteor.userId()){
            console.log('its running!');
            var username = Meteor.user().services.github.username;
            // Session.set('avatar', username);
            scope.avatar = username;
          }
        });
      } else {
        scope.avatar = 'none';
      }
    }
  };
});
