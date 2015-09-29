if (Meteor.isClient) {

  Meteor.subscribe('userData');
  Meteor.subscribe('requests');

  Tracker.autorun(function(){
    if(Meteor.user()){
      console.log('logged in');
      var username = Meteor.user().services.github.id;
      Session.set('avatar', username);
    } else {
      Session.set('avatar', false);
      console.log('logged out');
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'services': 1}});
  });
}
