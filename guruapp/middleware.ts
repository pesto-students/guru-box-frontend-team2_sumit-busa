import { NextResponse } from 'next/server';

import type { NextFetchEvent, NextRequest } from 'next/server';

// Checks for JWT from Strapi and fetches it if it's not available.
// JWT is needed to make many of Strapi's API requests.
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const existingJwt = req.cookies.get('jwt');
  if (existingJwt) {
    return NextResponse.next();
  }

  try {
    const rawAuthResponse = await fetch(
      'https://penn-pal-backend.herokuapp.com/api/auth/local',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: process.env.USERNAME,
          password: process.env.PASSWORD,
        }),
      }
    );
    const { jwt } = await rawAuthResponse.json();
    const response = NextResponse.next();
    response.cookies.set('jwt', jwt, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL('/oops', req.url));
  }
}

export const config = {
  // List of routes where the middleware runs. Needs to be updated as new authenticated routes get added.
  matcher: ['/', '/event/:path*', '/mentorintake/:path*'],
};