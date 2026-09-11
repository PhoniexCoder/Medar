import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token =
    request.cookies.get('refreshToken')?.value ||
    request.cookies.get('accessToken')?.value ||
    request.headers.get('authorization');

  // Protected route patterns
  const isAppRoute = pathname.startsWith('/app');
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAppRoute || isAdminRoute) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role check for admin route
    if (isAdminRoute) {
      const isAdmin =
        token.includes('ADMIN') ||
        token.includes('SUPER_ADMIN') ||
        token.includes('demo-admin');

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
