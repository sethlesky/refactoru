'use strict'

Meteor.publish('requests', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfRequests', Requests.find(where), {noReady: true});
  return Requests.find(where, options);
});
