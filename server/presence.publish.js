// Meteor.publish('userPresence', function() {
//   // Setup some filter to find the users your user
//   // cares about. It's unlikely that you want to publish the
//   // presences of _all_ the users in the system.

//   // If for example we wanted to publish only logged in users we could apply:
//   var filter = {
//     userId: {
//       $exists: true
//     }
//   };
//   // var filter = {};

//   return Meteor.presences.find(filter, {
//     fields: {
//       state: true,
//       userId: true
//     }
//   });

// });

// Meteor.publishComposite('userPresence',function() {
//   return {
//     find: function() {
//       return Presences.find({});
//     },
//     children: [
//       {
//         find: function(pres) {
//           return Meteor.users.find({_id: pres.userId});
//           // note you can reference the data from the first collection here using
//           // collection_1_object which is automatically passed down as a cascade
//       }
//     ]
//   }
// });

Meteor.publishComposite('userPresence', {
    find: function() {
        // Find top ten highest scoring posts
        return Presences.find({});
    },
    children: [
        {
            collectionName: "onlineUsers",
            find: function(pres) {
                // Find post author. Even though we only want to return
                // one record here, we use "find" instead of "findOne"
                // since this function should return a cursor.
                console.log('populate children', pres.userId);
                var f = Meteor.users.find(
                    { _id: pres.userId },
                    { limit: 1, fields: { services: 1 } });
                console.log(f.fetch());
                return f;
            }
        },
    ]
});



//https://atmospherejs.com/reywood/publish-composite

// Meteor.presences.find({}, {transform:function(doc) {
//         var user = Meteor.users.findOne({_id:doc.userId});
//         if(user) doc.profile = user.profile;
//         return doc;
//     }
// });
//

// Meteor.call('getUserProfile', 'ZshRDFJ6AE5srdoZK', function(err, item) {
//   console.log(err, item)
// })
