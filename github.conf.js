if (Meteor.isClient) {

  Meteor.subscribe('requests');
  Meteor.subscribe('notifications');
  Meteor.subscribe('onlineUsers');

  Meteor.subscribe("userData", {
    onReady: function () {
      Tracker.autorun(function(){
        if(Meteor.userId() && Meteor.user()){
          var githubId = Meteor.user().services.github.id;
          Session.set('githubId', githubId);
        } else {
          Session.set('githubId', false);
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

  Meteor.publish("onlineUsers", function() {
    return Meteor.users.find({ "status.online": true }, { fields: { 'services': 1, 'profile': 1, 'roles': 1, 'status': 1 } });
  });
}
