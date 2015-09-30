'use strict'

angular.module('refactorQApp')
.controller('MainCtrl', function($scope, $meteor, requestQueue) {

  $scope.requests = requestQueue.getQueue();
  $scope.wtf = Meteor.user()
  // requets.remove()
});
