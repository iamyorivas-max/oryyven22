# Visuels du site

Ce dossier accueille les visuels HD. Tant qu’un fichier n’est pas fourni, le site affiche un
rendu 3D sculpté en CSS/SVG dans les couleurs réelles du produit — aucune image générique n’est
utilisée.

## Brancher un visuel produit

Dans `src/data/products.ts`, ajoutez la clé `image` au produit :

```ts
{
  id: "alo-tote-bag",
  image: "/images/alo-tote-bag.webp", // remplace automatiquement le rendu CSS
  alt: "Sac Alo Tote Bag noir en toile structurée",
  ...
}
```

Le composant `ProductArt` bascule alors sur `next/image` (`object-contain`, cadrage centré ou
`align="bottom"` pour poser le produit sur son podium). Aucun autre fichier n’est à modifier.

## Fichiers attendus

| Fichier | Emplacement d’usage | Statut |
| --- | --- | --- |
| `alo-tote-bag.webp` | héros, cartes, section 3D, lifestyle | rendu CSS provisoire |
| `alo-yoga-headband.webp` | héros, cartes, section 3D | rendu CSS provisoire |
| `alo-visor.webp` | héros, cartes, section 3D, lifestyle | rendu CSS provisoire |
| `alo-grip-socks.webp` | héros, cartes, section 3D | rendu CSS provisoire |
| `lifestyle-studio-ville.webp` | section « Du studio à la ville » | silhouette CSS provisoire |
| `logo.svg` | header et footer | logotype dessiné en SVG (`src/components/Logo.tsx`) |
| `og-image.jpg` | Open Graph / Twitter Cards (1200×630) | manquant |

## Recommandations

- Format WebP ou AVIF, fond transparent pour les produits détourés.
- 1600 px de côté minimum pour les packshots, 2000 px de large pour le visuel lifestyle.
- Conserver les couleurs réelles : sac noir, bandeau crème, visière bordeaux, chaussettes blanches
  à picots noirs.
