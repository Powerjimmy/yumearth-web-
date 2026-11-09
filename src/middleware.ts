import { defineMiddleware } from 'astro:middleware';

// Block countries that generate bot-like traffic but cannot purchase
// (sanctions, no distribution, confirmed zero conversion history)
const BLOCKED_COUNTRIES = new Set(['IR', 'KZ', 'KG', 'UZ']);

export const onRequest = defineMiddleware((context, next) => {
  const country = context.request.headers.get('x-vercel-ip-country') ?? '';
  if (BLOCKED_COUNTRIES.has(country)) {
    return new Response(null, { status: 403 });
  }
  return next();
});
