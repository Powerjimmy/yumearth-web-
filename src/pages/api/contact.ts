import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export const prerender = false;

// Upstash Redis rate limiter — 5 requests per IP per 10 minutes (works across serverless instances)
let ratelimit: Ratelimit | null = null;
if (import.meta.env.UPSTASH_REDIS_REST_URL && import.meta.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: import.meta.env.UPSTASH_REDIS_REST_URL,
    token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '10 m'),
    prefix: 'contact',
  });
}

// Escape HTML entities to prevent injection in email template
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const POST: APIRoute = async ({ request }) => {
  // Block requests not originating from the site
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const allowed = ['https://yumearth.eu', 'https://yumearth-web.vercel.app'];
  const fromSite = allowed.some(a => origin?.startsWith(a) || referer?.startsWith(a));
  if (!fromSite) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Rate limiting (Upstash Redis — works across serverless instances)
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  try {
    const body = await request.json();
    const { name, email, message, company, country, website } = body;

    // Honeypot check
    if (website) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Field length limits
    if (
      typeof name !== 'string' || name.length > 100 ||
      typeof email !== 'string' || email.length > 254 ||
      typeof message !== 'string' || message.length > 5000 ||
      (company && (typeof company !== 'string' || company.length > 200))
    ) {
      console.error('[Contact 400] Invalid input lengths:', { name: typeof name, nameLen: String(name).length, email: typeof email, messageLen: String(message).length });
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      console.error('[Contact 400] Missing required fields:', { name: !!name?.trim(), email: !!email?.trim(), message: !!message?.trim() });
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('[Contact 400] Invalid email:', email);
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Country field length limit
    if (country && (typeof country !== 'string' || country.length > 100)) {
      console.error('[Contact 400] Invalid country:', country);
      return new Response(JSON.stringify({ error: 'Invalid country' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendKey = import.meta.env.RESEND_API_KEY;

    if (!resendKey) {
      // Dev mode — just log
      console.log('[Contact form]', { name, email, company, country, message });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'YumEarth Web <noreply@yumearth.eu>',
        to: ['hello@yumearth.eu'],
        reply_to: email,
        subject: `[Web] ${country || 'Nuevo mensaje'} — ${name}`,
        html: `
          <h2>Nuevo mensaje desde yumearth.eu</h2>
          <p><strong>Nombre:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          ${company ? `<p><strong>Empresa:</strong> ${esc(company)}</p>` : ''}
          ${country ? `<p><strong>País:</strong> ${esc(country)}</p>` : ''}
          <hr />
          <p>${esc(message).replace(/\n/g, '<br />')}</p>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
