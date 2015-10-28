if (Meteor.isClient) {

  Meteor.subscribe('requests');
  Meteor.subscribe('notifications');
  Meteor.subscribe('userPresence');
  OnlineUsers = new Meteor.Collection("onlineUsers");

// Meteor.presences.find({}, {transform:function(doc) {
//         var user = Meteor.users.findOne({_id:doc.userId});
//         if(user) doc.profile = user.profile;
//         return doc;
//     }
// });

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
}
