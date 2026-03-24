"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { platformSeller, verifySeller, unverifySeller, toggleSellerActive } from "@/lib/api";

type SellerDetail = {
  id: number;
  phone: string;
  shop_name: string;
  shop_slug: string;
  email: string | null;
  credits_balance: number;
  is_verified: boolean;
  verification_tier: string | null;
  is_active: boolean;
  product_count: number;
  order_count: number;
  total_revenue: number;
  created_at: string;
};

function fmt(amount: number) {
  return `GHS ${(amount / 100).toFixed(2)}`;
}

export default function SellerDetailPage() {
  const params = useParams();
  const [seller, setSeller] = useState<SellerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    platformSeller(Number(params.id))
      .then(setSeller)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="text-center py-32">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-[#6B6B76]">Seller not found</p>
        <Link href="/admin/sellers" className="text-ps-orange font-semibold mt-3 inline-block hover:underline">Back to sellers</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Back link */}
      <Link href="/admin/sellers" className="inline-flex items-center gap-2 text-sm text-[#6B6B76] hover:text-ps-orange transition font-medium">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        All sellers
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-ps-orange/20 to-ps-gold/20 rounded-2xl flex items-center justify-center shadow-warm">
            <span className="font-heading text-2xl font-bold text-ps-orange">{seller.shop_name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1A1A1F] dark:text-white tracking-tight">{seller.shop_name}</h1>
              {seller.is_verified && (
                <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full">
                  {seller.verification_tier === "platinum" ? "✦ Platinum" : "✓ Gold"}
                </span>
              )}
              {!seller.is_active && (
                <span className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-3 py-1.5 rounded-full">Suspended</span>
              )}
            </div>
            <p className="text-[#6B6B76] dark:text-white/30 mt-0.5 text-sm">postshop.vercel.app/{seller.shop_slug}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {seller.is_verified ? (
            <button onClick={async () => { await unverifySeller(seller.id); load(); }}
              className="h-10 px-4 rounded-xl border border-ps-warm-border dark:border-white/10 text-[#6B6B76] text-sm font-medium hover:bg-ps-warm-muted dark:hover:bg-white/5 transition">
              Remove Verification
            </button>
          ) : (
            <>
              <button onClick={async () => { await verifySeller(seller.id, "gold"); load(); }}
                className="h-10 px-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-bold hover:bg-amber-100 dark:hover:bg-amber-500/20 transition">
                Verify Gold ✓
              </button>
              <button onClick={async () => { await verifySeller(seller.id, "platinum"); load(); }}
                className="h-10 px-4 rounded-xl bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-sm font-bold hover:bg-violet-100 dark:hover:bg-violet-500/20 transition">
                Verify Platinum ✦
              </button>
            </>
          )}
          <button onClick={async () => { await toggleSellerActive(seller.id); load(); }}
            className={`h-10 px-4 rounded-xl border text-sm font-medium transition ${
              seller.is_active
                ? "border-red-200 dark:border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                : "border-green-200 dark:border-green-500/20 text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10"
            }`}>
            {seller.is_active ? "Suspend Account" : "Activate Account"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Products", value: seller.product_count, icon: "📦" },
          { label: "Orders", value: seller.order_count, icon: "🛒" },
          { label: "Revenue", value: fmt(seller.total_revenue), icon: "💰" },
          { label: "Credits", value: seller.credits_balance, icon: "🎫" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 p-5 shadow-warm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#6B6B76] dark:text-white/40 uppercase tracking-wider">{stat.label}</span>
              <span>{stat.icon}</span>
            </div>
            <div className="font-heading text-3xl font-extrabold text-[#1A1A1F] dark:text-white mt-2">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Seller Info */}
      <div className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 shadow-warm overflow-hidden">
        <div className="px-6 py-4 border-b border-ps-warm-border dark:border-white/5">
          <h2 className="font-heading text-lg font-bold text-[#1A1A1F] dark:text-white">Seller Info</h2>
        </div>
        <div className="divide-y divide-ps-warm-border/50 dark:divide-white/5">
          {[
            { label: "Phone", value: seller.phone },
            { label: "Email", value: seller.email || "Not set" },
            {
              label: "Shop URL",
              value: (
                <a href={`/postshop.vercel.app/${seller.shop_slug}`} className="text-ps-orange hover:underline" target="_blank" rel="noreferrer">
                  postshop.vercel.app/{seller.shop_slug}
                </a>
              ),
            },
            { label: "Joined", value: new Date(seller.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between px-6 py-4">
              <span className="text-sm text-[#6B6B76] dark:text-white/40">{row.label}</span>
              <span className="text-sm font-medium text-[#1A1A1F] dark:text-white">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
