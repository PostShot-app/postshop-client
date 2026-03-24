import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/logo.png" alt="PostShot" width={32} height={32} className="rounded" />
            <span className="font-semibold text-lg">PostShot</span>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/admin" className="text-zinc-600 hover:text-zinc-900 transition">Dashboard</Link>
            <Link href="/admin/sellers" className="text-zinc-600 hover:text-zinc-900 transition">Sellers</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
