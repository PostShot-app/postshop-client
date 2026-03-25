"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleRequestOTP = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to send OTP");
      }
      setStep("otp");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Invalid code");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("seller", JSON.stringify(data.seller));
      router.push("/admin");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Quick admin login with a master key (for platform owner only)
  const handleAdminLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/auth/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: phone }),
      });
      if (!res.ok) throw new Error("Invalid admin key");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/admin");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ps-warm-white dark:bg-ps-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="PostShop" width={48} height={48} className="rounded-xl mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-extrabold text-[#1A1A1F] dark:text-white">PostShop Admin</h1>
          <p className="text-[#6B6B76] dark:text-white/40 mt-1 text-sm">Login to manage your platform</p>
        </div>

        <div className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 p-6 shadow-warm">
          {step === "phone" ? (
            <>
              <label className="block text-sm font-medium text-[#1A1A1F] dark:text-white mb-2">
                Phone or Telegram ID
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number or admin key"
                className="w-full h-12 px-4 rounded-xl bg-ps-warm-muted dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/50 focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                onClick={handleRequestOTP}
                disabled={loading || !phone}
                className="w-full h-12 mt-4 rounded-xl bg-ps-orange text-white font-semibold hover:bg-ps-orange-dark transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP via Telegram"}
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ps-warm-border dark:border-white/10" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white dark:bg-ps-dark-card px-2 text-[#6B6B76]">or</span></div>
              </div>
              <button
                onClick={handleAdminLogin}
                disabled={loading || !phone}
                className="w-full h-12 rounded-xl border border-ps-warm-border dark:border-white/10 text-[#6B6B76] dark:text-white/50 font-medium hover:bg-ps-warm-muted dark:hover:bg-white/5 transition disabled:opacity-50 text-sm"
              >
                Login with Admin Key
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-[#6B6B76] dark:text-white/40 mb-4">
                Check your Telegram — Amberlyn sent you a 6-digit code.
              </p>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="w-full h-14 px-4 rounded-xl bg-ps-warm-muted dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-2xl text-center font-mono text-[#1A1A1F] dark:text-white tracking-[0.5em] placeholder:text-[#6B6B76]/30 placeholder:tracking-normal placeholder:text-base focus:ring-2 focus:ring-ps-orange/30 focus:border-ps-orange outline-none transition"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length < 6}
                className="w-full h-12 mt-4 rounded-xl bg-ps-orange text-white font-semibold hover:bg-ps-orange-dark transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
              <button
                onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                className="w-full mt-2 text-sm text-[#6B6B76] hover:text-[#1A1A1F] dark:hover:text-white transition"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
