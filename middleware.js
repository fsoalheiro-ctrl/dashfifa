// middleware.js
// Basic Auth para /dashfifa com dois usuÃ¡rios (cromo e playmaker)
// O role Ã© encaminhado via header x-dashfifa-role para a pÃ¡gina renderizar condicionalmente.
//
// VariÃ¡veis de ambiente esperadas (configurar no Vercel):
//   DASHFIFA_CROMO_PASSWORD     senha do usuÃ¡rio cromo
//   DASHFIFA_PLAYMAKER_PASSWORD senha do usuÃ¡rio playmaker (admin)
//
// Se vocÃª jÃ¡ tem um middleware.js no repo, MERGE esta lÃ³gica com o seu existente:
// adicione a verificaÃ§Ã£o do path /dashfifa antes da sua lÃ³gica atual.

import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/dashfifa/:path*', '/dashfifa'],
};

export function middleware(request) {
  const auth = request.headers.get('authorization');

  const askForAuth = () =>
    new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="DashFIFA"' },
    });

  if (!auth || !auth.startsWith('Basic ')) {
    return askForAuth();
  }

  let decoded;
  try {
    decoded = atob(auth.slice(6));
  } catch (e) {
    return askForAuth();
  }

  const sepIdx = decoded.indexOf(':');
  if (sepIdx === -1) return askForAuth();

  const user = decoded.slice(0, sepIdx);
  const pass = decoded.slice(sepIdx + 1);

  const cromoPass = process.env.DASHFIFA_CROMO_PASSWORD;
  const playmakerPass = process.env.DASHFIFA_PLAYMAKER_PASSWORD;

  let role = null;
  if (user === 'cromo' && pass && pass === cromoPass) {
    role = 'cromo';
  } else if (user === 'playmaker' && pass && pass === playmakerPass) {
    role = 'playmaker';
  }

  if (!role) {
    return askForAuth();
  }

  // Encaminha o role para a pÃ¡gina via request header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-dashfifa-role', role);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
