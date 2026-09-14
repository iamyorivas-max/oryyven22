import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { Analytics, GtmNoScript } from "@/components/Analytics";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBuyBar, WhatsappButton } from "@/components/FloatingActions";

const title = "Accessoires Yoga & Pilates au Maroc | Alo";
const description =
  "Découvrez nos accessoires de yoga et Pilates : sac, bandeau, visière et chaussettes antidérapantes. Livraison gratuite au Maroc et paiement à la livraison.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Alo" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F1E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <GtmNoScript />
        <a href="#contenu" className="skip-link">
          Aller au contenu principal
        </a>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsappButton />
          <MobileBuyBar />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
