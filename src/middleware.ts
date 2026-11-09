import { defineMiddleware } from 'astro:middleware';

// Block countries with no distribution and confirmed zero conversion potential
const BLOCKED_COUNTRIES = new Set(['IR']);

export const onRequest = defineMiddleware((context, next) => {
  const country = context.request.headers.get('x-vercel-ip-country') ?? '';
  if (BLOCKED_COUNTRIES.has(country)) {
    return new Response(null, { status: 403 });
  }
  return next();
});
