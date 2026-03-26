"use client";

import { useEffect, useState, useMemo } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function req(path: string, opts: RequestInit = {}) {
  const token = localStorage.getItem("token") || "";
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
  category: string | null;
  brand: string | null;
  created_at: string;
};

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [editing, setEditing] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    req("/api/admin/products").then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.category) cats.add(p.category.split(">")[0].trim());
    });
    return ["All", ...Array.from(cats).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.brand || "").toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || (p.category || "").startsWith(activeCategory);
      return matchSearch && matchCat;
    });
  }, [products, search, activeCategory]);

  const startEdit = (p: Product) => {
    setEditing(p.id);
    setEditPrice(p.price ? (p.price / 100).toString() : "");
    setEditStock(p.stock === null ? "" : p.stock.toString());
  };

  const saveEdit = async (p: Product) => {
    setSaving(true);
    const updates: Record<string, unknown> = {};
    const newPrice = parseFloat(editPrice);
    if (!isNaN(newPrice) && newPrice > 0) updates.price = Math.round(newPrice * 100);
    if (editStock === "") {
      updates.stock = null;
    } else {
      const s = parseInt(editStock);
      if (!isNaN(s) && s >= 0) updates.stock = s;
    }
    if (Object.keys(updates).length > 0) {
      updates.is_published = true;
      const updated = await req(`/api/admin/products/${p.id}`, { method: "PATCH", body: JSON.stringify(updates) });
      setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, ...updated } : x)));
    }
    setEditing(null);
    setSaving(false);
  };

  const togglePublish = async (p: Product) => {
    const updated = await req(`/api/admin/products/${p.id}`, {
      method: "PATCH", body: JSON.stringify({ is_published: !p.is_published }),
    });
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, ...updated } : x)));
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-white">My Products</h1>
          <p className="text-white/40 text-sm mt-1">{products.length} product{products.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
          className="w-full h-10 pl-9 pr-3 rounded-xl bg-white dark:bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40/50 focus:ring-1 focus:ring-ps-orange/50 outline-none" />
      </div>

      {/* Categories */}
      {categories.length > 2 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition ${
                activeCategory === cat ? "bg-ps-orange text-white" : "bg-white dark:bg-white/5 text-white/40 hover:bg-ps-orange/10"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">{search ? "🔍" : "📸"}</div>
          <h2 className="font-heading text-xl font-bold text-white">
            {search ? "No matches" : "No products yet"}
          </h2>
          <p className="text-white/40 mt-2">
            {search ? `Nothing matches "${search}"` : "Send a product photo to Amberlyn on Telegram!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="bg-ps-dark-card rounded-2xl border border-white/5 overflow-hidden shadow-warm">
              <div className="aspect-square bg-white/5 relative">
                <img src={p.glowup_image_url || p.original_image_url} alt={p.name} className="w-full h-full object-cover" />
                <button onClick={() => togglePublish(p)}
                  className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition ${
                    p.is_published ? "bg-green-500/90 text-white" : "bg-amber-500/90 text-white"
                  }`}>
                  {p.is_published ? "Live" : "Draft"}
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-white text-sm">{p.name}</h3>
                {p.brand && <span className="text-[10px] text-white/30">{p.brand}</span>}
                {p.category && <p className="text-[10px] text-white/40/60 dark:text-white/20 mt-0.5">{p.category}</p>}

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-white/30">
                    {p.stock === null ? "∞ Unlimited stock" : p.stock === 0 ? "⚠ Out of stock" : `📦 ${p.stock} in stock`}
                  </span>
                </div>

                {editing === p.id ? (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-[10px] text-white/40 uppercase">Price (GHS)</label>
                        <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)}
                          className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-white/40 uppercase">Stock</label>
                        <input value={editStock} onChange={(e) => setEditStock(e.target.value)} placeholder="∞"
                          className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40/40" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(p)} disabled={saving}
                        className="flex-1 h-8 bg-ps-orange text-white text-xs font-semibold rounded-lg hover:bg-ps-orange-dark transition disabled:opacity-50">
                        {saving ? "..." : "Save"}
                      </button>
                      <button onClick={() => setEditing(null)}
                        className="h-8 px-3 text-xs text-white/40 border border-white/10 rounded-lg hover:bg-ps-warm-muted dark:hover:bg-white/5 transition">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-heading font-bold text-white">
                      {p.price ? `${p.currency} ${(p.price / 100).toFixed(2)}` : "No price"}
                    </span>
                    <button onClick={() => startEdit(p)}
                      className="text-xs text-ps-orange font-semibold hover:underline cursor-pointer">
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
