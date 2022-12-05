self.addEventListener('install', e => {
  const cacheProm = caches.open('cache-v1')
    .then(cache => {
      cache.addAll([
        './',
        '/index.html',
        '/css/estilos.css',
        '/js/main.js',
        '/js/app.js',
        '/images/1.jpeg',
        '/images/1.png',
        '/images/2.jpeg',
        '/images/2.png',
        '/images/3.jpeg',
        '/images/3.png',
        '/images/4.png',
        '/images/5.png',
        '/images/6.png',
        '/images/beerjs.png',
        '/images/facebook.png',
        '/images/twiter.png',
        '/images/instagram.png',
        '/images/icon-192x192.png',
        '/images/icon-256x256.png',
        '/images/icon-384x384.png',
        '/images/icon-512x512.png',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
      ])
    });
  e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e => {
  //cache with network fallback
  const respuesta = caches.match(e.request)
    .then(res => {
      if (res) return res;
      //no existe el archivo
      //tengo que ir a la web
      console.log('No existe', e.request.url);
      return fetch(e.request).then(newResp => {
        caches.open('cache-v1')
          .then(cache => {
            cache.put(e.request, newResp);
          }

          )
        return newResp.clone;
      });
    });
  e.respondWith(respuesta);
  //only cache
  //e.respondWith( caches.match(e.request));
});