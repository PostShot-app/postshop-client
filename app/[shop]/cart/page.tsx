"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCart, updateQuantity, removeFromCart, clearCart, cartTotal, type CartItem } from "@/lib/cart";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function CartPage() {
  const params = useParams();
  const slug = params.shop as string;
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [buying, setBuying] = useState(false);

  const refresh = () => setItems([...getCart(slug)]);
  useEffect(() => { refresh(); }, [slug]);

  const { count, amount, currency } = cartTotal(slug);

  const handleCheckout = async () => {
    if (!items.length) return;
    setBuying(true);
    try {
      const res = await fetch(`${API}/api/shop/${slug}/cart-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
          name: form.name || "Customer",
          phone: form.phone,
          email: form.email || "buyer@postmall.com",
          address: form.address,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      clearCart(slug);
      window.location.href = data.authorization_url;
    } catch {
      alert("Checkout failed. Please try again.");
      setBuying(false);
    }
  };

  return (
    <div className="min-h-screen bg-ps-dark">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-ps-dark-card/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={`/${slug}`} className="flex items-center gap-2 text-sm text-white/40 hover:text-ps-orange transition font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Continue Shopping
          </Link>
          <span className="text-sm text-white/30">{count} item{count !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-3xl font-extrabold text-white mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="font-heading text-xl font-bold text-white">Cart is empty</h2>
            <p className="text-white/30 mt-2">Browse the shop and add items to get started.</p>
            <Link href={`/${slug}`} className="inline-block mt-6 bg-ps-orange text-white px-6 py-3 rounded-xl font-semibold hover:bg-ps-orange-dark transition">
              Back to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product_id} className="bg-ps-dark-card rounded-2xl border border-white/5 p-4 flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5 shrink-0">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate">{item.name}</h3>
                    <p className="font-heading font-bold text-white mt-1">
                      {item.currency} {(item.price / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                        <button onClick={() => { updateQuantity(slug, item.product_id, item.quantity - 1); refresh(); }}
                          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white text-sm">−</button>
                        <span className="w-8 text-center text-white text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => { updateQuantity(slug, item.product_id, item.quantity + 1); refresh(); }}
                          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white text-sm">+</button>
                      </div>
                      <span className="text-xs text-white/20">
                        {item.currency} {((item.price * item.quantity) / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                      </span>
                      <button onClick={() => { removeFromCart(slug, item.product_id); refresh(); }}
                        className="ml-auto text-red-400/50 hover:text-red-400 transition">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-ps-dark-card rounded-2xl border border-white/5 p-5">
              <div className="flex items-center justify-between">
                <span className="text-white/40">Total ({count} item{count !== 1 ? "s" : ""})</span>
                <span className="font-heading text-2xl font-extrabold text-white">
                  {currency} {(amount / 100).toLocaleString("en", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Checkout form */}
            <div className="space-y-3">
              <h2 className="font-heading text-lg font-bold text-white">Your Details</h2>
              <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:ring-2 focus:ring-ps-orange/30 outline-none transition" />
                <input placeholder="Email (optional)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:ring-2 focus:ring-ps-orange/30 outline-none transition" />
              </div>
              <input placeholder="Delivery address (optional)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:ring-2 focus:ring-ps-orange/30 outline-none transition" />
            </div>

            {/* Checkout button */}
            <button onClick={handleCheckout} disabled={buying}
              className="w-full h-14 rounded-xl bg-ps-orange text-white font-bold text-lg hover:bg-ps-orange-dark transition-all glow-orange disabled:opacity-50 flex items-center justify-center gap-2">
              {buying ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
              ) : (
                `Pay ${currency} ${(amount / 100).toLocaleString("en", { minimumFractionDigits: 2 })}`
              )}
            </button>

            <p className="text-xs text-center text-white/20 flex items-center justify-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Secure payment via Paystack (MoMo, Card, Bank)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
