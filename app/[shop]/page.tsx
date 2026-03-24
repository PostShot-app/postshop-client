"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { shopInfo, shopProducts } from "@/lib/api";

type Shop = { shop_name: string; slug: string };
type Product = {
  id: number;
  name: string;
  price: number | null;
  currency: string;
  glowup_image_url: string | null;
  original_image_url: string;
  stock: number | null;
  is_published: boolean;
};

export default function StorefrontPage() {
  const params = useParams();
  const slug = params.shop as string;
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([shopInfo(slug), shopProducts(slug)])
      .then(([s, p]) => { setShop(s); setProducts(p); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-ps-warm-white)] dark:bg-[var(--color-ps-dark)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--color-ps-orange)] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#6B6B76]">Loading shop...</span>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-[var(--color-ps-warm-white)] dark:bg-[var(--color-ps-dark)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛍️</div>
          <h1 className="font-[var(--font-jakarta)] text-2xl font-bold text-[#1A1A1F] dark:text-white">Shop not found</h1>
          <p className="text-[#6B6B76] mt-2">This shop doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="inline-block mt-6 text-[var(--color-ps-orange)] font-semibold hover:underline">Back to PostShot</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-ps-warm-white)] dark:bg-[var(--color-ps-dark)]">
      {/* Shop Header */}
      <header className="bg-white dark:bg-[var(--color-ps-dark-card)] border-b border-[var(--color-ps-warm-border)] dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-ps-orange)] to-[var(--color-ps-gold)] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-warm">
            <span className="text-2xl font-bold text-white">{shop.shop_name.charAt(0).toUpperCase()}</span>
          </div>
          <h1 className="font-[var(--font-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1F] dark:text-white tracking-tight">{shop.shop_name}</h1>
          <p className="text-[#6B6B76] dark:text-white/40 mt-2 text-sm">
            {products.length} product{products.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p, i) => (
              <Link
                key={p.id}
                href={`/${slug}/${p.id}`}
                className="group animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--color-ps-warm-muted)] dark:bg-[var(--color-ps-dark-card)] relative shadow-warm group-hover:shadow-warm-lg transition-all duration-300">
                  <img
                    src={p.glowup_image_url || p.original_image_url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {p.stock !== null && p.stock <= 3 && p.stock > 0 && (
                    <span className="absolute top-3 right-3 bg-[var(--color-ps-orange)] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {p.stock} left
                    </span>
                  )}
                  {p.stock === 0 && (
                    <div className="absolute inset-0 bg-[var(--color-ps-dark)]/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-white/10 backdrop-blur-md text-white font-bold px-4 py-2 rounded-full text-sm border border-white/20">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3 px-0.5">
                  <h3 className="text-sm font-semibold text-[#1A1A1F] dark:text-white truncate group-hover:text-[var(--color-ps-orange)] transition-colors">{p.name}</h3>
                  {p.price ? (
                    <p className="font-[var(--font-jakarta)] text-base font-bold text-[#1A1A1F] dark:text-white mt-0.5">
                      {p.currency} {(p.price / 100).toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-xs text-[#6B6B76] mt-0.5">Price on request</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📸</div>
            <h2 className="font-[var(--font-jakarta)] text-xl font-bold text-[#1A1A1F] dark:text-white">No products yet</h2>
            <p className="text-[#6B6B76] mt-2">This seller is setting up their shop. Check back soon!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-ps-warm-border)] dark:border-white/5 py-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-[#6B6B76] hover:text-[var(--color-ps-orange)] transition">
          <Image src="/logo.png" alt="PostShot" width={16} height={16} className="rounded" />
          Powered by PostShot
        </Link>
      </footer>
    </div>
  );
}
