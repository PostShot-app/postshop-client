"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { platformSellers, verifySeller, unverifySeller, toggleSellerActive } from "@/lib/api";

type Seller = {
  id: number;
  phone: string;
  shop_name: string;
  shop_slug: string;
  credits_balance: number;
  is_verified: boolean;
  verification_tier: string | null;
  total_revenue: number;
  total_orders: number;
  is_active: boolean;
  created_at: string;
};

function fmt(amount: number) {
  return `GHS ${(amount / 100).toFixed(2)}`;
}

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [filter, setFilter] = useState<"all" | "verified" | "unverified">("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    const params = filter === "verified" ? "verified=true" : filter === "unverified" ? "verified=false" : "";
    platformSellers(params + "&limit=100")
      .then(setSellers)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const filtered = sellers.filter(
    (s) => s.shop_name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search)
  );

  const handleVerify = async (id: number) => { await verifySeller(id, "gold"); load(); };
  const handleUnverify = async (id: number) => { await unverifySeller(id); load(); };
  const handleToggleActive = async (id: number) => { await toggleSellerActive(id); load(); };

  const filters = ["all", "verified", "unverified"] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold text-white tracking-tight">Sellers</h1>
        <p className="text-white/40 mt-1">Manage and verify seller accounts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-ps-dark-card dark:bg-ps-dark-card border border-white/10 text-sm text-white placeholder:text-white/40/50 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition"
          />
        </div>
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                filter === f
                  ? "bg-ps-dark-card dark:bg-ps-dark-card text-white shadow-sm"
                  : "text-white/40 hover:text-white dark:hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sellers Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <div
              key={s.id}
              className="bg-ps-dark-card dark:bg-ps-dark-card rounded-2xl border border-white/5 dark:border-white/5 p-6 shadow-warm hover:shadow-warm-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-ps-orange/20 to-ps-gold/20 rounded-xl flex items-center justify-center">
                    <span className="font-heading font-bold text-ps-orange text-sm">{s.shop_name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-white">{s.shop_name}</h3>
                      {s.is_verified && (
                        <span className="text-amber-500 text-xs" title={`${s.verification_tier} verified`}>
                          {s.verification_tier === "platinum" ? "✦" : "✓"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 dark:text-white/30 mt-0.5">{s.phone}</p>
                  </div>
                </div>
                {!s.is_active && (
                  <span className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-1 rounded-lg">Suspended</span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5 bg-white/3 rounded-xl p-3">
                <div className="text-center">
                  <div className="font-heading text-lg font-extrabold text-white">{s.total_orders}</div>
                  <div className="text-[10px] text-white/40 dark:text-white/30 font-medium uppercase tracking-wider">Orders</div>
                </div>
                <div className="text-center border-x border-white/5/50 dark:border-white/5">
                  <div className="font-heading text-lg font-extrabold text-white">{fmt(s.total_revenue)}</div>
                  <div className="text-[10px] text-white/40 dark:text-white/30 font-medium uppercase tracking-wider">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-lg font-extrabold text-white">{s.credits_balance}</div>
                  <div className="text-[10px] text-white/40 dark:text-white/30 font-medium uppercase tracking-wider">Credits</div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Link href={`/admin/sellers/${s.id}`} className="flex-1">
                  <button className="w-full h-10 rounded-xl bg-white/5 text-white text-sm font-medium hover:bg-white/5 transition">
                    View
                  </button>
                </Link>
                {s.is_verified ? (
                  <button onClick={() => handleUnverify(s.id)} className="h-10 px-3 rounded-xl border border-white/10 text-white/40 text-sm hover:bg-white/5 transition">
                    Unverify
                  </button>
                ) : (
                  <button onClick={() => handleVerify(s.id)} className="h-10 px-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-semibold hover:bg-amber-100 dark:hover:bg-amber-500/20 transition">
                    Verify ✓
                  </button>
                )}
                <button
                  onClick={() => handleToggleActive(s.id)}
                  className={`h-10 px-3 rounded-xl border text-sm font-medium transition ${
                    s.is_active
                      ? "border-red-200 dark:border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                      : "border-green-200 dark:border-green-500/20 text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10"
                  }`}
                >
                  {s.is_active ? "Suspend" : "Activate"}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-white/40">No sellers found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
