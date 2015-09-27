'use strict'

angular.module('refactorQApp')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue-grey')
  .accentPalette('yellow');
});
