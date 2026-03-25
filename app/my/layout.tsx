"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [shopName, setShopName] = useState("");

  const isLoginPage = pathname === "/my/login";

  useEffect(() => {
    if (isLoginPage) { setReady(true); return; }
    const token = localStorage.getItem("seller_token");
    const seller = localStorage.getItem("seller_data");
    if (!token) {
      router.replace("/my/login");
    } else {
      if (seller) {
        try { setShopName(JSON.parse(seller).shop_name || ""); } catch {}
      }
      setReady(true);
    }
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;
  if (!ready) return null;

  return (
    <div className="min-h-screen bg-ps-warm-white dark:bg-ps-dark">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-ps-dark-card/80 backdrop-blur-xl border-b border-ps-warm-border dark:border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/my" className="flex items-center gap-2">
            <Image src="/logo.png" alt="PostShop" width={24} height={24} className="rounded-lg" />
            <span className="font-heading font-bold text-[#1A1A1F] dark:text-white">{shopName || "My Shop"}</span>
          </Link>
          <div className="flex items-center gap-1 text-sm">
            <NavLink href="/my" active={pathname === "/my"}>Overview</NavLink>
            <NavLink href="/my/products" active={pathname === "/my/products"}>Products</NavLink>
            <NavLink href="/my/orders" active={pathname === "/my/orders"}>Orders</NavLink>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href} className={`px-3 py-1.5 rounded-lg transition ${active ? "bg-ps-orange/10 text-ps-orange font-semibold" : "text-[#6B6B76] hover:text-[#1A1A1F] dark:hover:text-white"}`}>
      {children}
    </Link>
  );
}
