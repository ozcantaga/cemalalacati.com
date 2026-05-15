// server/middleware/perf-headers.ts
// Tüm statik asset response'larına agresif cache + performance header ekler
// Netlify / Vercel / Node.js prod ortamlarının tamamında çalışır

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const path = url.pathname

  // ── 1. Hash'li JS/CSS chunk'ları — 1 yıl immutable ──────────────────────
  if (path.startsWith('/_nuxt/')) {
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Vary': 'Accept-Encoding',
      'X-Content-Type-Options': 'nosniff',
    })
    return
  }

  // ── 2. IPX optimize görsel çıktıları — 30 gün cache ──────────────────────
  if (path.startsWith('/_ipx/')) {
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400',
      'Vary': 'Accept, Accept-Encoding',
      'X-Content-Type-Options': 'nosniff',
    })
    return
  }

  // ── 3. Public images/ klasörü — 30 gün cache ─────────────────────────────
  if (path.startsWith('/images/')) {
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400',
      'Vary': 'Accept-Encoding',
      'X-Content-Type-Options': 'nosniff',
    })
    return
  }

  // ── 4. Font dosyaları — 1 yıl immutable ──────────────────────────────────
  if (path.match(/\.(woff2?|ttf|otf|eot)$/)) {
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    })
    return
  }

  // ── 5. Logo, favicon, SVG — 7 gün ────────────────────────────────────────
  if (path.match(/\.(svg|ico|png)$/) || path === '/logo.svg') {
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
    })
    return
  }

  // ── 6. HTML sayfaları — CDN'de 1 saat, browser'da her seferinde doğrula ──
  if (path === '/' || path.match(/\/(rooms|gallery|guide|about|contact)(\/)?$/)) {
    setResponseHeaders(event, {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    })
    return
  }

  // ── 7. Tüm sayfalar için güvenlik başlıkları ─────────────────────────────
  setResponseHeaders(event, {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
  })
})
