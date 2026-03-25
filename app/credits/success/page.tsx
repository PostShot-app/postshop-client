"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get("reference") || params.get("trxref") || "";

  return (
    <div className="min-h-screen bg-ps-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>

        <h1 className="font-heading text-3xl font-extrabold text-white">Credits Added!</h1>
        <p className="text-white/40 mt-3">
          Your credits have been added to your account. Amberlyn is ready to glow up your products!
        </p>

        {ref && (
          <p className="text-white/20 text-sm mt-4">Reference: {ref}</p>
        )}

        <div className="mt-8 space-y-3">
          <a
            href="https://t.me/postshotai_bot"
            className="block w-full h-12 bg-ps-orange text-white font-bold rounded-xl flex items-center justify-center hover:bg-ps-orange-dark transition glow-orange"
          >
            Back to Amberlyn
          </a>
          <Link
            href="/"
            className="block w-full h-10 border border-white/10 text-white/40 font-medium rounded-xl flex items-center justify-center hover:text-white hover:bg-white/5 transition"
          >
            Back to PostShop
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CreditSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ps-dark" />}>
      <SuccessContent />
    </Suspense>
  );
}
