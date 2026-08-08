/* Palestra — service worker.
   Pagina: prima la rete (così un aggiornamento si vede al primo avvio), con la copia
   in cache come rete di sicurezza se sei offline o il segnale è pessimo.
   Icone e manifest: prima la cache, aggiornata in silenzio quando c'è rete. */
var V = "palestra-v4-1";
var FILES = ["./", "./index.html", "./manifest.webmanifest",
             "./icon-180.png", "./icon-192.png", "./icon-512.png"];
var TIMEOUT = 3000;

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(FILES); }).catch(function () {}));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== V; })
                             .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function dallaCache(req) {
  return caches.match(req).then(function (hit) {
    return hit || caches.match("./index.html") || caches.match("./");
  });
}

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  var pagina = e.request.mode === "navigate" ||
               (e.request.headers.get("accept") || "").indexOf("text/html") >= 0;

  if (pagina) {
    e.respondWith(new Promise(function (resolve) {
      var fatto = false;
      var chiudi = function (r) { if (!fatto) { fatto = true; resolve(r); } };
      setTimeout(function () { if (!fatto) dallaCache(e.request).then(chiudi); }, TIMEOUT);
      fetch(e.request).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(V).then(function (c) { c.put(e.request, copy); });
        }
        chiudi(res);
      }).catch(function () { dallaCache(e.request).then(chiudi); });
    }));
    return;
  }

  e.respondWith(caches.match(e.request).then(function (hit) {
    var net = fetch(e.request).then(function (res) {
      if (res && res.status === 200 && res.type === "basic") {
        var copy = res.clone();
        caches.open(V).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () { return hit; });
    return hit || net;
  }));
});
