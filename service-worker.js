const CACHE_NAME = "quizzone-cache-v1";

const OFFLINE_URL = "/Quizzone/offline.htm";

const urlsToCache = [
  "/Quizzone/index.htm",
  "/Quizzone/Home/SignIn.htm",
  "/Quizzone/Home/SignUp.htm",
  "/Quizzone/Home/Setting.htm",
  "/Quizzone/Home/Progress.htm",
  "/Quizzone/Home/Dashboard.htm",
  "/Quizzone/Disciplines/index.htm",
  "/Quizzone/Disciplines/Mathematics/Blogs/Chapter%201/Topic1.htm",
  "/Quizzone/Disciplines/Mathematics/Blogs/Chapter%201/Topic2.htm",
  "/Quizzone/Disciplines/Mathematics/Quizes/Chapter%201/Topic1.htm",
  "/Quizzone/Disciplines/Mathematics/Quizes/Chapter%201/Topic2.htm",
  "/Quizzone/CompetancyTest/index.htm",
  "/Quizzone/CompetancyTest/Test-01/Set-A.htm",
  "/Quizzone/icons/icon-192.png",
  "/Quizzone/icons/icon-512.png"
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
  ));
  self.clients.claim();
});

// FETCH (Offline fallback)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)
      .then((res) => res || caches.match(OFFLINE_URL)))
  );
});