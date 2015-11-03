'use strict'

angular.module('refactorQApp')
  .controller('MainCtrl', function($scope, $meteor, requestQueue, $http, notifier, $mdDialog) {
    $scope.requests = requestQueue.getQueue();
    $scope.admins = [];
    $scope.notifications = notifier.getNotifications();

    $scope.onlineUsers = $meteor.collection(function() {
      return Meteor.users.find({});
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

    $scope.joinRequest = function(request) {
      var found = false;
      request.users.forEach(function(user) {
        if (user.userId == Meteor.userId()) {
          found = true;
          console.log('found dont add');
        }
      })

      if (!found) {
        request.users.push({
          userId    : Meteor.userId(),
          name      : Meteor.user().profile.name,
          github    : Meteor.user().services.github.id
        });
      }
    }

    $scope.adminOrOwner = function(request) {
      if (Meteor.user() && Meteor.user().services && Meteor.user().services.github) {
        return (request.uid == Meteor.user().services.github.id)
                || Roles.userIsInRole(Meteor.userId(), ['admin']);
      }
      return false;
    }

    $scope.isRequestOwner = function(request) {
      if (Meteor.user() && Meteor.user().services && Meteor.user().services.github) {
        return (request.uid == Meteor.user().services.github.id);
      }
    }

    $scope.statusChanged = function(request) {
      // console.log('status', status);
      switch(request.status) {
        case "0":
          console.log(0);
          break;
        case "1":
          console.log(1);
          $scope.joinRequest(request);
          break;
        case "2":
          console.log(2);
          break
      }
    }

    $scope.items = [1,2,3];
    var alert;
    $scope.showDialog = function($event) {
      var parentEl = angular.element(document.querySelector('md-content'));
      alert = $mdDialog.alert({
        parent: parentEl,
        targetEvent: $event,
        template:
          '<md-dialog aria-label="Sample Dialog" style="min-width: 400px;">' +
          '    <md-toolbar> ' +
          '      <div class="md-toolbar-tools">' +
          '        <h2>Your feedback helps us improve </h2>' +
          '        <span flex></span>' +
          '      </div>'+
          '    </md-toolbar>'+
          '  <md-content>'+
          ' ' +
          '  <md-input-container class="md-block" style="margin: 30px">' +
          '    <label>Feedback</label>' +
          '    <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea>'+
          '  </md-input-container>'+
          '  </md-content>' +
          '  <div class="md-actions" layout="row", layout-align="space-between center">' +
          '  <section layout="row" layout-sm="column" layout-align="center center">'+
          '    <span>TIP</span>' +
          '    <md-button class="groupX left">$5</md-button>'+
          '    <md-button class="groupX middle">$25</md-button>'+
          '    <md-button class="groupX middle">$50</md-button>'+
          '    <md-button class="groupX right">$100</md-button>'+
          '  </section>' +
          '    <md-button class="md-raised" ng-click="ctrl.closeDialog()">' +
          '      Submit' +
          '    </md-button>' +
          '  </div>' +
          '</md-dialog>',
          locals: {
            items: $scope.items,
            closeDialog: $scope.closeDialog
          },
          bindToController: true,
          controllerAs: 'ctrl',
          controller: 'DialogController'
      });

        $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
      }
      $scope.closeDialog = function() {
        $mdDialog.hide();
      };

  })
  .controller('DialogController', function($scope, $mdDialog) {
  //alert( this.closeDialog );
  //this.closeDialog = $scope.closeDialog;

    /*$scope.closeDialog = function() {
      $mdDialog.hide();
    };*/
  });



