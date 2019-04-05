const vm = new Vue({
  el: '#app',
  data: {
    notifications: {
      api: !!window.Notification,
      granted: Notification.permission === 'granted'
    },
    serviceWorkers: {
      api: !!('serviceWorker' in navigator),
      registered: false
    },
    pushManager: {
      api: !!('PushManager' in window)
    }
  },
  methods: {
    getNotificationPerms() {
      Notification.requestPermission(function (status) {
        console.log(status);
        this.granted = status === 'granted';
      });
    },
    sendBasicNotification() {
      var notification = new Notification('Test Notification.', {
        lang : 'en',
        body : 'We sent this because you clicked that button.',
        tag : 'test-notification',
        icon : 'assets/favicon/favicon-32x32.png'
      })
    },
    async registerServiceWorker() {
      await navigator.serviceWorker.register('service.js');
      this.serviceWorkers.registered = (await navigator.serviceWorker.getRegistration('service.js')).active;
    }
  },
  created: function () {
    if (this.serviceWorkers.api) {
      this.registerServiceWorker();
    }
  }
});