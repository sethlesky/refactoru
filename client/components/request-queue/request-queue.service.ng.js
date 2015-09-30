'use strict';

angular.module('refactorQApp')
.factory('requestQueue', function($meteor) {

  return {
    getQueue: function() {
      var requests = $meteor.collection(function() {
        return Requests.find({});
      });

      return requests;
    }
  };
});
