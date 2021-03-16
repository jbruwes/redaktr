// This is the "Offline copy of assets" service worker

const CACHE = "pwabuilder-offline";

importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/6.1.1/workbox-sw.min.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.NetworkFirst({
    cacheName: CACHE
  })
);