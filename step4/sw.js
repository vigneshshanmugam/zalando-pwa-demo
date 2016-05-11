
self.addEventListener('push', function(event) {
	var notificationOptions = {
    body: 'Hello!',
    icon: './static/zalando.png',
    tag: 'push-notification-tag',
    data: {
      url: 'https://www.zalando.de/'
    }
  };
  return self.registration.showNotification('Zalando PWA Notification', notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(
    Promise.resolve(clients.openWindow(event.notification.data.url))
  );
});

