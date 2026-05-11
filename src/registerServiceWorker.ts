const OFFLINE_CACHE_NAME = 'portfolio-offline-v1'

export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator) || !('caches' in window)) {
    return
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => primeRuntimeCache())
      .catch(() => {
        // The app should remain usable even if the offline cache cannot register.
      })
  })
}

async function primeRuntimeCache() {
  const cache = await caches.open(OFFLINE_CACHE_NAME)
  const urls = new Set<string>([new URL('/', window.location.origin).href, window.location.href])

  document.querySelectorAll<HTMLLinkElement | HTMLScriptElement | HTMLImageElement>(
    'link[href], script[src], img[src]',
  ).forEach((element) => {
    const url = getElementUrl(element)
    if (url && new URL(url).origin === window.location.origin) {
      urls.add(url)
    }
  })

  await Promise.all(
    [...urls].map(async (url) => {
      try {
        const response = await fetch(url, { cache: 'reload' })
        if (response.ok) {
          await cache.put(url, response)
        }
      } catch {
        // A missed cache entry is non-fatal; the service worker still serves cached files.
      }
    }),
  )
}

function getElementUrl(element: HTMLLinkElement | HTMLScriptElement | HTMLImageElement) {
  if (element instanceof HTMLLinkElement) {
    return element.href
  }

  if (element instanceof HTMLScriptElement) {
    return element.src
  }

  return element.src
}
