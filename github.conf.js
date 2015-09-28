if (Meteor.isClient) {

  Meteor.subscribe('userData');

  Tracker.autorun(function(){
    if(Meteor.user()){
      console.log('its running!');
      var username = Meteor.user().services.github.username;
      Session.set('avatar', username);
      // console.log(username);
    } else {
      Session.set('avatar', null);
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'services': 1}});
  });
}
