import type { APIRoute } from 'astro';

export const prerender = false;

// Whitelist: only Instagram/Facebook CDN domains allowed
const ALLOWED_HOSTS = ['cdninstagram.com', 'fbcdn.net'];

function isAllowedImageUrl(raw: string): boolean {
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'https:') return false;
    return ALLOWED_HOSTS.some(h => parsed.hostname === h || parsed.hostname.endsWith('.' + h));
  } catch {
    return false;
  }
}

export const GET: APIRoute = async ({ url }) => {
  const imageUrl = url.searchParams.get('url');
  if (!imageUrl) {
    return new Response('Missing url param', { status: 400 });
  }

  if (!isAllowedImageUrl(imageUrl)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const res = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; YumEarthBot/1.0)',
      },
    });

    if (!res.ok) {
      return new Response('Failed to fetch image', { status: 502 });
    }

    const contentType = res.headers.get('content-type') ?? 'image/jpeg';
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return new Response('Error', { status: 500 });
  }
};
