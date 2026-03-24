"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { shopProduct, checkout } from "@/lib/api";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  currency: string;
  glowup_image_url: string | null;
  original_image_url: string;
  stock: number | null;
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.shop as string;
  const productId = Number(params.product);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });

  useEffect(() => {
    shopProduct(slug, productId)
      .then(setProduct)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug, productId]);

  const handleBuy = async () => {
    if (!product?.price) return;
    setBuying(true);
    try {
      const result = await checkout(slug, {
        product_id: product.id,
        name: form.name || "Customer",
        phone: form.phone,
        email: form.email || "buyer@postshot.com",
        address: form.address,
        quantity: 1,
      });
      window.location.href = result.authorization_url;
    } catch {
      alert("Checkout failed. Please try again.");
      setBuying(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-zinc-400">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center text-zinc-400">Product not found</div>;

  const soldOut = product.stock === 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <a href={`/${slug}`} className="text-sm text-indigo-600 hover:underline mb-6 block">← Back to shop</a>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100">
            <img
              src={product.glowup_image_url || product.original_image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">{product.name}</h1>
              {product.description && (
                <p className="text-zinc-600 mt-2">{product.description}</p>
              )}
            </div>

            {product.price ? (
              <div className="text-3xl font-bold text-zinc-900">
                {product.currency} {(product.price / 100).toFixed(2)}
              </div>
            ) : (
              <p className="text-zinc-400">Contact seller for price</p>
            )}

            {product.stock !== null && product.stock > 0 && product.stock <= 10 && (
              <Badge className="bg-amber-100 text-amber-800">{product.stock} left in stock</Badge>
            )}

            {soldOut ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600 font-medium">
                Sold Out
              </div>
            ) : product.price ? (
              <div className="space-y-3">
                <Input placeholder="Your name" value={form.name}
                       onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Phone number" value={form.phone}
                       onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Input placeholder="Email (optional)" value={form.email}
                       onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input placeholder="Delivery address (optional)" value={form.address}
                       onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <Button className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700"
                        onClick={handleBuy} disabled={buying}>
                  {buying ? "Redirecting to payment..." : `Buy Now — ${product.currency} ${(product.price / 100).toFixed(2)}`}
                </Button>
                <p className="text-xs text-center text-zinc-400">
                  Secure payment via Paystack (MoMo, Card, Bank)
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
