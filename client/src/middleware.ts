import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('auth_token')?.value;

  if (!currentUser && request.nextUrl.pathname.startsWith('/account')) {
    return Response.redirect(new URL('/login', request.url));
  }

  // ? Here will come protection of location detail routes
}
