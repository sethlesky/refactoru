'use strict'

angular.module('refactorQApp')
  .controller('MainCtrl', function($scope, $meteor, requestQueue, $http, notifier) {
    $scope.requests = requestQueue.getQueue();
    $scope.admins = [];
    $scope.notifications = notifier.getNotifications();

    $scope.onlineUsers = $meteor.collection(function() {
      return OnlineUsers.find({});
    });

    // show list of current admins
    var getAdmins = function() {
      Meteor.call('getAdmins', function(err, admins) {
        $scope.admins = [];
        admins.forEach(function(admin) {
          // console.log(admin);
          $http.get('https://api.github.com/users/' + admin.services.github.username + "?access_token=" + Meteor.user().services.github.accessToken)
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

    $scope.$watchCollection(
        'notifications',
        function( newValue, oldValue ) {
            if ($scope.notifications.length > 0) {
              console.log('notifying', $scope.notifications.length);
              notifier.notifyAdmins();
            }
        }
    );

    $scope.addAdmin = function() {
      $http.get('https://api.github.com/users/' + $scope.adminInput + "?access_token=" + Meteor.user().services.github.accessToken).then(function(response) {
        Meteor.call('getUser', $scope.adminInput, function(err, user) {
          if (err || !user) {
            console.log(err);
            if (!user) {
              alert('User needs to login once before becoming an admin');
            }
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
      if (Meteor.user() && Meteor.user().services && Meteor.user().services.github) {
        return (request.uid == Meteor.user().services.github.id)
                || Roles.userIsInRole(Meteor.userId(), ['admin']);
      }
      return false;
    }

  });
