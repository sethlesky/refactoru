'use strict'

angular.module('refactorQApp')
  .controller('MainCtrl', function($scope, $meteor, requestQueue, $http) {
    $scope.requests = requestQueue.getQueue();
    $scope.admins = [];

    // show list of current admins
    var getAdmins = function() {
      Meteor.call('getAdmins', function(err, admins) {
        $scope.admins = [];
        admins.forEach(function(admin) {
          // console.log(admin);
          $http.get('https://api.github.com/users/' + admin.services.github.username)
            .then(function(response) {
              $scope.admins.push({
                name: response.data.name,
                login: response.data.login,
                avatar: response.data.avatar_url,
                gid: response.data.id,
                uid: admin._id
              });
            });
        });
      });
    }

    getAdmins();

    $scope.addAdmin = function() {
      $http.get('https://api.github.com/users/' + $scope.adminInput).then(function(response) {
        Meteor.call('getUser', $scope.adminInput, function(err, user) {
          if (err) {
            console.log(err);
            return;
          }
          Meteor.call('addAdmin', user._id, function() {
            getAdmins();
          });
        });
        $scope.adminInput = '';

      }, function(err) {
        console.log(err);
        $scope.adminInput = '';
      });

    }

    $scope.clearRequests = function() {
      $scope.requests.remove();
    }

    $scope.removeAdmin = function(admin) {
      console.log(admin);
      Meteor.call('removeAdmin', admin.uid, function() {
        getAdmins();
      });
    }

    $scope.adminOrOwner = function(request) {
      return (request.uid == Meteor.user().services.github.id) || Roles.userIsInRole(Meteor.userId(), ['admin']);
    }

  });
