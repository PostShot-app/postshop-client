/**
 * Internal calls from Konsier tools → FastAPI backend.
 * These bypass auth (server-to-server) and use an internal API key.
 */

const API = process.env.API_URL || "http://localhost:8000";

async function internal(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Key": process.env.INTERNAL_API_KEY || "internal-dev-key",
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`Backend ${res.status}: ${await res.text()}`);
  return res.json();
}

// ── Sellers ─────────────────────────────────────────────────

export async function findOrCreateSeller(phone: string, platform: string, userId: string) {
  return internal("/api/internal/sellers/find-or-create", {
    method: "POST",
    body: JSON.stringify({ phone, platform, konsier_user_id: userId }),
  });
}

// ── Glow-up ─────────────────────────────────────────────────

export async function requestGlowUp(sellerId: number, imageUrl: string) {
  return internal("/api/internal/glowup", {
    method: "POST",
    body: JSON.stringify({ seller_id: sellerId, image_url: imageUrl }),
  });
}

// ── Products ────────────────────────────────────────────────

export async function setProductPrice(sellerId: number, price: number, currency: string, productId?: number) {
  return internal("/api/internal/products/set-price", {
    method: "POST",
    body: JSON.stringify({ seller_id: sellerId, price, currency, product_id: productId }),
  });
}

export async function updateProductStock(sellerId: number, stock: number, productId?: number) {
  return internal("/api/internal/products/update-stock", {
    method: "POST",
    body: JSON.stringify({ seller_id: sellerId, stock, product_id: productId }),
  });
}

export async function deleteProduct(sellerId: number, productId: number) {
  return internal("/api/internal/products/delete", {
    method: "POST",
    body: JSON.stringify({ seller_id: sellerId, product_id: productId }),
  });
}

// ── Orders ──────────────────────────────────────────────────

export async function getRecentOrders(sellerId: number) {
  return internal(`/api/internal/orders?seller_id=${sellerId}`);
}

export async function processRefund(sellerId: number, orderId: number, restoreStock: boolean) {
  return internal("/api/internal/orders/refund", {
    method: "POST",
    body: JSON.stringify({ seller_id: sellerId, order_id: orderId, restore_stock: restoreStock }),
  });
}

// ── Credits ─────────────────────────────────────────────────

export async function getCreditsBalance(sellerId: number) {
  return internal(`/api/internal/credits?seller_id=${sellerId}`);
}

export async function getCreditPacks() {
  return internal("/api/internal/credits/packs");
}
