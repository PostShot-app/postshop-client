"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function req(path: string) {
  const token = localStorage.getItem("token") || "";
  return fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());
}

type Dashboard = {
  shop_name: string;
  shop_slug: string;
  credits: number;
  products: number;
  orders: number;
  revenue: number;
  currency: string;
};

export default function SellerDashboard() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    req("/api/admin/dashboard")
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return <div className="text-center py-20 text-white/40">Could not load your dashboard.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Shop link banner */}
      <div className="bg-linear-to-br from-ps-orange to-ps-gold rounded-2xl p-6 text-white">
        <h1 className="font-heading text-2xl font-extrabold">{data.shop_name}</h1>
        <p className="text-white/70 mt-1 text-sm">postshop.vercel.app/{data.shop_slug}</p>
        <div className="flex gap-3 mt-4">
          <a href={`/${data.shop_slug}`} target="_blank" rel="noreferrer"
            className="bg-ps-dark-card/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium hover:bg-ps-dark-card/30 transition">
            View Shop
          </a>
          <button onClick={() => { navigator.clipboard.writeText(`https://postshop.vercel.app/${data.shop_slug}`); }}
            className="bg-ps-dark-card/10 px-4 py-2 rounded-xl text-sm font-medium hover:bg-ps-dark-card/20 transition">
            Copy Link
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/my/credits" className="block">
          <StatCard label="Credits" value={data.credits} icon="🎫" action="Top Up" />
        </Link>
        <StatCard label="Products" value={data.products} icon="📦" />
        <StatCard label="Orders" value={data.orders} icon="🛒" />
        <StatCard label="Revenue" value={`${data.currency || "GHS"} ${((data.revenue || 0) / 100).toFixed(2)}`} icon="💰" />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/my/products"
          className="bg-ps-dark-card rounded-2xl border border-white/5 p-6 shadow-warm hover:shadow-warm-lg transition group">
          <span className="text-2xl">📦</span>
          <h3 className="font-heading font-bold text-white mt-2 group-hover:text-ps-orange transition">My Products</h3>
          <p className="text-sm text-white/40 mt-1">View and manage your catalog</p>
        </Link>
        <Link href="/my/orders"
          className="bg-ps-dark-card rounded-2xl border border-white/5 p-6 shadow-warm hover:shadow-warm-lg transition group">
          <span className="text-2xl">🛒</span>
          <h3 className="font-heading font-bold text-white mt-2 group-hover:text-ps-orange transition">My Orders</h3>
          <p className="text-sm text-white/40 mt-1">See who bought what</p>
        </Link>
      </div>

      <p className="text-center text-sm text-white/30">
        Need help? Message Amberlyn on Telegram — she manages your shop for you.
      </p>
    </div>
  );
}

function StatCard({ label, value, icon, action }: { label: string; value: string | number; icon: string; action?: string }) {
  return (
    <div className="bg-ps-dark-card rounded-2xl border border-white/5 p-5 shadow-warm hover:shadow-warm-lg transition">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</span>
        <span>{icon}</span>
      </div>
      <div className="font-heading text-2xl font-extrabold text-white mt-2">{value}</div>
      {action && <span className="text-xs text-ps-orange font-semibold mt-1 inline-block">{action} →</span>}
    </div>
  );
}
