"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

  if (loading) return <div className="text-center py-20 text-zinc-400">Loading dashboard...</div>;
  if (!stats) return <div className="text-center py-20 text-zinc-400">Could not load stats. Check your API connection.</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Platform Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Overview of PostShot performance</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={fmt(stats.revenue.combined_total)}
          subtitle="Credits + Commission"
          accent="indigo"
        />
        <MetricCard
          title="Today's Commission"
          value={fmt(stats.revenue.commission_today)}
          subtitle="5% storefront fees"
          accent="emerald"
        />
        <MetricCard
          title="Monthly Commission"
          value={fmt(stats.revenue.commission_month)}
          subtitle="This month"
          accent="amber"
        />
        <MetricCard
          title="Credit Sales"
          value={fmt(stats.revenue.credits_total)}
          subtitle="All time"
          accent="violet"
        />
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Sellers" value={stats.sellers.total} />
        <StatCard label="Active Sellers" value={stats.sellers.active} />
        <StatCard
          label="Verified Sellers"
          value={stats.sellers.verified}
          badge={<Badge variant="outline" className="ml-2 text-amber-600 border-amber-300">Gold</Badge>}
        />
        <StatCard label="Total Orders" value={stats.orders} />
      </div>

      <Separator />

      {/* Recent Sellers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-900">Recent Sellers</h2>
          <a href="/admin/sellers" className="text-sm text-indigo-600 hover:text-indigo-800 transition">
            View all →
          </a>
        </div>
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-zinc-500">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Shop</th>
                <th className="text-left px-4 py-3 font-medium">Phone</th>
                <th className="text-right px-4 py-3 font-medium">Credits</th>
                <th className="text-right px-4 py-3 font-medium">Revenue</th>
                <th className="text-center px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sellers.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50 transition">
                  <td className="px-4 py-3">
                    <a href={`/admin/sellers/${s.id}`} className="font-medium text-zinc-900 hover:text-indigo-600 transition">
                      {s.shop_name}
                    </a>
                    <div className="text-xs text-zinc-400">{s.shop_slug}.postshot.com</div>
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{s.phone}</td>
                  <td className="px-4 py-3 text-right text-zinc-600">{s.credits_balance}</td>
                  <td className="px-4 py-3 text-right text-zinc-900 font-medium">{fmt(s.total_revenue)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {s.is_verified && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs">
                          {s.verification_tier === "platinum" ? "✦ Platinum" : "✓ Gold"}
                        </Badge>
                      )}
                      {!s.is_active && (
                        <Badge variant="destructive" className="text-xs">Suspended</Badge>
                      )}
                      {s.is_active && !s.is_verified && (
                        <span className="text-zinc-400 text-xs">Unverified</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-400 text-xs">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {sellers.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-zinc-400">No sellers yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, accent }: {
  title: string; value: string; subtitle: string; accent: string;
}) {
  const colors: Record<string, string> = {
    indigo: "from-indigo-500 to-indigo-600",
    emerald: "from-emerald-500 to-emerald-600",
    amber: "from-amber-500 to-amber-600",
    violet: "from-violet-500 to-violet-600",
  };
  return (
    <Card className={`bg-gradient-to-br ${colors[accent]} text-white border-0`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-white/60 mt-1">{subtitle}</div>
      </CardContent>
    </Card>
  );
}

function StatCard({ label, value, badge }: { label: string; value: number; badge?: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-sm text-zinc-500">{label}</div>
        <div className="text-2xl font-bold text-zinc-900 mt-1 flex items-center">
          {value.toLocaleString()}
          {badge}
        </div>
      </CardContent>
    </Card>
  );
}
