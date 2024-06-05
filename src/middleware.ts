import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname === '/') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const publicPaths = ['/login', '/signup'];

  const isPublicPath =
    publicPaths.some((publicPath) => url.pathname.startsWith(publicPath)) ||
    url.pathname.startsWith('/confirm');

  if (isPublicPath) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
