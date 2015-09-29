Meteor.startup(function() {
  if(Requests.find().count() === 0) {
    var requests = [
      {
        'uid'     : 271898,
        'status'  : 'open',
        'time'    : new Date(),
        'name'    : 'Seth Lesky',
        'content' : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam possimus atque facere ratione velit molestias'
      },
      {
        'uid'     : 448783,
        'status'  : 'closed',
        'time'    : new Date(),
        'name'    : 'Bob Barker',
        'content' : 'A hack born out of idle curiosity by GitHub user #696: Caius Durling'
      },
      {
        'uid'     : 11048672,
        'status'  : 'pending',
        'time'    : new Date(),
        'name'    : 'Tucker Kline',
        'content' : 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
      }
    ];
    requests.forEach(function(request) {
      Requests.insert(request);
    });
  }
});
