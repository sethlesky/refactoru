Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {'services': 1}});
});

// Accounts.ui.config({
//   requestPermissions: {
//     github: ['user', 'repo', 'avatar_url']
//   }
// });

// Accounts.onCreateUser(function(options,user){
//     var accessToken = user.services.github.accessToken,result,profile;

//     result = Meteor.http.get("https://api.github.com/user", {
//         params: {
//             access_token: accessToken
//         }
//     });

//     if(result.error){
//         throw result.error
//     }

//     profile = _.pick(result.data,
//         "login",
//         "name",
//         "avatar_url",
//         "url",
//         "company",
//         "blog",
//         "location",
//         "email",
//         "bio",
//         "html_url");

//     user.profile = profile;

//     return user;
// });

// // Meteor.loginWithGithub({
// //   requestPermissions: ['user', 'public_repo']
// // }, function (err) {
// //   if (err)
// //     Session.set('errorMessage', err.reason || 'Unknown error');
// // });
