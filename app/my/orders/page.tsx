"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function req(path: string) {
  const token = localStorage.getItem("token") || "";
  return fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json());
}

type Order = {
  id: number;
  product_name: string;
  buyer_name: string;
  buyer_phone: string | null;
  total_amount: number;
  seller_revenue: number;
  currency: string;
  quantity: number;
  status: string;
  delivery_address: string | null;
  created_at: string;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    req("/api/admin/orders").then(setOrders).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-[#1A1A1F] dark:text-white">My Orders</h1>
        <p className="text-[#6B6B76] dark:text-white/40 text-sm mt-1">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="font-heading text-xl font-bold text-[#1A1A1F] dark:text-white">No orders yet</h2>
          <p className="text-[#6B6B76] mt-2">Share your shop link to start getting sales!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 p-5 shadow-warm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#1A1A1F] dark:text-white">{o.product_name}</h3>
                    <span className="text-xs text-[#6B6B76]">x{o.quantity}</span>
                  </div>
                  <p className="text-sm text-[#6B6B76] dark:text-white/40 mt-1">
                    {o.buyer_name}{o.buyer_phone ? ` - ${o.buyer_phone}` : ""}
                  </p>
                  {o.delivery_address && (
                    <p className="text-xs text-[#6B6B76] dark:text-white/30 mt-1">Deliver to: {o.delivery_address}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-heading font-bold text-[#1A1A1F] dark:text-white">
                    {o.currency} {(o.seller_revenue / 100).toFixed(2)}
                  </span>
                  <span className={`block text-[10px] font-bold mt-1 ${
                    o.status === "paid" ? "text-green-600" : o.status === "refunded" ? "text-red-500" : "text-[#6B6B76]"
                  }`}>
                    {o.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-[#6B6B76] dark:text-white/20">
                  {new Date(o.created_at).toLocaleString()}
                </p>
                <a href={`/my/invoice/${o.id}`} target="_blank" rel="noreferrer"
                  className="text-xs text-ps-orange font-semibold hover:underline cursor-pointer">
                  View Invoice
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
