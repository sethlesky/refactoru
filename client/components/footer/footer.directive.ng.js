'use strict';

angular.module('refactorQApp')
.directive('footer', function($meteor, $http, requestQueue, notifier) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/footer/footer.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      $meteor.session('githubId').bind(scope, 'githubId');
      scope.requests = requestQueue.getQueue();
      scope.addRequest = function(requestInput){
        $http.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + scope.emotion)
          .success(function(response) {
            console.log(scope.emotion,response.data);
            if (!scope.emotion)
              response.data.image_url = '';

            scope.requests.save({
              'uid'       : Meteor.user().services.github.id,
              'name'      : Meteor.user().profile.name || Meteor.user().services.github.username,
              'time'      : new Date(),
              'content'   : scope.requestInput,
              'status'    : 0,
              'emotion'   : scope.emotion,
              'giphy'     : response.data.image_url
            });
            notifier.addNotification(scope.requestInput);
            scope.requestInput = '';
            scope.emotion = null;
            angular.element("#uiViewContainer").animate({scrollTop: angular.element("#viewContainer").height()}, "slow");
          })
          .catch(function(response) {
            console.log('error', response)
          });
      }

      scope.emotions = [
        "Awkward",
        "Bored",
        "Drunk",
        "Hungry",
        "Mind Blown",
        "Angry",
        "Disappointed",
        "Embarassed",
        "Excited",
        "Funny",
        "Frustrated",
        "Happy",
        "Stoned",
        "Inspired",
        "Nervous",
        "Pain",
        "Relaxed",
        "Sad",
        "Sassy",
        "Scared",
        "Shocked",
        "Stressed",
        "Surpised",
        "Tired",
        "Interested",
        "Curious",
        "Confused"
      ];
    }
  };
});
