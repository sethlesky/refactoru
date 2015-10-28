'use strict';

Meteor.methods({
  addAdmin: function(uid) {
    console.log('adding admin');
    Roles.addUsersToRoles(uid, ['admin']);
    // console.log(Roles.userIsInRole(uid, ['admin']));
  },
  getAdmins: function() {
    console.log('getting admins');
    return Roles.getUsersInRole('admin').fetch();
  },
  getUser: function(username) {
    // this.userId make sure current user is admin
    // console.log('who did this', this);
    console.log('get user', username);
    // console.log(Meteor.users.findOne({'services.github.username': username}));
    return Meteor.users.findOne({'services.github.username': username});
  },
  removeAdmin: function(uid) {
    console.log('removing', uid);
    Roles.setUserRoles(uid, []);
  }
});
