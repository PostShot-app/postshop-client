import { konsier } from "@/lib/konsier";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await konsier.sync();
    return NextResponse.json({ status: "synced", message: "Amberlyn agent pushed to Konsier Cloud" });
  } catch (error) {
    return NextResponse.json({ status: "error", message: String(error) }, { status: 500 });
  }
}
