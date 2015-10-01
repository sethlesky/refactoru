'use strict'

angular.module('refactorQApp')
  .controller('MainCtrl', function($scope, $meteor, requestQueue) {
    $scope.requests = requestQueue.getQueue();

    $scope.addAdmin = function() {
      $scope.adminInput = '';
    }

  });
