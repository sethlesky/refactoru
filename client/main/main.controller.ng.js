'use strict'

angular.module('refactorQApp')
  .controller('MainCtrl', function($scope, $meteor, requestQueue, $http) {
    $scope.requests = requestQueue.getQueue();
    $scope.admins = [];

    $scope.addAdmin = function() {

      $http.get('https://api.github.com/users/' + $scope.adminInput).then(function(response) {
        var user = Meteor.users.findOne({'services.github.username': $scope.adminInput});
        if (user) {
          $scope.admins.push({
            name: response.data.name,
            login: response.data.login,
            avatar: response.data.avatar_url,
            uid: response.data.id
          });
        } else {
          alert('That user cannot be found, please check their username and make sure they have already logged in.');
        }
        $scope.adminInput = '';

      }, function(err) {
        console.log(err);
        $scope.adminInput = '';
      });

    }

    $scope.clearRequests = function() {
      $scope.requests.remove();
    }

  });
