/**
 * Shared Konsier instance — imported by the route handler and sync script.
 */
import { Konsier } from "konsier";
import { z } from "zod";
import {
  findOrCreateSeller,
  requestGlowUp,
  setProductPrice,
  updateProductStock,
  deleteProduct,
  getRecentOrders,
  processRefund,
  getCreditsBalance,
} from "@/lib/backend";

// ── Tools ───────────────────────────────────────────────────

const glowUpProduct = Konsier.tool({
  name: "Glow Up Product",
  description: "Transform a product photo into a professional lifestyle image. Call this when the user sends a product photo or asks to glow up an image.",
  input: z.object({
    image: Konsier.attachment.image().describe("The product photo to transform"),
  }),
  handler: async (input, ctx) => {
    const seller = await findOrCreateSeller(
      ctx.user.externalId || ctx.user.id,
      ctx.channel,
      ctx.user.id,
    );
    const result = await requestGlowUp(seller.id, input.image.url) as Record<string, string | number>;
    if (result.error) return { message: String(result.error) } as Record<string, string>;

    ctx.attach({ type: "image" as const, url: String(result.glowup_image_url) });
    return {
      message: `${result.ad_copy}\n\nWhat's the price?`,
      product_name: String(result.name),
      ad_copy: String(result.ad_copy),
      credits_remaining: Number(result.credits_remaining),
    } as Record<string, string | number>;
  },
});

const setPrice = Konsier.tool({
  name: "Set Price",
  description: "Set or update the price of a product. Use when the seller tells you a price like '45 cedis', 'GHS 45', '$10', or just a number after a glow-up.",
  input: z.object({
    price: z.number().describe("Price in the smallest currency unit (pesewas/kobo). For example, 45 cedis = 4500"),
    currency: z.string().default("GHS").describe("Currency code: GHS, NGN, USD, etc."),
    product_id: z.number().optional().describe("Product ID. If not given, updates the most recent product."),
  }),
  handler: async (input, ctx) => {
    const seller = await findOrCreateSeller(ctx.user.externalId || ctx.user.id, ctx.channel, ctx.user.id);
    return setProductPrice(seller.id, input.price, input.currency, input.product_id);
  },
});

const updateStock = Konsier.tool({
  name: "Update Stock",
  description: "Update stock quantity for a product. Use when seller says 'I have 40', 'out of stock', 'restocked 20', etc. Use 0 for out of stock, -1 for unlimited.",
  input: z.object({
    stock: z.number().describe("Stock quantity. 0 = out of stock, -1 = unlimited."),
    product_id: z.number().optional().describe("Product ID. If not given, updates the most recent product."),
  }),
  handler: async (input, ctx) => {
    const seller = await findOrCreateSeller(ctx.user.externalId || ctx.user.id, ctx.channel, ctx.user.id);
    return updateProductStock(seller.id, input.stock, input.product_id);
  },
});

const refundOrder = Konsier.tool({
  name: "Process Refund",
  description: "Process a refund for an order. Marks the order as refunded and restores stock. Use when seller says 'refund order #123' or 'I had to refund Sarah'.",
  input: z.object({
    order_id: z.number().describe("The order ID to refund"),
    restore_stock: z.boolean().default(true).describe("Whether to restore the stock quantity"),
  }),
  handler: async (input, ctx) => {
    const seller = await findOrCreateSeller(ctx.user.externalId || ctx.user.id, ctx.channel, ctx.user.id);
    return processRefund(seller.id, input.order_id, input.restore_stock);
  },
});

const removeProduct = Konsier.tool({
  name: "Delete Product",
  description: "Remove a product from the storefront. Use when seller says 'delete the shea butter' or 'remove product #5'.",
  input: z.object({
    product_id: z.number().describe("The product ID to remove"),
  }),
  handler: async (input, ctx) => {
    const seller = await findOrCreateSeller(ctx.user.externalId || ctx.user.id, ctx.channel, ctx.user.id);
    return deleteProduct(seller.id, input.product_id);
  },
});

const checkCredits = Konsier.tool({
  name: "Check Credits",
  description: "Check the seller's credit balance and show top-up options. Use when seller asks 'how many credits', 'buy credits', or 'top up'.",
  input: z.object({}),
  handler: async (_input, ctx) => {
    const seller = await findOrCreateSeller(ctx.user.externalId || ctx.user.id, ctx.channel, ctx.user.id);
    return getCreditsBalance(seller.id);
  },
});

const checkOrders = Konsier.tool({
  name: "Check Orders",
  description: "Get a summary of recent orders and sales. Use when seller asks 'any sales today?', 'my orders', or 'how's business'.",
  input: z.object({}),
  handler: async (_input, ctx) => {
    const seller = await findOrCreateSeller(ctx.user.externalId || ctx.user.id, ctx.channel, ctx.user.id);
    return getRecentOrders(seller.id);
  },
});

// ── Konsier Instance ────────────────────────────────────────

export const konsier = new Konsier({
  apiKey: process.env.KONSIER_API_KEY!,
  endpointUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://postshot.com"}/api/konsier`,
  agents: {
    amberlyn: {
      name: "Amberlyn",
      description: "AI assistant that transforms product photos into professional selling images and manages your PostShot shop.",
      systemPrompt: `You are Amberlyn, the AI assistant for PostShot.

## Personality
Warm, sharp, efficient. You help sellers turn phone photos into professional product images. Keep messages short — sellers are busy.

## What you do
- Transform product photos into stunning lifestyle images (use "Glow Up Product" tool)
- Write ad copy sellers can forward directly to customers
- Manage prices, stock, and products on their shop
- Track credit balance and help them top up
- Summarize recent orders and sales

## Rules
- When a seller sends a photo, ALWAYS use the "Glow Up Product" tool
- When a seller sends a number after a glow-up, it's a price. Use "Set Price" tool. Convert to smallest unit: "45 cedis" = 4500
- Parse natural language for prices: "45 cedis", "GHS 45", "$10", "45" all work
- For stock: "I have 40" = set to 40. "out of stock" = 0. "restocked 20" = add 20
- Always respond in the language the seller uses
- Never make up information about orders or products
- Keep replies short and WhatsApp-friendly

## First interaction
If this seems like a new seller, welcome them warmly:
"Welcome to PostShot! I'm Amberlyn. I turn your product photos into professional selling images. Send me a photo to get started!"`,
      tools: [glowUpProduct, setPrice, updateStock, refundOrder, removeProduct, checkCredits, checkOrders],
    },
  },
});
