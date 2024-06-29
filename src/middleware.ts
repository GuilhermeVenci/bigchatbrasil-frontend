import { NextRequest, NextResponse } from 'next/server';
import { UserTypes } from './types/user';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('token')?.value;
  let userRole;

  if (!token) {
    const publicPaths = ['/login', '/signup'];
    const isPublicPath = publicPaths.some((publicPath) =>
      url.pathname.startsWith(publicPath)
    );

    if (isPublicPath) {
      return NextResponse.next();
    } else {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  const publicPaths = ['/login', '/signup'];
  const adminPaths = ['/dashboard'];

  const isPublicPath =
    publicPaths.some((publicPath) => url.pathname.startsWith(publicPath)) ||
    url.pathname.startsWith('/confirm');
  const isAdminPath = adminPaths.some((adminPath) =>
    url.pathname.startsWith(adminPath)
  );

  if (!token) {
    if (isPublicPath) {
      return NextResponse.next();
    } else {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  if (isAdminPath) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const user: UserTypes = await response.json();
      userRole = user ? user.role : '';
    }

    if (userRole === 'ADMIN') {
      return NextResponse.next();
    }
    url.pathname = '/messages';
    return NextResponse.redirect(url);
  }

  if (isPublicPath) {
    url.pathname = '/messages';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
