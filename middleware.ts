import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value;

  // Se não estiver autenticado e não for a rota /login → redireciona
  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se estiver autenticado ou já estiver em /login → segue normalmente
  return NextResponse.next();
}

// Definindo as rotas que o middleware irá proteger
export const config = {
  matcher: [
    '/((?!_next|favicon.ico).*)'
  ],
};
