'use strict';

angular.module('refactorQApp')
.factory('notifier', function($meteor, $timeout) {

  // Private API
  var notifications = $meteor.collection(function() {
    return Notifications.find({});
  });

  var notifyMe = function() {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('Notification title', {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: "Hey there! You've been notified!",
      });

      notification.onclick = function () {
        window.open("http://stackoverflow.com/a/13328397/1269037");
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
      });
    },
    notifyAdmins: function() {
      // timeout before clearing
      // notifications = [];
      if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        console.log('about to call notify');
        // notifyMe();
        new Notification('Notification title', {
                icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                body: "Hey there! You've been notified!",
              });

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
