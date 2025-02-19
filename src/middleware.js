import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    console.log("test")
  }

  return NextResponse.next();

}

export const config = {
  matcher: [
    '/', // Protect the home page
    '/dashboard/:path*', // Protect the dashboard and all subpaths
  ],
};

export const runtime = 'nodejs';
