import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { ProductDetail } from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/produits/${product.slug}` },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: `${site.url}/produits/${product.slug}`,
      title: `${product.name} | Alo`,
      description: product.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Alo`,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Les 4 essentiels",
            item: `${site.url}/#essentiels`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: `${site.url}/produits/${product.slug}`,
          },
        ],
      },
      {
        "@type": "Product",
        name: product.name,
        description: product.description,
        sku: product.id,
        brand: { "@type": "Brand", name: site.name },
        color: product.variants.map((v) => v.name).join(", "),
        offers: {
          "@type": "Offer",
          url: `${site.url}/produits/${product.slug}`,
          price: product.price,
          priceCurrency: "MAD",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      },
    ],
  };

  return (
    <div className="scene-ivory">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav
        aria-label="Fil d’Ariane"
        className="mx-auto max-w-6xl px-4 pt-8 text-[12px] text-charcoal-soft sm:px-6 lg:px-8"
      >
        <Link href="/" className="transition hover:text-bordeaux">
          Accueil
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href="/#essentiels" className="transition hover:text-bordeaux">
          Les 4 essentiels
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-charcoal">{product.name}</span>
      </nav>
      <ProductDetail product={product} />
    </div>
  );
}
