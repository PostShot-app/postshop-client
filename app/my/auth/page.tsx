"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function AuthContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) { setError("No token provided"); return; }

    fetch(`${API}/api/auth/magic?token=${token}`)
      .then(async (r) => {
        if (!r.ok) {
          const data = await r.json().catch(() => ({}));
          throw new Error(data.detail || "Invalid link");
        }
        return r.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("seller", JSON.stringify(data.seller));
        router.replace("/my");
      })
      .catch((e) => setError(e.message));
  }, [token, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-ps-dark flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="font-heading text-2xl font-bold text-white">Link expired</h1>
          <p className="text-white/40 mt-3">{error}</p>
          <p className="text-white/30 mt-4 text-sm">
            Send <span className="text-ps-orange font-bold">/login</span> to Amberlyn on Telegram for a new link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ps-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-white/30">Logging you in...</span>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ps-dark" />}>
      <AuthContent />
    </Suspense>
  );
}
