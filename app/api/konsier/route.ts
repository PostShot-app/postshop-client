import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Lazy import to avoid build-time Konsier initialization
  const { createKonsierRoute } = await import("konsier/next");
  const { getKonsier } = await import("@/lib/konsier");
  const handler = createKonsierRoute(getKonsier());
  return handler(request);
}
