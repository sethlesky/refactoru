if (Meteor.isClient) {

  Meteor.subscribe('userData');

  Tracker.autorun(function(){
    if(Meteor.user()){
      console.log('its running!');
      var username = Meteor.user().services.github.id;
      Session.set('avatar', username);
    } else {
      Session.set('avatar', false);
      console.log('not logged in');
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'services': 1}});
  });
}
