/**
 * Give our cache a name
 */
const CACHENAME = 'zalando-pwa-demo';

/**
 * Install Event
 *
 * - Preparation of Service Worker
 * - Populate Cache
 */
self.addEventListener('install', function(event) {

  /**
   * Declare resources
   */
  const resources = [
    '/',
    '/static/main.js',
    '/static/styles.css'
  ];

  /**
   * Open a new cache and add these resources into cache
   */
  const addCaches = caches
    .open(CACHENAME)
    .then(cache => cache.addAll(resources));

  /**
   * event.waitUntil takes in a promise and waits for that promise to resolve
   */
  event.waitUntil(addCaches);

});

/**
 * Activate Event
 *
 * Once this fires, you're good to go.
 * i.e. the service worker can control pages
 */
self.addEventListener('activate', function(event) {

  /**
   * Remove stale caches
   * As usual, the cache API returns a promise
   */
  const removeCaches = caches.keys().then(keyList => {
    return Promise.all(
      keyList.map(key => {
        if (key !== CACHENAME) return caches.delete(key);
      })
    );
  });

  /**
   * And wait until all the other/old caches are removed
   */
  event.waitUntil(removeCaches);

});

/**
 * Fetch event
 *
 * This is triggered whenever the Document requests for a fetch
 */
self.addEventListener('fetch', function(event) {

  /**
   * Try to hit the network first and then when it fails
   * get from the cache
   */
  const response = fetch(event.request.clone())
    .then(fetchResponse =>
      /**
       * Once you have a response, you need to update the cache
       */
      caches.open(CACHENAME).then(cache => {
        // we don't care about whether this succeeds
        cache.put(event.request, fetchResponse.clone());

        // we worry about the actual response
        // so we simply resolve to this
        return fetchResponse;
      })
    )
    .catch(() =>
      /**
       * On Error, read from cache
       */
      caches.open(CACHENAME)
        .then(cache => cache.match(event.request))
    );

  /**
   * Here, we don't have a waitUntil.
   * Here, it's called respondWith and it takes in either a response
   *   or a promise resolving to a response
   *
   */
  event.respondWith(response);

});
