const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.json();
}

// Platform Admin
export const platformStats = () => request("/api/platform/stats");
export const platformSellers = (params?: string) => request(`/api/platform/sellers${params ? `?${params}` : ""}`);
export const platformSeller = (id: number) => request(`/api/platform/sellers/${id}`);
export const verifySeller = (id: number, tier: string) =>
  request(`/api/platform/sellers/${id}/verify`, { method: "POST", body: JSON.stringify({ tier }) });
export const unverifySeller = (id: number) =>
  request(`/api/platform/sellers/${id}/unverify`, { method: "POST" });
export const toggleSellerActive = (id: number) =>
  request(`/api/platform/sellers/${id}/toggle-active`, { method: "POST" });

// Seller Admin
export const sellerDashboard = () => request("/api/admin/dashboard");
export const sellerProducts = () => request("/api/admin/products");
export const sellerOrders = () => request("/api/admin/orders");
export const sellerCredits = () => request("/api/admin/credits");
export const updateProduct = (id: number, body: object) =>
  request(`/api/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(body) });
export const updateOrder = (id: number, body: object) =>
  request(`/api/admin/orders/${id}`, { method: "PATCH", body: JSON.stringify(body) });

// Storefront
export const shopInfo = (slug: string) => request(`/api/shop/${slug}`);
export const shopProducts = (slug: string) => request(`/api/shop/${slug}/products`);
export const shopProduct = (slug: string, id: number) => request(`/api/shop/${slug}/products/${id}`);
export const checkout = (slug: string, body: object) =>
  request(`/api/shop/${slug}/checkout`, { method: "POST", body: JSON.stringify(body) });

// Auth
export const requestOTP = (phone: string) =>
  request("/api/auth/request-otp", { method: "POST", body: JSON.stringify({ phone }) });
export const verifyOTP = (phone: string, otp: string) =>
  request("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ phone, otp }) });
