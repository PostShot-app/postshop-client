"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { shopInfo, shopProducts } from "@/lib/api";

type Shop = { shop_name: string; slug: string };
type Product = {
  id: number;
  name: string;
  price: number | null;
  currency: string;
  glowup_image_url: string | null;
  original_image_url: string;
  stock: number | null;
  is_published: boolean;
};

export default function StorefrontPage() {
  const params = useParams();
  const slug = params.shop as string;
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([shopInfo(slug), shopProducts(slug)])
      .then(([s, p]) => { setShop(s); setProducts(p); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-zinc-400">Loading...</div>;
  if (!shop) return <div className="min-h-screen flex items-center justify-center text-zinc-400">Shop not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Shop Header */}
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900">{shop.shop_name}</h1>
          <p className="text-zinc-400 mt-2 text-sm">{products.length} products</p>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <Link key={p.id} href={`/${slug}/${p.id}`} className="group">
              <div className="aspect-square rounded-lg overflow-hidden bg-zinc-100 relative">
                <img
                  src={p.glowup_image_url || p.original_image_url}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {p.stock !== null && p.stock <= 3 && p.stock > 0 && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                    {p.stock} left
                  </Badge>
                )}
                {p.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Sold Out</span>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-zinc-900 truncate">{p.name}</h3>
                {p.price ? (
                  <p className="text-sm font-bold text-zinc-900 mt-0.5">
                    {p.currency} {(p.price / 100).toFixed(2)}
                  </p>
                ) : (
                  <p className="text-xs text-zinc-400 mt-0.5">Price on request</p>
                )}
              </div>
            </Link>
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center py-20 text-zinc-400">No products yet. Check back soon!</div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-zinc-400">
        Powered by <a href="https://postshot.com" className="text-indigo-500 hover:underline">PostShot</a>
      </footer>
    </div>
  );
}
