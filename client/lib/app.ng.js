angular.module('refactorQApp', [
  'angular-meteor',
  'ui.router',
  'ngMaterial',
  'angularUtils.directives.dirPagination',
  'angularMoment'
]);

onReady = function() {
  angular.bootstrap(document, ['refactorQApp']);

  if (Notification.permission !== "granted")
    Notification.requestPermission();

};

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
