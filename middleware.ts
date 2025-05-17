import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isProduction = process.env.NODE_ENV === 'production';

  const url = request.nextUrl.clone();

  const hasLocalhost = url.href.includes('localhost:3000');

  if (isProduction && hasLocalhost) {
    return NextResponse.redirect('https://the-ham-phi.vercel.app/main');
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
