const CACHE_NAME = 'gas-profi-v2'; // <-- Поменяли на v2, чтобы телефон понял: пошли новые файлы!
const ASSETS = [
  '',
  'index.html',
  'viessmann.html',
  'vaillant.html',
  'buderus.html',
  'broetje.html',
  'rechner.html',
  'wartung.html',  // <-- Добавили новую страницу обслуживания в кэш
  'messung.html',  // <-- Добавили новую страницу измерений в кэш
  'style.css',
  'script.js',
  'manifest.json'
];

// Установка: скачиваем все файлы заново
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Gas-Profi: Кэширование новых ресурсов...');
      return cache.addAll(ASSETS);
    }).then(() => {
      // Концепция "Одной руки": заставляем SW активироваться сразу, без перезапусков браузера
      return self.skipWaiting(); 
    })
  );
});

// Активация: берем управление в свои руки и удаляем старый кэш v1
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Gas-Profi: Удаление старого кэша:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      // Котролируем все открытые вкладки приложения немедленно
      return self.clients.claim();
    })
  );
});

// Перехват запросов: сначала смотрим в кэш, если нет - берем из сети
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});