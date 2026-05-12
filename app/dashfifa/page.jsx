// app/dashfifa/page.jsx
// VersÃ£o App Router (server component). Use este se seu site Playmaker usa app/.
// Apaga o /pages/dashfifa.jsx se for usar este.

import { headers } from 'next/headers';
import DashFifaClient from './client';

export const dynamic = 'force-dynamic';

export default function DashFifaPage() {
  const role = headers().get('x-dashfifa-role') || null;
  return <DashFifaClient role={role} />;
}
