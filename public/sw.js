const CACHE_NAME = 'portfolio-offline-v1'
const APP_SHELL = ['/', '/favicon.svg', '/icons.svg', '/og-image.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(fetchThenCache(request, '/'))
    return
  }

  event.respondWith(fetchThenCache(request))
})

async function fetchThenCache(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    if (fallbackUrl) {
      const fallbackResponse = await cache.match(fallbackUrl)
      if (fallbackResponse) {
        return fallbackResponse
      }
    }

    return new Response('Offline', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
