"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

  const handleVerify = async (id: number) => {
    await verifySeller(id, "gold");
    load();
  };

  const handleUnverify = async (id: number) => {
    await unverifySeller(id);
    load();
  };

  const handleToggleActive = async (id: number) => {
    await toggleSellerActive(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Sellers</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage and verify seller accounts</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-1">
          {(["all", "verified", "unverified"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Sellers Grid */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <Card key={s.id} className="hover:shadow-md transition">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-zinc-900">{s.shop_name}</h3>
                      {s.is_verified && (
                        <span className="text-amber-500" title={`${s.verification_tier} verified`}>
                          {s.verification_tier === "platinum" ? "✦" : "✓"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">{s.shop_slug}.postshot.com</p>
                    <p className="text-sm text-zinc-500 mt-1">{s.phone}</p>
                  </div>
                  {!s.is_active && <Badge variant="destructive">Suspended</Badge>}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-zinc-900">{s.total_orders}</div>
                    <div className="text-xs text-zinc-400">Orders</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-zinc-900">{fmt(s.total_revenue)}</div>
                    <div className="text-xs text-zinc-400">Revenue</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-zinc-900">{s.credits_balance}</div>
                    <div className="text-xs text-zinc-400">Credits</div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <a href={`/admin/sellers/${s.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">View</Button>
                  </a>
                  {s.is_verified ? (
                    <Button variant="outline" size="sm" onClick={() => handleUnverify(s.id)}
                            className="text-zinc-500">Remove ✓</Button>
                  ) : (
                    <Button size="sm" onClick={() => handleVerify(s.id)}
                            className="bg-amber-500 hover:bg-amber-600">Verify ✓</Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleToggleActive(s.id)}
                          className={s.is_active ? "text-red-500" : "text-emerald-500"}>
                    {s.is_active ? "Suspend" : "Activate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-zinc-400">No sellers found</div>
          )}
        </div>
      )}
    </div>
  );
}
