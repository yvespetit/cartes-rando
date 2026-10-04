// Cartes rando V19 du 2026-10-04 : cache de l'appli et des données consultées (fonds de carte non mis en cache)
const C='cartes-rando-V19';
self.addEventListener('install',e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','donnees/base.js','manifest.webmanifest','icone-192.png']))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{ const u=new URL(e.request.url); if(e.request.method!=='GET' || u.origin!==location.origin) return;
  if(e.request.mode==='navigate'){ e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(C).then(c=>c.put('index.html',cp)); return r; }).catch(()=>caches.match('index.html'))); return; }
  e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{ if(r.ok){ const cp=r.clone(); caches.open(C).then(c=>c.put(e.request,cp)); } return r; }))); });
