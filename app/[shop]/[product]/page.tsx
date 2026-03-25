"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { shopProduct, checkout } from "@/lib/api";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  currency: string;
  glowup_image_url: string | null;
  original_image_url: string;
  stock: number | null;
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.shop as string;
  const productId = Number(params.product);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });

  useEffect(() => {
    shopProduct(slug, productId)
      .then(setProduct)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, productId]);

  const handleBuy = async () => {
    if (!product?.price) return;
    setBuying(true);
    try {
      const result = await checkout(slug, {
        product_id: product.id,
        name: form.name || "Customer",
        phone: form.phone,
        email: form.email || "buyer@postshop.com",
        address: form.address,
        quantity: 1,
      });
      window.location.href = result.authorization_url;
    } catch {
      alert("Checkout failed. Please try again.");
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ps-warm-white dark:bg-ps-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-ps-warm-white dark:bg-ps-dark flex items-center justify-center text-center">
        <div>
          <div className="text-5xl mb-3">🔍</div>
          <h1 className="font-heading text-xl font-bold text-[#1A1A1F] dark:text-white">Product not found</h1>
          <a href={`/${slug}`} className="text-ps-orange font-semibold mt-4 inline-block hover:underline">Back to shop</a>
        </div>
      </div>
    );
  }

  const soldOut = product.stock === 0;
  const lowStock = product.stock !== null && product.stock > 0 && product.stock <= 10;

  return (
    <div className="min-h-screen bg-ps-warm-white dark:bg-ps-dark">
      {/* Sticky back bar */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-ps-dark-card/80 backdrop-blur-xl border-b border-ps-warm-border dark:border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <a href={`/${slug}`} className="flex items-center gap-2 text-sm text-[#6B6B76] hover:text-ps-orange transition font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to shop
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="animate-fade-up">
            <div className="aspect-square rounded-3xl overflow-hidden bg-ps-warm-muted dark:bg-ps-dark-card shadow-warm-lg relative">
              <img
                src={product.glowup_image_url || product.original_image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {soldOut && (
                <div className="absolute inset-0 bg-ps-dark/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-white/10 backdrop-blur-md text-white font-bold px-6 py-3 rounded-full border border-white/20">
                    Sold Out
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="animate-fade-up delay-1 flex flex-col">
            <div className="flex-1">
              {lowStock && (
                <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                  Only {product.stock} left in stock
                </span>
              )}

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1A1A1F] dark:text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {product.description && (
                <p className="text-[#6B6B76] dark:text-white/50 mt-4 leading-relaxed text-base">
                  {product.description}
                </p>
              )}

              {product.price ? (
                <div className="font-heading text-4xl font-extrabold text-[#1A1A1F] dark:text-white mt-6">
                  {product.currency} {(product.price / 100).toFixed(2)}
                </div>
              ) : (
                <p className="text-[#6B6B76] mt-6 text-lg">Contact seller for price</p>
              )}
            </div>

            {/* Checkout form */}
            {soldOut ? (
              <div className="mt-8 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 text-center">
                <span className="text-red-600 dark:text-red-400 font-bold text-lg">Sold Out</span>
                <p className="text-red-500/70 text-sm mt-1">Check back later or contact the seller.</p>
              </div>
            ) : product.price ? (
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="col-span-2 h-12 px-4 rounded-xl bg-white dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/50 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition"
                  />
                  <input
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-12 px-4 rounded-xl bg-white dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/50 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition"
                  />
                  <input
                    placeholder="Email (optional)"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-12 px-4 rounded-xl bg-white dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/50 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition"
                  />
                  <input
                    placeholder="Delivery address (optional)"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="col-span-2 h-12 px-4 rounded-xl bg-white dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/50 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition"
                  />
                </div>
                <button
                  onClick={handleBuy}
                  disabled={buying}
                  className="w-full h-14 rounded-xl bg-ps-orange text-white font-bold text-lg hover:bg-ps-orange-dark transition-all glow-orange disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {buying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Redirecting to payment...
                    </>
                  ) : (
                    `Buy Now — ${product.currency} ${(product.price / 100).toFixed(2)}`
                  )}
                </button>
                <p className="text-xs text-center text-[#6B6B76] dark:text-white/30 flex items-center justify-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Secure payment via Paystack (MoMo, Card, Bank)
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
