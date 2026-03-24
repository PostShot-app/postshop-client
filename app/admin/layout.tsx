import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ps-warm-white dark:bg-ps-dark">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-ps-dark-card/80 backdrop-blur-xl border-b border-ps-warm-border dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="PostShot" width={28} height={28} className="rounded-lg" />
            <span className="font-heading font-bold text-lg text-[#1A1A1F] dark:text-white">PostShot</span>
            <span className="text-[10px] bg-ps-orange/10 text-ps-orange px-2 py-0.5 rounded-full font-bold tracking-wider uppercase">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/sellers">Sellers</NavLink>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-[#6B6B76] dark:text-white/50 hover:text-[#1A1A1F] dark:hover:text-white hover:bg-ps-warm-muted dark:hover:bg-white/5 px-4 py-2 rounded-lg transition"
    >
      {children}
    </Link>
  );
}
