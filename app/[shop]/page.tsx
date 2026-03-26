"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { shopInfo, shopProducts } from "@/lib/api";
import { addToCart, getCart, cartTotal } from "@/lib/cart";

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
  category: string | null;
  brand: string | null;
};

export default function StorefrontPage() {
  const params = useParams();
  const slug = params.shop as string;
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    Promise.all([shopInfo(slug), shopProducts(slug)])
      .then(([s, p]) => { setShop(s); setProducts(p); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    setCartCount(cartTotal(slug).count);
    const handler = () => setCartCount(cartTotal(slug).count);
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, [slug]);

  // Extract unique top-level categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.category) {
        const top = p.category.split(">")[0].trim();
        cats.add(top);
      }
    });
    return ["All", ...Array.from(cats).sort()];
  }, [products]);

  // Filter products
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.brand || "").toLowerCase().includes(search.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || (p.category || "").startsWith(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  const handleQuickAdd = (product: Product) => {
    if (!product.price) return;
    addToCart(slug, {
      product_id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image_url: product.glowup_image_url || product.original_image_url,
    }, qty);
    setAdded(true);
    setTimeout(() => { setAdded(false); setSelectedProduct(null); setQty(1); }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ps-dark flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-ps-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛍</div>
          <h1 className="font-heading text-2xl font-bold text-white">Shop not found</h1>
          <Link href="/" className="inline-block mt-6 text-ps-orange font-semibold hover:underline">Back to PostShop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ps-dark">
      {/* Sticky header with search + cart */}
      <header className="sticky top-0 z-50 bg-ps-dark/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-linear-to-br from-ps-orange to-ps-gold rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-white">{shop.shop_name.charAt(0).toUpperCase()}</span>
            </div>
            <span className="font-heading font-bold text-white hidden sm:block">{shop.shop_name}</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full h-9 pl-9 pr-3 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:ring-1 focus:ring-ps-orange/50 focus:border-ps-orange/50 outline-none transition"
            />
          </div>

          {/* Cart */}
          <Link href={`/${slug}/cart`} className="relative shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-50 hover:opacity-100 transition"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-5 h-5 bg-ps-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </Link>
        </div>

        {/* Category tabs */}
        {categories.length > 2 && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  activeCategory === cat
                    ? "bg-ps-orange text-white"
                    : "bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Products grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="group cursor-pointer animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => { setSelectedProduct(p); setQty(1); setAdded(false); }}
              >
                <div className="bg-ps-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-ps-orange/20 transition-all">
                  <div className="aspect-square overflow-hidden relative">
                    <img src={p.glowup_image_url || p.original_image_url} alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.price && (
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span className="font-heading text-sm font-bold text-white">
                          {p.currency} {(p.price / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                    {p.stock === 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white/60 font-bold text-xs">SOLD OUT</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-ps-orange transition-colors">
                      {p.name}
                    </h3>
                    {p.brand && <p className="text-[10px] text-white/20 mt-1">{p.brand}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            {search ? (
              <>
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-white/30">No products match &quot;{search}&quot;</p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3">📸</div>
                <h2 className="font-heading text-xl font-bold text-white">Shop is getting ready</h2>
                <p className="text-white/30 mt-2">Check back soon!</p>
              </>
            )}
          </div>
        )}
      </main>

      {/* Quick-view modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center" onClick={() => setSelectedProduct(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-ps-dark-card w-full max-w-lg rounded-t-3xl sm:rounded-3xl border border-white/10 overflow-hidden animate-fade-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="aspect-4/3 relative">
              <img src={selectedProduct.glowup_image_url || selectedProduct.original_image_url}
                alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Details */}
            <div className="p-5">
              <h2 className="font-heading text-xl font-bold text-white">{selectedProduct.name}</h2>
              {selectedProduct.brand && (
                <span className="inline-block mt-1 text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{selectedProduct.brand}</span>
              )}
              {selectedProduct.ad_copy && (
                <p className="text-white/40 text-sm mt-3 leading-relaxed">{selectedProduct.ad_copy}</p>
              )}

              {selectedProduct.price ? (
                <div className="font-heading text-3xl font-extrabold text-white mt-4">
                  {selectedProduct.currency} {(selectedProduct.price / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                </div>
              ) : null}

              {selectedProduct.price && selectedProduct.stock !== 0 ? (
                <div className="mt-5 space-y-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white/5 rounded-xl border border-white/10">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 text-white/50 hover:text-white text-lg cursor-pointer">−</button>
                      <span className="w-10 text-center font-bold text-white">{qty}</span>
                      <button onClick={() => {
                        if (selectedProduct.stock !== null && qty >= selectedProduct.stock) return;
                        setQty(qty + 1);
                      }} className={`w-10 h-10 text-lg cursor-pointer ${
                        selectedProduct.stock !== null && qty >= selectedProduct.stock ? "text-white/10" : "text-white/50 hover:text-white"
                      }`}>+</button>
                    </div>
                    <span className="text-sm text-white/20">
                      {selectedProduct.currency} {((selectedProduct.price * qty) / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  {selectedProduct.stock !== null && qty >= selectedProduct.stock && (
                    <p className="text-xs text-amber-400/80">That&apos;s all we have in stock ({selectedProduct.stock} available)</p>
                  )}

                  {/* Add to cart */}
                  <button onClick={() => handleQuickAdd(selectedProduct)}
                    className={`w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                      added ? "bg-green-500 text-white" : "bg-ps-orange text-white hover:bg-ps-orange-dark glow-orange"
                    }`}>
                    {added ? "Added!" : "Add to Cart"}
                  </button>

                  {/* Full page link */}
                  <Link href={`/${slug}/${selectedProduct.id}`}
                    className="w-full h-10 rounded-xl border border-white/10 text-white/40 text-sm font-medium flex items-center justify-center hover:text-white hover:bg-white/5 transition">
                    View Full Details
                  </Link>
                </div>
              ) : selectedProduct.stock === 0 ? (
                <div className="mt-5 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                  <span className="text-red-400 font-bold">Sold Out</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-white/5 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-xs text-white/15 hover:text-white/30 transition">
          <Image src="/logo.png" alt="PostShop" width={14} height={14} className="rounded opacity-40" />
          Powered by PostShop
        </Link>
      </footer>
    </div>
  );
}
