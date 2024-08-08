import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('auth_token')?.value;
  console.log('CURRENT USER IN MIDDLEWARE', currentUser);

  if (!currentUser && request.nextUrl.pathname.startsWith('/account')) {
    return Response.redirect(new URL('/login', request.url));
  }

  if (!currentUser && request.nextUrl.pathname.startsWith('/locations/')) {
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/account', '/locations/:path*'],
};
