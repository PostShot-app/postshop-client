"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

  if (loading) return <div className="text-center py-20 text-zinc-400">Loading...</div>;
  if (!seller) return <div className="text-center py-20 text-zinc-400">Seller not found</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-zinc-900">{seller.shop_name}</h1>
            {seller.is_verified && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                {seller.verification_tier === "platinum" ? "✦ Platinum Verified" : "✓ Gold Verified"}
              </Badge>
            )}
            {!seller.is_active && <Badge variant="destructive">Suspended</Badge>}
          </div>
          <p className="text-zinc-500 mt-1">{seller.shop_slug}.postshot.com</p>
        </div>
        <div className="flex gap-2">
          {seller.is_verified ? (
            <Button variant="outline" onClick={async () => { await unverifySeller(seller.id); load(); }}>
              Remove Verification
            </Button>
          ) : (
            <>
              <Button className="bg-amber-500 hover:bg-amber-600" onClick={async () => { await verifySeller(seller.id, "gold"); load(); }}>
                Verify Gold ✓
              </Button>
              <Button className="bg-violet-500 hover:bg-violet-600" onClick={async () => { await verifySeller(seller.id, "platinum"); load(); }}>
                Verify Platinum ✦
              </Button>
            </>
          )}
          <Button variant="outline" className={seller.is_active ? "text-red-500" : "text-emerald-500"}
                  onClick={async () => { await toggleSellerActive(seller.id); load(); }}>
            {seller.is_active ? "Suspend" : "Activate"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-zinc-500">Products</div>
            <div className="text-2xl font-bold text-zinc-900 mt-1">{seller.product_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-zinc-500">Orders</div>
            <div className="text-2xl font-bold text-zinc-900 mt-1">{seller.order_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-zinc-500">Revenue</div>
            <div className="text-2xl font-bold text-zinc-900 mt-1">{fmt(seller.total_revenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-zinc-500">Credits</div>
            <div className="text-2xl font-bold text-zinc-900 mt-1">{seller.credits_balance}</div>
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <Card>
        <CardHeader><CardTitle>Seller Info</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Phone</span>
            <span className="text-zinc-900 font-medium">{seller.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Email</span>
            <span className="text-zinc-900">{seller.email || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Shop URL</span>
            <a href={`https://${seller.shop_slug}.postshot.com`} className="text-indigo-600 hover:underline" target="_blank">
              {seller.shop_slug}.postshot.com
            </a>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Joined</span>
            <span className="text-zinc-900">{new Date(seller.created_at).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
