"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { shopProduct } from "@/lib/api";
import { addToCart, getCart } from "@/lib/cart";

type Product = {
  id: number;
  name: string;
  description: string | null;
  ad_copy: string | null;
  price: number | null;
  currency: string;
  glowup_image_url: string | null;
  original_image_url: string;
  stock: number | null;
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.shop as string;
  const productId = Number(params.product);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    shopProduct(slug, productId)
      .then(setProduct)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, productId]);

  const handleAddToCart = () => {
    if (!product?.price) return;
    addToCart(slug, {
      product_id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image_url: product.glowup_image_url || product.original_image_url,
    }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ps-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-ps-dark flex items-center justify-center text-center">
        <div>
          <div className="text-5xl mb-3">🔍</div>
          <h1 className="font-heading text-xl font-bold text-white">Product not found</h1>
          <Link href={`/${slug}`} className="text-ps-orange font-semibold mt-4 inline-block hover:underline">Back to shop</Link>
        </div>
      </div>
    );
  }

  const soldOut = product.stock === 0;
  const lowStock = product.stock !== null && product.stock > 0 && product.stock <= 10;
  const maxQty = product.stock !== null ? product.stock : 99;
  const cartCount = getCart(slug).reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-ps-dark">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-ps-dark-card/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={`/${slug}`} className="flex items-center gap-2 text-sm text-white/40 hover:text-ps-orange transition font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to shop
          </Link>
          <Link href={`/${slug}/cart`} className="relative flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-5 h-5 bg-ps-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="animate-fade-up">
            <div className="aspect-square rounded-3xl overflow-hidden bg-ps-dark-card relative">
              <img
                src={product.glowup_image_url || product.original_image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {soldOut && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white/80 font-bold text-lg">SOLD OUT</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="animate-fade-up delay-1 flex flex-col">
            <div className="flex-1">
              {lowStock && (
                <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                  Only {product.stock} left in stock
                </span>
              )}

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {product.description && (
                <p className="text-white/40 mt-4 leading-relaxed">{product.description}</p>
              )}

              {product.ad_copy && !product.description && (
                <p className="text-white/40 mt-4 leading-relaxed">{product.ad_copy}</p>
              )}

              {product.price ? (
                <div className="font-heading text-4xl font-extrabold text-white mt-6">
                  {product.currency} {(product.price / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                </div>
              ) : (
                <p className="text-white/30 mt-6 text-lg">Contact seller for price</p>
              )}
            </div>

            {/* Add to cart */}
            {soldOut ? (
              <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                <span className="text-red-400 font-bold text-lg">Sold Out</span>
                <p className="text-red-400/50 text-sm mt-1">Check back later or contact the seller.</p>
              </div>
            ) : product.price ? (
              <div className="mt-8 space-y-4">
                {/* Quantity selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/40">Quantity</span>
                  <div className="flex items-center bg-white/5 rounded-xl border border-white/10">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition text-lg"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-heading font-bold text-white">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(maxQty, qty + 1))}
                      className="w-11 h-11 flex items-center justify-center text-white/50 hover:text-white transition text-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-white/20">
                    {product.currency} {((product.price * qty) / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Buttons */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    added
                      ? "bg-green-500 text-white"
                      : "bg-ps-orange text-white hover:bg-ps-orange-dark glow-orange"
                  }`}
                >
                  {added ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                      Add to Cart
                    </>
                  )}
                </button>

                <Link
                  href={`/${slug}/cart`}
                  className="w-full h-12 rounded-xl border border-white/10 text-white/60 font-medium flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition"
                >
                  View Cart ({cartCount} item{cartCount !== 1 ? "s" : ""})
                </Link>

                <p className="text-xs text-center text-white/20 flex items-center justify-center gap-1.5">
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
