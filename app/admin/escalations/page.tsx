"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Escalation = {
  id: number;
  seller_id: number;
  seller_name: string;
  seller_country: string | null;
  seller_city: string | null;
  type: string;
  current_value: string;
  requested_value: string;
  reason: string;
  status: string;
  created_at: string;
};

function req(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token") || "";
  return fetch(`${API}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...options.headers },
  }).then((r) => r.json());
}

export default function EscalationsPage() {
  const [items, setItems] = useState<Escalation[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    req("/api/platform/escalations?status=pending")
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const approve = async (id: number) => {
    await req(`/api/platform/escalations/${id}/approve`, { method: "POST" });
    load();
  };

  const reject = async (id: number) => {
    const reason = prompt("Reason for rejection (optional):");
    await req(`/api/platform/escalations/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason: reason || "" }),
    });
    load();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold text-[#1A1A1F] dark:text-white tracking-tight">Requests</h1>
        <p className="text-[#6B6B76] dark:text-white/40 mt-1">Pending seller requests that need your approval</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-[#6B6B76]">No pending requests. All clear!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((e) => (
            <div key={e.id} className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 p-6 shadow-warm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-bold text-[#1A1A1F] dark:text-white">{e.seller_name}</span>
                    {e.seller_country && (
                      <span className="text-xs text-[#6B6B76] dark:text-white/30">
                        {e.seller_city ? `${e.seller_city}, ` : ""}{e.seller_country}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 bg-ps-warm-muted/50 dark:bg-white/3 rounded-xl p-4 text-sm">
                    {e.type === "shop_name_change" && (
                      <>
                        <p className="text-[#6B6B76] dark:text-white/40">Wants to change shop name:</p>
                        <p className="mt-1">
                          <span className="text-[#6B6B76] line-through">{e.current_value}</span>
                          <span className="mx-2">→</span>
                          <span className="font-bold text-[#1A1A1F] dark:text-white">{e.requested_value}</span>
                        </p>
                      </>
                    )}
                    {e.reason && (
                      <p className="mt-2 text-[#6B6B76] dark:text-white/40">
                        Reason: {e.reason}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#6B6B76] dark:text-white/20 mt-2">
                    {new Date(e.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => approve(e.id)}
                    className="h-10 px-5 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-semibold text-sm hover:bg-green-100 dark:hover:bg-green-500/20 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => reject(e.id)}
                    className="h-10 px-5 rounded-xl border border-red-200 dark:border-red-500/20 text-red-500 font-medium text-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
