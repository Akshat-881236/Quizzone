const CACHE_NAME = 'quizzone-shell-v1';
const ASSETS_TO_CACHE = [
  "/Quizzone/index.htm",
  "/Quizzone/Home/SignIn.htm",
  "/Quizzone/Home/SignUp.htm",
  "/Quizzone/Home/Setting.htm",
  "/Quizzone/Home/Progress.htm",
  "/Quizzone/Home/Download.htm",
  "/Quizzone/Home/QuizzoneAI.htm",
  "/Quizzone/Global/footer.htm",
  "/Quizzone/Global/navbar.htm",
  "/Quizzone/Global/loader.js",
  "/Quizzone/Global/seoMeta.js",
  "/Quizzone/Home/Dashboard.htm",
  "/Quizzone/Disciplines/index.htm",
  "/Quizzone/Disciplines/Mathematics/Blogs/Chapter%201/Topic1.htm",
  "/Quizzone/Disciplines/Mathematics/Blogs/Chapter%201/Topic2.htm",
  "/Quizzone/Disciplines/Mathematics/Quizes/Chapter%201/Topic1.htm",
  "/Quizzone/Disciplines/Mathematics/Quizes/Chapter%201/Topic2.htm",
  "/Quizzone/CompetancyTest/index.htm",
  "/Quizzone/CompetancyTest/Test-01/Set-A.htm",
  "/Quizzone/icons/icon-192.png",
  "/Quizzone/icons/icon-512.png",
  "/Quizzone/icons/QuizzoneLogo.png",
  "/Quizzone/Documentary/OwnerMessageViewer.htm",
  "/Quizzone/Documentary/Quizzone_Owner_Message.pdf",
  "/Quizzone/Home/KnowledgeBase.js",
  "/Quizzone/Home/Command.js"
  // Add other important shell files you want cached by default
];

// install
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// activate
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

// fetch
self.addEventListener('fetch', (e) => {
  // navigation requests -> prefer network, fallback to cache, then 404 page
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(res => {
        // optional: put in cache
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('/Quizzone/404.html')))
    );
    return;
  }

  // other requests: cache-first strategy
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      // save responses for next time
      const copy = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
      return res;
    })).catch(() => {
      // fallback image for images (optional)
      if (e.request.destination === 'image') {
        return new Response('', { status: 404 });
      }
      return caches.match('/Quizzone/404.html');
    })
  );
});

// PUSH event (client receives push — server required)
self.addEventListener('push', (event) => {
  let data = { title: 'Quizzone', body: 'New notification', url: '/Quizzone/Home/index.html' };
  try { data = event.data.json(); } catch (e) {}
  const options = {
    body: data.body,
    icon: '/Quizzone/Assets/icons/icon-192.png',
    data: { url: data.url || '/Quizzone/Home/index.html' }
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/Quizzone/Home/index.html';
  event.waitUntil(clients.openWindow(url));
});

// Background Sync: flush queued attempts saved in IndexedDB/localStorage
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-offline-attempts') {
    event.waitUntil(flushOfflineAttempts());
  }
});

// helper: read queue from IndexedDB is recommended; here we try from clients via postMessage
async function flushOfflineAttempts(){
  // This service worker can't directly access localStorage; ideally attempts are stored in IndexedDB.
  // We'll try to message clients to provide queued attempts for the worker to send.
  const allClients = await clients.matchAll({ includeUncontrolled: true });
  for (const client of allClients) {
    client.postMessage({ type: 'REQUEST_OFFLINE_ATTEMPTS' });
    // clients will respond with postMessage containing attempts which the SW can send to server.
  }
}

self.addEventListener('message', event => {
  // handle messages from pages (e.g. "UPDATE_AVAILABLE")
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});