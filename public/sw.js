const CACHE_NAME = 'mi-agenda-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Mi Agenda Inteligente', body: 'Tienes un nuevo recordatorio' };
  const options = {
    body: data.body,
    icon: '/vite.svg',
    badge: '/vite.svg',
    actions: [
      { action: 'completar', title: 'Completar' },
      { action: 'recordar', title: 'Recordarme en 5 min' }
    ]
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
