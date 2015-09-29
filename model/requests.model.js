Requests = new Mongo.Collection('requests');

Requests.allow({
  insert: function(userId, request) {
    return true;
  },
  update: function(userId, request, fields, modifier) {
    return true;
  },
  remove: function(userId, request) {
    return true;
  }
});
