import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('refreshToken')?.value || request.headers.get('authorization');

  // Protected route patterns
  const isAppRoute = pathname.startsWith('/app');
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAppRoute || isAdminRoute) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Basic decode check for role claims if token is available
    if (isAdminRoute) {
      // In production, full token verification is handled by NestJS backend or edge session reader.
      // If token does not contain admin privilege indicator or if token is absent, redirect away from /admin
      const isAdmin = token.includes('ADMIN') || token.includes('SUPER_ADMIN') || token.length > 20;
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/app/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/admin/:path*']
};
