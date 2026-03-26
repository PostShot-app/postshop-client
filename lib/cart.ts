/**
 * Shopping cart — stored in localStorage, scoped per shop.
 * No auth needed. Buyer just adds items and checks out.
 */

export type CartItem = {
  product_id: number;
  name: string;
  price: number;
  currency: string;
  image_url: string;
  quantity: number;
};

const CART_KEY = (shop: string) => `postmall_cart_${shop}`;

export function getCart(shop: string): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY(shop)) || "[]");
  } catch {
    return [];
  }
}

function saveCart(shop: string, items: CartItem[]) {
  localStorage.setItem(CART_KEY(shop), JSON.stringify(items));
  // Dispatch event so other components can react
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: { shop, items } }));
}

export function addToCart(shop: string, item: Omit<CartItem, "quantity">, qty: number = 1) {
  const cart = getCart(shop);
  const existing = cart.find((i) => i.product_id === item.product_id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...item, quantity: qty });
  }
  saveCart(shop, cart);
}

export function updateQuantity(shop: string, productId: number, qty: number) {
  const cart = getCart(shop);
  const item = cart.find((i) => i.product_id === productId);
  if (item) {
    item.quantity = Math.max(1, qty);
  }
  saveCart(shop, cart);
}

export function removeFromCart(shop: string, productId: number) {
  const cart = getCart(shop).filter((i) => i.product_id !== productId);
  saveCart(shop, cart);
}

export function clearCart(shop: string) {
  saveCart(shop, []);
}

export function cartTotal(shop: string): { count: number; amount: number; currency: string } {
  const cart = getCart(shop);
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  const amount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const currency = cart[0]?.currency || "GHS";
  return { count, amount, currency };
}
