"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SellerLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRequestOTP = async () => {
    setLoading(true); setError("");
    try {
      const r = await fetch(`${API}/api/auth/request-otp`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!r.ok) throw new Error((await r.json()).detail || "Not found");
      setStep("otp");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally { setLoading(false); }
  };

  const handleVerify = async () => {
    setLoading(true); setError("");
    try {
      const r = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      if (!r.ok) throw new Error((await r.json()).detail || "Invalid code");
      const data = await r.json();
      localStorage.setItem("seller_token", data.token);
      localStorage.setItem("seller_data", JSON.stringify(data.seller));
      router.push("/my");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-ps-warm-white dark:bg-ps-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="PostShop" width={48} height={48} className="rounded-xl mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-extrabold text-[#1A1A1F] dark:text-white">Your Shop Dashboard</h1>
          <p className="text-[#6B6B76] dark:text-white/40 mt-1 text-sm">Login with your Telegram phone to manage your shop</p>
        </div>

        <div className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 p-6 shadow-warm">
          {step === "phone" ? (
            <>
              <label className="block text-sm font-medium text-[#1A1A1F] dark:text-white mb-2">Your phone number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 0241234567"
                className="w-full h-12 px-4 rounded-xl bg-ps-warm-muted dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/50 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition" />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button onClick={handleRequestOTP} disabled={loading || !phone}
                className="w-full h-12 mt-4 rounded-xl bg-ps-orange text-white font-semibold hover:bg-ps-orange-dark transition disabled:opacity-50">
                {loading ? "Sending..." : "Send Login Code"}
              </button>
              <p className="text-xs text-center text-[#6B6B76] mt-3">Amberlyn will send you a code on Telegram</p>
            </>
          ) : (
            <>
              <p className="text-sm text-[#6B6B76] dark:text-white/40 mb-4">Check Telegram for your 6-digit code.</p>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" maxLength={6}
                className="w-full h-14 px-4 rounded-xl bg-ps-warm-muted dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-2xl text-center font-mono text-[#1A1A1F] dark:text-white tracking-[0.5em] focus:ring-2 focus:ring-ps-orange/30 outline-none transition" />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button onClick={handleVerify} disabled={loading || otp.length < 6}
                className="w-full h-12 mt-4 rounded-xl bg-ps-orange text-white font-semibold hover:bg-ps-orange-dark transition disabled:opacity-50">
                {loading ? "Verifying..." : "Login"}
              </button>
              <button onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                className="w-full mt-2 text-sm text-[#6B6B76] hover:text-[#1A1A1F] transition">Back</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
