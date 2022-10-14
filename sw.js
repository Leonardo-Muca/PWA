const STATIC_CACHE = "static-v1";

const APP_SHELL = [
  "/",
  "index.html",
  "css/styles.css",
  "js/main.js",
  "images/beerjs-logo.png",
  "images/1.png",
  "images/2.png",
  "images/3.png",
  "images/facebook.png",
  "images/twiter.png",
  "images/instagram.png",
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
  console.log("fetch! ", e.request);
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res || fetch(e.request);
      })
      .catch(console.log)
  );
  //   e.waitUntil(response);
});
