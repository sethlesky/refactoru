Meteor.startup(function() {
  if(Notifications.find().count() === 0) {
    var notifications = [
      {
        'name': 'notification 1'
      },
      {
        'name': 'notification 2'
      }
    ];
    notifications.forEach(function(notification) {
      Notifications.insert(notification);
    });
  }
});