'use strict'

angular.module('refactorQApp')
  .directive('toolbar', function($timeout, $mdSidenav, $mdUtil) {
    return {
      restrict: 'AE',
      templateUrl: 'client/components/toolbar/toolbar.view.html',
      replace: true,
      link: function(scope, elem, attrs) {
        function buildToggler(navID) {
          var debounceFn = $mdUtil.debounce(function() {
            $mdSidenav(navID)
              .toggle()
              .then(function() {
                console.log("toggle " + navID + " is done");
              });
          }, 200);
          return debounceFn;
        }

        scope.toggleRight = buildToggler('right');

        scope.close = function () {
          $mdSidenav('right').close()
            .then(function () {
              console.log("close RIGHT is done");
            });
        };

        scope.isAdmin = function() {
          console.log(Roles.userIsInRole(Meteor.userId(), ['admin']));
          return Roles.userIsInRole(Meteor.userId(), ['admin']);
        }
      }
    };
  });
