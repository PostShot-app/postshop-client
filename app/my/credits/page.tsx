"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function req(path: string, opts: RequestInit = {}) {
  const token = localStorage.getItem("token") || "";
  return fetch(`${API}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...opts.headers },
  }).then((r) => r.json());
}

type CreditHistory = { type: string; credits: number; description: string; created_at: string };

const PACKS = [
  { name: "Starter", credits: 10, price: 8400, label: "GHS 84" },
  { name: "Pro", credits: 30, price: 25200, label: "GHS 252", popular: true },
  { name: "Business", credits: 100, price: 72000, label: "GHS 720" },
];

export default function CreditsPage() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<CreditHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);

  useEffect(() => {
    req("/api/admin/credits")
      .then((d) => { setBalance(d.balance); setHistory(d.history || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const buyPack = async (pack: typeof PACKS[0]) => {
    setBuying(pack.name);
    try {
      const seller = JSON.parse(localStorage.getItem("seller") || "{}");
      const r = await fetch(`${API}/api/shop/${seller.shop_name || "my"}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: `seller_${seller.id}@postmall.app`,
          // Use internal credit purchase endpoint instead
        }),
      });
      // Actually, credit purchases go through the bot inline buttons or a direct Paystack init
      // Let's use the internal API
      const tx = await req("/api/admin/buy-credits", {
        method: "POST",
        body: JSON.stringify({ pack: pack.name.toLowerCase(), amount: pack.price, credits: pack.credits }),
      });
      if (tx.authorization_url) {
        window.location.href = tx.authorization_url;
      }
    } catch {
      // Fallback: tell user to use Telegram
    } finally {
      setBuying(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Balance */}
      <div className="bg-linear-to-br from-ps-orange to-ps-gold rounded-2xl p-6 text-white text-center">
        <p className="text-white/70 text-sm">Your credit balance</p>
        <div className="font-heading text-5xl font-extrabold mt-2">{balance}</div>
        <p className="text-white/50 text-sm mt-1">1 credit = 1 product glow-up</p>
      </div>

      {/* Packs */}
      <div>
        <h2 className="font-heading text-lg font-bold text-white mb-4">Buy Credits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PACKS.map((pack) => (
            <div key={pack.name}
              className={`relative bg-ps-dark-card rounded-2xl border p-6 shadow-warm transition hover:shadow-warm-lg ${
                pack.popular ? "border-ps-orange" : "border-white/5"
              }`}>
              {pack.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ps-orange text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </span>
              )}
              <h3 className="font-heading text-xl font-bold text-white">{pack.name}</h3>
              <div className="mt-3">
                <span className="font-heading text-3xl font-extrabold text-white">{pack.credits}</span>
                <span className="text-white/40 ml-1">credits</span>
              </div>
              <p className="text-lg font-bold text-ps-orange mt-2">{pack.label}</p>
              <p className="text-xs text-white/30 mt-1">
                GHS {(pack.price / pack.credits / 100).toFixed(2)} per glow-up
              </p>
              <button onClick={() => buyPack(pack)} disabled={buying !== null}
                className="w-full h-10 mt-4 rounded-xl bg-ps-orange text-white font-semibold text-sm hover:bg-ps-orange-dark transition disabled:opacity-50">
                {buying === pack.name ? "..." : `Buy ${pack.name}`}
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-white/40 dark:text-white/20 mt-4">
          Or send &quot;buy credits&quot; to Amberlyn on Telegram for inline purchase.
        </p>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <h2 className="font-heading text-lg font-bold text-white mb-4">Credit History</h2>
          <div className="bg-ps-dark-card rounded-2xl border border-white/5 divide-y divide-ps-warm-border dark:divide-white/5">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm text-white font-medium">{h.description || h.type}</p>
                  <p className="text-[10px] text-white/30">
                    {new Date(h.created_at).toLocaleDateString("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <span className={`font-heading font-bold ${h.credits > 0 ? "text-green-600" : "text-red-500"}`}>
                  {h.credits > 0 ? "+" : ""}{h.credits}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
