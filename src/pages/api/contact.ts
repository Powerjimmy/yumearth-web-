import type { APIRoute } from 'astro';

export const prerender = false;


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
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Country field length limit
    if (country && (typeof country !== 'string' || country.length > 100)) {
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
