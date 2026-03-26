"use client";

import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function OrderConfirmedPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.shop as string;
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  return (
    <div className="min-h-screen bg-ps-warm-white dark:bg-ps-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="font-heading text-3xl font-extrabold text-[#1A1A1F] dark:text-white tracking-tight">
          Order Confirmed!
        </h1>

        <p className="text-[#6B6B76] dark:text-white/50 mt-3 text-lg">
          Your payment was successful. The seller has been notified and will reach out to you shortly.
        </p>

        {reference && (
          <p className="mt-4 text-sm text-[#6B6B76] dark:text-white/30">
            Reference: {reference}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={`/${slug}`}
            className="w-full py-3 rounded-xl bg-ps-orange text-white font-semibold text-center hover:bg-ps-orange-dark transition"
          >
            Continue Shopping
          </Link>
          <Link
            href={`/${slug}`}
            className="w-full py-3 rounded-xl bg-ps-warm-muted dark:bg-white/5 text-[#1A1A1F] dark:text-white font-medium text-center hover:bg-ps-warm-border dark:hover:bg-white/10 transition"
          >
            Back to Store
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#6B6B76] dark:text-white/30">
          <Image src="/logo.png" alt="PostShop" width={16} height={16} className="rounded" />
          Powered by PostShop
        </div>
      </div>
    </div>
  );
}
