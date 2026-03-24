"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { platformStats, platformSellers } from "@/lib/api";

type Stats = {
  sellers: { total: number; active: number; verified: number };
  products: number;
  orders: number;
  revenue: {
    commission_total: number;
    commission_month: number;
    commission_today: number;
    credits_total: number;
    combined_total: number;
  };
};

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

function fmt(amount: number, currency = "GHS") {
  return `${currency} ${(amount / 100).toFixed(2)}`;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([platformStats(), platformSellers("limit=10")])
      .then(([s, sl]) => { setStats(s); setSellers(sl); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-32">
        <div className="text-4xl mb-3">📊</div>
        <p className="text-[#6B6B76]">Could not load stats. Check your API connection.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-extrabold text-[#1A1A1F] dark:text-white tracking-tight">Dashboard</h1>
        <p className="text-[#6B6B76] dark:text-white/40 mt-1">PostShot platform overview</p>
      </div>

      {/* Revenue Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <RevenueCard
          title="Total Revenue"
          value={fmt(stats.revenue.combined_total)}
          subtitle="Credits + Commission"
          icon="💰"
          className="col-span-2 lg:col-span-1 bg-linear-to-br from-ps-orange to-[#FF8F5E] text-white"
        />
        <RevenueCard
          title="Today"
          value={fmt(stats.revenue.commission_today)}
          subtitle="5% storefront fees"
          icon="📈"
          className="bg-white dark:bg-ps-dark-card border border-ps-warm-border dark:border-white/5"
          dark
        />
        <RevenueCard
          title="This Month"
          value={fmt(stats.revenue.commission_month)}
          subtitle="Commission"
          icon="📅"
          className="bg-white dark:bg-ps-dark-card border border-ps-warm-border dark:border-white/5"
          dark
        />
        <RevenueCard
          title="Credit Sales"
          value={fmt(stats.revenue.credits_total)}
          subtitle="All time"
          icon="🎫"
          className="bg-white dark:bg-ps-dark-card border border-ps-warm-border dark:border-white/5"
          dark
        />
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricPill label="Total Sellers" value={stats.sellers.total} />
        <MetricPill label="Active Sellers" value={stats.sellers.active} color="text-green-600 dark:text-green-400" />
        <MetricPill label="Verified" value={stats.sellers.verified} color="text-amber-600 dark:text-amber-400" />
        <MetricPill label="Total Orders" value={stats.orders} />
      </div>

      {/* Recent Sellers Table */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-xl font-bold text-[#1A1A1F] dark:text-white">Recent Sellers</h2>
          <Link href="/admin/sellers" className="text-sm text-ps-orange hover:text-ps-orange-dark font-semibold transition">
            View all →
          </Link>
        </div>

        <div className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 overflow-hidden shadow-warm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ps-warm-border dark:border-white/5">
                  <th className="text-left px-5 py-4 font-semibold text-[#6B6B76] dark:text-white/40 text-xs uppercase tracking-wider">Shop</th>
                  <th className="text-left px-5 py-4 font-semibold text-[#6B6B76] dark:text-white/40 text-xs uppercase tracking-wider hidden sm:table-cell">Phone</th>
                  <th className="text-right px-5 py-4 font-semibold text-[#6B6B76] dark:text-white/40 text-xs uppercase tracking-wider">Credits</th>
                  <th className="text-right px-5 py-4 font-semibold text-[#6B6B76] dark:text-white/40 text-xs uppercase tracking-wider">Revenue</th>
                  <th className="text-center px-5 py-4 font-semibold text-[#6B6B76] dark:text-white/40 text-xs uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="text-right px-5 py-4 font-semibold text-[#6B6B76] dark:text-white/40 text-xs uppercase tracking-wider hidden lg:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((s) => (
                  <tr key={s.id} className="border-b border-ps-warm-border/50 dark:border-white/3 hover:bg-ps-warm-muted/50 dark:hover:bg-white/2 transition">
                    <td className="px-5 py-4">
                      <Link href={`/admin/sellers/${s.id}`} className="group">
                        <span className="font-semibold text-[#1A1A1F] dark:text-white group-hover:text-ps-orange transition">{s.shop_name}</span>
                        <span className="block text-xs text-[#6B6B76] dark:text-white/30 mt-0.5">postshop.vercel.app/{s.shop_slug}</span>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-[#6B6B76] dark:text-white/40 hidden sm:table-cell">{s.phone}</td>
                    <td className="px-5 py-4 text-right text-[#1A1A1F] dark:text-white font-medium">{s.credits_balance}</td>
                    <td className="px-5 py-4 text-right font-heading font-bold text-[#1A1A1F] dark:text-white">{fmt(s.total_revenue)}</td>
                    <td className="px-5 py-4 text-center hidden md:table-cell">
                      {s.is_verified ? (
                        <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
                          {s.verification_tier === "platinum" ? "✦ Platinum" : "✓ Gold"}
                        </span>
                      ) : !s.is_active ? (
                        <span className="inline-flex items-center bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">Suspended</span>
                      ) : (
                        <span className="text-[#6B6B76]/50 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right text-[#6B6B76] dark:text-white/30 text-xs hidden lg:table-cell">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {sellers.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-[#6B6B76]">No sellers yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueCard({ title, value, subtitle, icon, className, dark }: {
  title: string; value: string; subtitle: string; icon: string; className: string; dark?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-6 shadow-warm ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-sm font-medium ${dark ? "text-[#6B6B76] dark:text-white/40" : "text-white/70"}`}>{title}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className={`font-heading text-2xl sm:text-3xl font-extrabold ${dark ? "text-[#1A1A1F] dark:text-white" : ""}`}>{value}</div>
      <div className={`text-xs mt-1.5 ${dark ? "text-[#6B6B76] dark:text-white/30" : "text-white/50"}`}>{subtitle}</div>
    </div>
  );
}

function MetricPill({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 p-5 shadow-warm">
      <div className="text-xs font-medium text-[#6B6B76] dark:text-white/40 uppercase tracking-wider">{label}</div>
      <div className={`font-heading text-3xl font-extrabold mt-2 ${color || "text-[#1A1A1F] dark:text-white"}`}>
        {value.toLocaleString()}
      </div>
    </div>
  );
}
