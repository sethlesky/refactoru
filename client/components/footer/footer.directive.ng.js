'use strict';

angular.module('refactorQApp')
.directive('footer', function() {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/footer/footer.view.html',
    replace: true,
    link: function(scope, elem, attrs) {
      scope.property = 'footer';
    }
  };
});