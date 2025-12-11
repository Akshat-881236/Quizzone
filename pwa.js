// pwa.js — register SW, handle install prompt, update popup, push subscription, offline sync queue
(function(){
  const swPath = '/Quizzone/sw.js';
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register(swPath).then(reg => {
      console.log('SW registered', reg);

      // check for updates
      if(reg.waiting){
        notifyUpdateAvailable(reg);
      }
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        newSW.addEventListener('statechange', () => {
          if(newSW.state === 'installed' && navigator.serviceWorker.controller){
            notifyUpdateAvailable(reg);
          }
        });
      });

      // listen for controlling change (when new SW takes over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('controller changed — new SW active');
      });
    }).catch(err => console.warn('SW registration failed', err));
  }

  // INSTALL PROMPT (to show custom install button)
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show your "Install App" button e.g. an element with id="installBtn"
    const installBtn = document.getElementById('installBtn');
    if(installBtn){
      installBtn.style.display = 'inline-block';
      installBtn.addEventListener('click', async () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        console.log('User choice', choice);
        deferredPrompt = null;
      });
    }
  });

  // Update UI: Notify user that a new update is available and allow reload
  function notifyUpdateAvailable(reg){
    // create a simple popup (you can style as you want)
    const root = document.body;
    const el = document.createElement('div');
    el.style.position='fixed';
    el.style.right='16px';
    el.style.bottom='16px';
    el.style.background='#007bff';
    el.style.color='white';
    el.style.padding='12px 16px';
    el.style.borderRadius='10px';
    el.style.boxShadow='0 6px 24px rgba(0,0,0,0.2)';
    el.innerHTML = 'Update available <button id="swRefresh" style="margin-left:12px;padding:6px 8px;border-radius:6px;border:none;cursor:pointer">Refresh</button>';
    root.appendChild(el);

    document.getElementById('swRefresh').addEventListener('click', () => {
      if (reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        // after skipWaiting the page should refresh to use the new SW
        window.location.reload();
      }
    });
  }

  // PUSH SUBSCRIPTION (client-side) — requires server VAPID public key
  async function subscribeToPush(vapidPublicKeyBase64){
    if (!('serviceWorker' in navigator)) throw new Error('No SW');
    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    if (existing) return existing;
    const convertedKey = urlBase64ToUint8Array(vapidPublicKeyBase64);
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey
    });
    // POST subscription to your server for later pushes
    // fetch('/your/push/subscribe', { method:'POST', body: JSON.stringify(subscription) })
    return subscription;
  }

  // helper convert
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  }

  // OFFLINE ATTEMPTS QUEUE (localStorage fallback)
  // usage: pushOfflineAttempt({type:'quizAttempt', endpoint:'/api/attempt', payload: {...}})
  function pushOfflineAttempt(record){
    let q = JSON.parse(localStorage.getItem('QuizzoneOfflineQueue') || '[]');
    record._ts = new Date().toISOString();
    q.push(record);
    localStorage.setItem('QuizzoneOfflineQueue', JSON.stringify(q));
    // try to register background sync
    if('serviceWorker' in navigator && 'SyncManager' in window){
      navigator.serviceWorker.ready.then(reg => reg.sync.register('sync-offline-attempts'));
    } else {
      // attempt immediate flush when online
      attemptFlushQueue();
    }
  }

  async function attemptFlushQueue(){
    if(!navigator.onLine) return;
    let q = JSON.parse(localStorage.getItem('QuizzoneOfflineQueue') || '[]');
    if(!q.length) return;
    // try to send all items sequentially (you must adapt endpoint and server)
    const successes = [];
    for(const item of q){
      try {
        // example: POST to item.endpoint with item.payload
        // IMPORTANT: change /api/submitAttempt to your server endpoint
        const res = await fetch(item.endpoint || '/api/submitAttempt', {
          method:'POST',
          headers:{ 'Content-Type':'application/json' },
          body: JSON.stringify(item.payload || item)
        });
        if(res.ok) successes.push(item);
      } catch(e){ console.warn('Flush attempt failed', e); break; }
    }
    // remove successes
    q = q.filter(i => !successes.includes(i));
    localStorage.setItem('QuizzoneOfflineQueue', JSON.stringify(q));
  }

  // Listen for network reconnect
  window.addEventListener('online', attemptFlushQueue);

  // SW message handler (for flush flow)
  if('serviceWorker' in navigator){
    navigator.serviceWorker.addEventListener('message', evt => {
      if(evt.data && evt.data.type === 'REQUEST_OFFLINE_ATTEMPTS'){
        // SW asked for queued attempts — we can post them to SW via postMessage (or send directly to server)
        const q = JSON.parse(localStorage.getItem('QuizzoneOfflineQueue') || '[]');
        // For security and size reasons, send only first N items
        navigator.serviceWorker.ready.then(reg => {
          reg.active.postMessage({ type: 'OFFLINE_ATTEMPTS', attempts: q.slice(0, 40) });
        });
      }
    });
  }

  /* -------------------------------
   SHOW OWNER PDF ONCE AFTER INSTALL / UPDATE
--------------------------------*/
const PDF_SHOWN_KEY = "quizzone_owner_message_seen";

function showOwnerPDF() {
    if (!localStorage.getItem(PDF_SHOWN_KEY)) {
        window.location.href = "/Quizzone/Documentary/OwnerMessageViewer.html";
        localStorage.setItem(PDF_SHOWN_KEY, "true");
    }
}

/* Detect install event */
window.addEventListener("appinstalled", () => {
    showOwnerPDF();
});

/* Detect service worker update */
navigator.serviceWorker?.addEventListener("controllerchange", () => {
    showOwnerPDF();
});

/* Optional: Trigger on first dashboard visit */
if (location.pathname.includes("Dashboard.html")) {
    setTimeout(showOwnerPDF, 1500);
}

  // Expose functions to window for usage
  window.QuizzonePWA = {
    subscribeToPush,
    pushOfflineAttempt,
    attemptFlushQueue
  };
})();