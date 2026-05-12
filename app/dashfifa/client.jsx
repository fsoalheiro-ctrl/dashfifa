// app/dashfifa/client.jsx
// Wrapper client component pro app router.
// NecessÃ¡rio porque o ChampionsBadgeDashboard usa useState/useEffect e recharts (precisa de window).

'use client';

import dynamic from 'next/dynamic';

const ChampionsBadgeDashboard = dynamic(
  () => import('../../components/ChampionsBadgeDashboard'),
  { ssr: false }
);

export default function DashFifaClient({ role }) {
  return <ChampionsBadgeDashboard role={role} />;
}
