"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AdminLoginPage() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim() }),
      });
      if (!res.ok) throw new Error("Invalid admin key");
      const data = await res.json();
      localStorage.setItem("admin_token", data.token);
      router.push("/admin");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ps-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="PostMall" width={48} height={48} className="rounded-xl mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-extrabold text-white">Platform Admin</h1>
          <p className="text-white/40 mt-1 text-sm">Enter your admin key to continue</p>
        </div>

        <div className="bg-ps-dark-card rounded-2xl border border-white/5 p-6">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && key && handleLogin()}
            placeholder="Admin key"
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading || !key}
            className="w-full h-12 mt-4 rounded-xl bg-ps-orange text-white font-semibold hover:bg-ps-orange-dark transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
