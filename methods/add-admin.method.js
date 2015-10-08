'use strict';

Meteor.methods({
  addAdmin: function(uid) {
    //return a value
    console.log('uid', uid);
    console.log(Roles.addUsersToRoles(uid, ['admin']));
    console.log(Roles.userIsInRole(uid, ['admin']));
  }
});
