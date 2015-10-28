Meteor.publishComposite('userPresence', {
    find: function() {
        var filter = {
          userId: {
            $exists: true
          }
        };
        return Presences.find(filter, {});
    },
    children: [
        {
            collectionName: "onlineUsers",
            find: function(pres) {
                return Meteor.users.find(
                    { _id: pres.userId },
                    { limit: 1, fields: { 'services.github.id': 1, 'profile': 1 } });
            }
        },
    ]
});
