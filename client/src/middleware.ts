import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the token from request
  const token = request.cookies.get('auth-token')?.value;

  console.log('MIDDLEWARE', token);
  // If theres no token available redirect user to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/locations/:path+', '/account'],
};
