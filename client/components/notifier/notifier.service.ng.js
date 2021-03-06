'use strict';

angular.module('refactorQApp')
.factory('notifier', function($meteor, $timeout) {

  // Private API
  var notifications = $meteor.collection(function() {
    return Notifications.find({});
  });

  var notifyMe = function(gitid, name) {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('RefactorQ', {
        icon: 'https://avatars.githubusercontent.com/u/' + gitid,
        body: name + " has recently made a help request",
      });

      notification.onclick = function () {
         window.focus();
      };
    }
  }

  // Public API
  return {
    addNotification: function(note) {
      // notifications.push(note);
      notifications.save({
        'uid'   : Meteor.user().services.github.id,
        'name'  : Meteor.user().profile.name || Meteor.user().services.github.username,
        'avatar': 'https://avatars.githubusercontent.com/u/' + Meteor.user().services.github.id
      });
    },
    notifyAdmins: function() {
      // timeout before clearing
      // notifications = [];
      if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        console.log('about to call notify');
        // notifyMe(Meteor.user().services.github.id, Meteor.user().profile.name || Meteor.user().services.github.username);
        notifyMe(notifications[0].uid, notifications[0].name);

        $timeout(function() {
          console.log('removing all notes');
          notifications.remove();
        }, 10000);
      }
    },
    getNotifications: function() {
      return notifications;
    }
  };


});
