// SCINTILLA PWA shell cache (v1) — data always live, shell cached for instant open
const C = 'scintilla-shell-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(['./index.html', './manifest.json', './icon.svg'])));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin === location.origin) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  }
});
