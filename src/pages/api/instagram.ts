import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const token = import.meta.env.META_ACCESS_TOKEN;
    const accountId = import.meta.env.INSTAGRAM_ACCOUNT_ID;

    if (!token || !accountId) {
      return new Response(JSON.stringify({ error: true, reason: 'Missing credentials' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(`https://graph.facebook.com/v19.0/${accountId}/media`);
    url.searchParams.set('fields', 'id,media_type,media_url,thumbnail_url,permalink,timestamp');
    url.searchParams.set('limit', '9');
    url.searchParams.set('access_token', token);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (!res.ok || data.error) {
      console.error('[instagram api]', data.error ?? res.status);
      return new Response(JSON.stringify({ error: true }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // 5min cache
      },
    });
  } catch (err) {
    console.error('[instagram api] exception:', err);
    return new Response(JSON.stringify({ error: true }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
