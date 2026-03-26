"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SellerLoginPage() {
  const router = useRouter();
  const [showOTP, setShowOTP] = useState(false);
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
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
      localStorage.setItem("token", data.token);
      localStorage.setItem("seller", JSON.stringify(data.seller));
      router.push("/my");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-ps-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="PostMall" width={48} height={48} className="rounded-xl mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-extrabold text-white">Your Shop Dashboard</h1>
          <p className="text-white/40 mt-1 text-sm">Manage your shop, products, and orders</p>
        </div>

        <div className="bg-ps-dark-card rounded-2xl border border-white/5 p-6">
          {!showOTP ? (
            <>
              {/* Primary: Magic link via Telegram */}
              <a
                href="https://t.me/postshotai_bot?start=login"
                className="w-full h-12 bg-ps-orange text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-ps-orange-dark transition glow-orange"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                Login via Telegram
              </a>
              <p className="text-xs text-center text-white/20 mt-3">
                Send <span className="text-ps-orange font-medium">/login</span> to @postshotai_bot
              </p>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center"><span className="bg-ps-dark-card px-3 text-xs text-white/20">or</span></div>
              </div>

              {/* Fallback: OTP */}
              <button onClick={() => setShowOTP(true)}
                className="w-full h-10 border border-white/10 text-white/40 text-sm font-medium rounded-xl flex items-center justify-center hover:text-white hover:bg-white/5 transition">
                Login with code
              </button>
            </>
          ) : step === "phone" ? (
            <>
              <label className="block text-sm font-medium text-white mb-2">Telegram username or phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. feel_the_agi"
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition" />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button onClick={handleRequestOTP} disabled={loading || !phone}
                className="w-full h-12 mt-4 rounded-xl bg-ps-orange text-white font-semibold hover:bg-ps-orange-dark transition disabled:opacity-50">
                {loading ? "Sending..." : "Send Login Code"}
              </button>
              <button onClick={() => { setShowOTP(false); setError(""); }}
                className="w-full mt-2 text-sm text-white/30 hover:text-white transition">Back</button>
            </>
          ) : (
            <>
              <p className="text-sm text-white/40 mb-4">Check Telegram for your 6-digit code.</p>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" maxLength={6}
                className="w-full h-14 px-4 rounded-xl bg-white/5 border border-white/10 text-2xl text-center font-mono text-white tracking-[0.5em] focus:ring-2 focus:ring-ps-orange/30 outline-none transition" />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button onClick={handleVerify} disabled={loading || otp.length < 6}
                className="w-full h-12 mt-4 rounded-xl bg-ps-orange text-white font-semibold hover:bg-ps-orange-dark transition disabled:opacity-50">
                {loading ? "Verifying..." : "Login"}
              </button>
              <button onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                className="w-full mt-2 text-sm text-white/30 hover:text-white transition">Back</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
