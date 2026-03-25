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
  ad_copy: string | null;
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
      <div className="min-h-screen bg-ps-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-white/30">Loading shop...</span>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-ps-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛍</div>
          <h1 className="font-heading text-2xl font-bold text-white">Shop not found</h1>
          <p className="text-white/40 mt-2">This shop doesn&apos;t exist or has been removed.</p>
          <Link href="/" className="inline-block mt-6 text-ps-orange font-semibold hover:underline">Back to PostShop</Link>
        </div>
      </div>
    );
  }

  const initial = shop.shop_name.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-ps-dark">
      {/* Hero Header — dark, dramatic, like a premium brand */}
      <header className="relative overflow-hidden grain">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-ps-orange/8 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
          {/* Shop avatar */}
          <div className="w-20 h-20 bg-linear-to-br from-ps-orange to-ps-gold rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-warm-lg rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-3xl font-extrabold text-white -rotate-3 hover:rotate-0 transition-transform">{initial}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {shop.shop_name}
          </h1>
          <p className="text-white/30 mt-3 text-base">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      {/* Products */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <Link
                key={p.id}
                href={`/${slug}/${p.id}`}
                className="group animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="bg-ps-dark-card rounded-3xl overflow-hidden border border-white/5 hover:border-ps-orange/30 transition-all duration-300 shadow-warm hover:shadow-warm-lg">
                  {/* Image */}
                  <div className="aspect-4/3 overflow-hidden relative">
                    <img
                      src={p.glowup_image_url || p.original_image_url}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Gradient overlay at bottom for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ps-dark-card to-transparent" />

                    {p.stock !== null && p.stock <= 3 && p.stock > 0 && (
                      <span className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        Only {p.stock} left
                      </span>
                    )}
                    {p.stock === 0 && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white/80 font-bold text-lg tracking-wide">SOLD OUT</span>
                      </div>
                    )}

                    {/* Price tag floating on image */}
                    {p.price && (
                      <div className="absolute bottom-4 left-4">
                        <span className="font-heading text-2xl font-extrabold text-white drop-shadow-lg">
                          {p.currency} {(p.price / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-ps-orange transition-colors leading-tight">
                      {p.name}
                    </h3>
                    {p.ad_copy && (
                      <p className="text-white/30 text-sm mt-2 line-clamp-2 leading-relaxed">{p.ad_copy}</p>
                    )}

                    {/* Buy button */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-ps-orange text-sm font-semibold group-hover:underline">
                        View Details
                      </span>
                      <div className="w-10 h-10 rounded-full bg-ps-orange/10 flex items-center justify-center group-hover:bg-ps-orange/20 transition">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📸</span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">Shop is getting ready</h2>
            <p className="text-white/30 mt-3 max-w-sm mx-auto">
              {shop.shop_name} is setting up their products. Check back soon for amazing deals!
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-white/5 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-white/20 hover:text-white/40 transition">
          <Image src="/logo.png" alt="PostShop" width={14} height={14} className="rounded opacity-50" />
          Powered by PostShop
        </Link>
      </footer>
    </div>
  );
}
