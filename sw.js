const CACHE_NAME = 'gas-profi-v1';
const ASSETS = [
  '',
  'index.html',
  'viessmann.html',
  'vaillant.html',
  'buderus.html',
  'broetje.html',
  'rechner.html',
  'style.css',
  'script.js',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Кэширование ресурсов...');
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  // Активация нового сервис-воркера и очистка старого кэша при обновлении
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Возвращаем ресурс из кэша, если он там есть, иначе делаем запрос в сеть
      return response || fetch(event.request).catch(() => {
        // Если сеть недоступна и ресурса нет в кэше, можно возвращать index.html как фолбек
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});