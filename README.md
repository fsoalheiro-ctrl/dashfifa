# DashFIFA

Champions Badge Dashboard da Cromotransfer x Playmaker.

Deploy em Vercel. URL de producao: dashfifa.playmaker.global

## Stack

Next.js 14 (App Router), React 18, recharts, lucide-react, html2canvas, jspdf.

## Acesso

Basic Auth via middleware. Dois usuarios configurados via env vars no Vercel:

- cromo (DASHFIFA_CROMO_PASSWORD): 6 abas operacionais
- playmaker (DASHFIFA_PLAYMAKER_PASSWORD): 6 abas + Acesso Restrito

## Estrutura

- middleware.js: Basic Auth, encaminha role via header x-dashfifa-role
- app/dashfifa/page.jsx: server component, le o role do header
- app/dashfifa/client.jsx: client wrapper com dynamic import (ssr: false)
- components/ChampionsBadgeDashboard.jsx: o dashboard completo

## Atualizacao de dados

Hoje os dados estao embarcados no ChampionsBadgeDashboard.jsx. A cada novo report de royalty, substituir o JSON dentro do componente e fazer commit (Vercel auto-deploya em ~30s).
