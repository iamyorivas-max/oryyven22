import { products } from "@/data/products";
import { reviews, reviewSummary } from "@/data/reviews";
import { faq } from "@/data/faq";
import { site } from "@/data/site";

/** Données structurées : Organization, BreadcrumbList, Product, FAQPage. */
export function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      url: site.url,
      areaServed: "MA",
      sameAs: [site.social.instagram, site.social.tiktok],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${site.whatsapp}`,
        availableLanguage: ["fr", "ar"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "fr-MA",
      publisher: { "@id": `${site.url}/#organization` },
    },
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
      ],
    },
    ...products.map((product) => ({
      "@type": "Product",
      "@id": `${site.url}/produits/${product.slug}#product`,
      name: product.name,
      description: product.description,
      sku: product.id,
      brand: { "@type": "Brand", name: site.name },
      category: product.category,
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
    })),
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  // Avis clients (démonstration — à remplacer par de vrais avis vérifiés)
  if (reviews.length > 0) {
    graph.push({
      "@type": "AggregateRating",
      itemReviewed: { "@type": "Organization", name: site.legalName },
      ratingValue: reviewSummary.average,
      reviewCount: reviewSummary.total,
    } as unknown as (typeof graph)[number]);
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
