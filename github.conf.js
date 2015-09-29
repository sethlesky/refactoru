if (Meteor.isClient) {

  Meteor.subscribe('requests');

  Meteor.subscribe("userData", {
    onReady: function () {
      Tracker.autorun(function(){
        if(Meteor.userId() && Meteor.user()){
          var username = Meteor.user().services.github.id;
          Session.set('avatar', username);
        } else {
          Session.set('avatar', false);
        }
      });
    },
    onError: function () { console.log("onError", arguments); }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'services': 1}});
  });
}
