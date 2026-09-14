"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { nav } from "@/data/site";
import { useCart } from "@/components/CartProvider";
import { trackSearch } from "@/lib/analytics";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const searchId = useId();
  const { count, openCart, hydrated } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = term.trim();
    if (!value) return;
    trackSearch(value);
    setSearchOpen(false);
    document.getElementById("essentiels")?.scrollIntoView({ behavior: "smooth" });
  };

  const iconButton =
    "grid h-10 w-10 place-items-center rounded-full text-charcoal transition hover:bg-blush-soft/70";

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled
          ? "bg-ivory/90 shadow-[0_10px_30px_-24px_rgba(28,26,25,0.6)] backdrop-blur-md"
          : "bg-ivory/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className={`${iconButton} md:hidden`}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-[0.3em] text-charcoal"
          aria-label="Alo — accueil"
        >
          ALO
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[13px] font-medium tracking-[0.12em] text-charcoal-soft uppercase transition hover:text-bordeaux"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className={iconButton}
            aria-label="Rechercher"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={19} aria-hidden="true" />
          </button>
          <Link href="/compte" className={`${iconButton} hidden sm:grid`} aria-label="Mon compte">
            <User size={19} aria-hidden="true" />
          </Link>
          <Link href="/favoris" className={`${iconButton} hidden sm:grid`} aria-label="Mes favoris">
            <Heart size={19} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className={`${iconButton} relative`}
            onClick={() => openCart("header")}
            aria-label={`Ouvrir le panier${hydrated && count > 0 ? ` (${count} article${count > 1 ? "s" : ""})` : ""}`}
          >
            <ShoppingBag size={19} aria-hidden="true" />
            {hydrated && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-bordeaux px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-sand/50 bg-ivory/95 backdrop-blur-md animate-fade-in">
          <form
            onSubmit={submitSearch}
            role="search"
            className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8"
          >
            <label htmlFor={searchId} className="sr-only">
              Rechercher un accessoire
            </label>
            <input
              id={searchId}
              type="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Rechercher un sac, un bandeau, une visière…"
              autoFocus
              className="h-11 flex-1 rounded-full border border-sand bg-white px-4 text-sm outline-none placeholder:text-charcoal-soft/60"
            />
            <button
              type="submit"
              className="h-11 rounded-full bg-charcoal px-5 text-[12px] font-semibold tracking-[0.12em] text-white uppercase"
            >
              Chercher
            </button>
          </form>
        </div>
      )}

      {/* Menu tiroir mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/40 animate-fade-in"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-ivory p-6 shadow-2xl animate-slide-in">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-xl tracking-[0.3em]">ALO</span>
              <button
                type="button"
                className={iconButton}
                aria-label="Fermer le menu"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Navigation mobile">
              <ul className="flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-4 text-base font-medium tracking-wide text-charcoal transition hover:bg-blush-soft/60"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/compte"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-4 text-base font-medium text-charcoal transition hover:bg-blush-soft/60"
                  >
                    Mon compte
                  </Link>
                </li>
                <li>
                  <Link
                    href="/favoris"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-4 text-base font-medium text-charcoal transition hover:bg-blush-soft/60"
                  >
                    Mes favoris
                  </Link>
                </li>
              </ul>
            </nav>
            <p className="mt-auto rounded-2xl bg-blush-soft/60 p-4 text-sm leading-relaxed text-charcoal-soft">
              Livraison gratuite au Maroc et paiement à la livraison sur toutes les commandes.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
