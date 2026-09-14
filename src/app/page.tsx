import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import {
  Benefits,
  BuiltToMove,
  Faq,
  Lifestyle,
  Newsletter,
  Reassurance,
  Testimonials,
} from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Reassurance />
      <ProductGrid />
      <BuiltToMove />
      <Benefits />
      <Lifestyle />
      <Testimonials />
      <Faq />
      <Newsletter />
    </>
  );
}
