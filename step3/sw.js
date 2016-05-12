importScripts('bower_components/sw-toolbox/sw-toolbox.js');

const VERSION = 1;

toolbox.cache.name = "zalando-pwd-demo-" + VERSION;

toolbox.precache([
  '/',
  '/static/main.js',
  '/static/styles.css'
]);

toolbox.router.get('/static/*', toolbox.fastest);
toolbox.router.get('/*', toolbox.networkFirst);
