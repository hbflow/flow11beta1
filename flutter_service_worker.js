'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "6a14c380eda7ed2306ce3a076452f676",
"version.json": "817628683caf8fde7d82ea31630551b1",
"index.html": "495e36ca32b3f9aeff8082aeff3255be",
"/": "495e36ca32b3f9aeff8082aeff3255be",
"main.dart.js": "cdf1d338b6e12c035115877c9548ff65",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "1a2f7c9da15aee5b054c52f9bca2dc0a",
"icons/Icon-192.png": "6cf3f80a5acd2d6df51928cd5cb1f82e",
"icons/hybriidboxloading.png": "5a7122ce6c78da08487eae847fd9543d",
"icons/hybriidboxloading2.png": "456f38e38c397385e2e345c24ffe9554",
"icons/hblow.png": "ea83bfae3bd5af03f8644381faad0973",
"icons/VarelaRound-Regular.ttf": "b6aa12f9475a4fe6861cafe6617bdf39",
"icons/Icon-512.png": "a8dcb8f4549a3d8031ff953c24c7575e",
"manifest.json": "6c95d5f5d922f7c46a82a5f670afcfb4",
"assets/AssetManifest.json": "f1f92c6505b63ad42a662d3a76c4d8ee",
"assets/NOTICES": "8b57949f4772855618a1ce430f9edc31",
"assets/FontManifest.json": "782ae634a027ab53962790f9b99c5297",
"assets/AssetManifest.bin.json": "24fa99e268a2bef11ec8b8e89db65445",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "33e315ac04cd4a32db95dee3801d7dc2",
"assets/fonts/MaterialIcons-Regular.otf": "1558b73ac34d84b0ec4d6d7bc4b27db1",
"assets/assets/minum10.png": "0a5cdd88504e8f7305165188fbe8cd6e",
"assets/assets/lightgrey.png": "802c9b1ad829d34312113d096ddf47ea",
"assets/assets/hbflowof-min.png": "bde0a141bf5abdf98ef9856664a3d013",
"assets/assets/minum.png": "68c8e6f2957b74221e803b94d170e89b",
"assets/assets/MusticaPro-SemiBold.otf": "21e3f310061167c773ee64faddcf0e85",
"assets/assets/minum3.png": "a11ead342a348a1d5681057c7c82d945",
"assets/assets/minum6.png": "cb624e1704adc83b2555e09d91181283",
"assets/assets/minum7.png": "64010242842f35502b7cdcbc2cd32932",
"assets/assets/minum5.png": "7f260ddbd004cd1ebe2d326f620fa333",
"assets/assets/minum4.png": "f31805d24d914d2193b11bb254ee1030",
"assets/assets/minum8.png": "a677911fdd810ee7f5dde6c5a34d1ca7",
"assets/assets/buttonblur.png": "436cccf412235652e27470b6c9644e41",
"assets/assets/VarelaRound-Regular.ttf": "b6aa12f9475a4fe6861cafe6617bdf39",
"assets/assets/fb64db18c630dbd6dbb41f44aabbf5f482a1292d.png": "3d3c44ebacd66c55d8c6a0b67397aa82",
"assets/assets/wild.png": "8c14084f75a3adf9b2c91e29e4fd0b80",
"assets/assets/grey.png": "522648e123cc076009147a5900652618",
"assets/assets/hilly2-min.png": "05ade9ab0dbb2e40a049937620666b09",
"assets/assets/abstract-huawei-lights-neon-hd-wallpaper-preview.png": "198a89a7cb5751090b7cf0c5dc05d0c1",
"assets/assets/gold.png": "236db0d4976025e0b22fd33d9476d3ce",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
