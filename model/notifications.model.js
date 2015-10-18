Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  insert: function(userId, notification) {
    return true;
  },
  update: function(userId, notification, fields, modifier) {
    return true;
  },
  remove: function(userId, notification) {
    return true;
  }
});