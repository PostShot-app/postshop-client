"use client";

import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function InvoicePage() {
  const params = useParams();
  const id = params.id;

  return (
    <iframe
      src={`${API}/invoice/${id}`}
      className="w-full min-h-screen border-0"
      title="Invoice"
    />
  );
}
