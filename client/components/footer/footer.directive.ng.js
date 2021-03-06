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
      scope.floobitsURL = '';

      scope.addRequest = function(requestInput){
        $http.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + scope.emotion)
          .success(function(response) {
            console.log(scope.emotion,response.data);
            if (!scope.emotion)
              response.data.image_url = '';

            // check for floobits url
            var content  = '';
            scope.requestInput.split(' ').forEach(function(word) {
              if (word.match('floobits.com')) {
                scope.floobitsURL = word;
              } else {
                content += word + ' ';
              }
            })

            scope.requests.save({
              'uid'       : Meteor.user().services.github.id,
              'name'      : Meteor.user().profile.name || Meteor.user().services.github.username,
              'time'      : new Date(),
              'content'   : content,
              'status'    : 0,
              'emotion'   : scope.emotion,
              'giphy'     : response.data.image_url,
              'floobits'  : scope.floobitsURL || '',
              'users'     : []
            });
            notifier.addNotification(scope.requestInput);
            scope.requestInput = '';
            scope.floobitsURL = '';
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
        "Excited",
        "Hungry",
        "Mind Blown",
        "Sad",
        "Frustrated",
        "Tired",
        "Inspired",
        "Angry",
        "Disappointed",
        "Embarassed",
        "Funny",
        "Happy",
        "Stoned",
        "Nervous",
        "Pain",
        "Relaxed",
        "Sassy",
        "Drunk",
        "Scared",
        "Shocked",
        "Stressed",
        "Surpised",
        "Interested",
        "Curious",
        "Confused"
      ];
    }
  };
});
