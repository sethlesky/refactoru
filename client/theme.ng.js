'use strict'

angular.module('refactorQApp')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('yellow')
  .accentPalette('yellow');
});
