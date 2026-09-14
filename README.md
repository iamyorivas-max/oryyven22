# Alo — accessoires yoga & Pilates au Maroc

Site e-commerce vitrine construit avec Next.js 15 (App Router), React 19, TypeScript et
Tailwind CSS v4. Direction artistique 3D sculptée en CSS/SVG, panier persistant, SEO et
tracking publicitaire prêts à brancher.

## Installation

```bash
npm install
cp .env.example .env.local   # puis renseigner les variables
```

## Lancement

```bash
npm run dev     # développement — http://localhost:3000
npm run build   # build de production
npm start       # serveur de production
```

## Structure

```
src/
  app/              routes (accueil, produits, aide, pages légales), sitemap, robots
  components/       header, héros, cartes produit, panier, sections, tracking
  data/             produits, avis, FAQ, configuration du site  ← à personnaliser
  lib/analytics.ts  couche de tracking unifiée (GA4 / GTM / Meta / TikTok / Clarity)
public/images/      visuels HD (voir public/images/README.md)
```

## À personnaliser

- `src/data/site.ts` — URL, numéro WhatsApp, seuil de livraison gratuite, réseaux sociaux.
- `src/data/products.ts` — catalogue, prix, variantes, visuels.
- `src/data/reviews.ts` — avis clients (exemples de démonstration à remplacer par de vrais avis
  vérifiés avant la mise en production).
- `src/data/faq.ts` — FAQ, avantages, réassurance.
- Pages légales (`/mentions-legales`, `/conditions-generales`,
  `/politique-de-confidentialite`) — modèles à faire valider juridiquement.
