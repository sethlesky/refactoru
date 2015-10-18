'use strict'

Meteor.publish('notifications', function(options, searchString) {
  var where = {
    'name': {
      '$regex': '.*' + (searchString || '') + '.*',
      '$options': 'i'
    }
  };
  Counts.publish(this, 'numberOfNotifications', Notifications.find(where), {noReady: true});
  return Notifications.find(where, options);
});
