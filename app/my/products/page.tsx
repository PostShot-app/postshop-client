"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function req(path: string, opts: RequestInit = {}) {
  const token = localStorage.getItem("seller_token") || "";
  return fetch(`${API}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...opts.headers },
  }).then((r) => r.json());
}

type Product = {
  id: number;
  name: string;
  price: number | null;
  currency: string;
  stock: number | null;
  is_published: boolean;
  glowup_image_url: string | null;
  original_image_url: string;
  ad_copy: string | null;
  created_at: string;
};

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    req("/api/admin/products").then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-[#1A1A1F] dark:text-white">My Products</h1>
        <p className="text-[#6B6B76] dark:text-white/40 text-sm mt-1">{products.length} product{products.length !== 1 ? "s" : ""} in your catalog</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📸</div>
          <h2 className="font-heading text-xl font-bold text-[#1A1A1F] dark:text-white">No products yet</h2>
          <p className="text-[#6B6B76] mt-2">Send a product photo to Amberlyn on Telegram to create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 overflow-hidden shadow-warm">
              <div className="aspect-square bg-ps-warm-muted dark:bg-white/5">
                <img src={p.glowup_image_url || p.original_image_url} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-[#1A1A1F] dark:text-white text-sm">{p.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.is_published ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                  }`}>
                    {p.is_published ? "Live" : "Draft"}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-heading font-bold text-[#1A1A1F] dark:text-white">
                    {p.price ? `${p.currency} ${(p.price / 100).toFixed(2)}` : "No price"}
                  </span>
                  <span className="text-xs text-[#6B6B76]">
                    {p.stock === null ? "Unlimited" : `${p.stock} left`}
                  </span>
                </div>
                {p.ad_copy && (
                  <p className="text-xs text-[#6B6B76] dark:text-white/30 mt-2 line-clamp-2">{p.ad_copy}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
