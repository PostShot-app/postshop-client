"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function req(path: string, opts: RequestInit = {}) {
  const token = localStorage.getItem("token") || "";
  return fetch(`${API}${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${token}`, ...opts.headers },
  }).then((r) => r.json());
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    business_email: "",
    business_phone: "",
    business_address: "",
    logo_url: "",
  });

  useEffect(() => {
    req("/api/admin/settings")
      .then((d) => setForm({
        business_email: d.business_email || "",
        business_phone: d.business_phone || "",
        business_address: d.business_address || "",
        logo_url: d.logo_url || "",
      }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true); setSaved(false);
    await req("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const data = await fetch(`${API}/api/admin/upload-logo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        body: formData,
      }).then((r) => r.json());
      if (data.url) {
        setForm((f) => ({ ...f, logo_url: data.url }));
      }
    } catch {}
    setUploading(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-ps-orange border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-[#1A1A1F] dark:text-white">Shop Settings</h1>
        <p className="text-[#6B6B76] dark:text-white/40 text-sm mt-1">Business details shown on invoices</p>
      </div>

      <div className="bg-white dark:bg-ps-dark-card rounded-2xl border border-ps-warm-border dark:border-white/5 p-6 space-y-5">
        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1F] dark:text-white mb-2">Shop Logo</label>
          <div className="flex items-center gap-4">
            {form.logo_url ? (
              <img src={form.logo_url} alt="Logo" className="w-16 h-16 rounded-xl object-contain bg-ps-warm-muted dark:bg-white/5 p-1" />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-ps-warm-muted dark:bg-white/5 flex items-center justify-center text-2xl text-[#6B6B76]">📷</div>
            )}
            <div>
              <label className="inline-block bg-ps-orange/10 text-ps-orange text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer hover:bg-ps-orange/20 transition">
                {uploading ? "Uploading..." : "Upload Logo"}
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
              <p className="text-[10px] text-[#6B6B76] mt-1">PNG, JPG. Max 2MB.</p>
            </div>
          </div>
        </div>

        {/* Business Email */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1F] dark:text-white mb-1">Business Email</label>
          <input value={form.business_email} onChange={(e) => setForm({ ...form, business_email: e.target.value })}
            placeholder="hello@yourshop.com"
            className="w-full h-11 px-4 rounded-xl bg-ps-warm-muted dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/40 outline-none focus:ring-1 focus:ring-ps-orange/50" />
        </div>

        {/* Business Phone */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1F] dark:text-white mb-1">Business Phone</label>
          <input value={form.business_phone} onChange={(e) => setForm({ ...form, business_phone: e.target.value })}
            placeholder="0241234567"
            className="w-full h-11 px-4 rounded-xl bg-ps-warm-muted dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/40 outline-none focus:ring-1 focus:ring-ps-orange/50" />
        </div>

        {/* Business Address */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1F] dark:text-white mb-1">Business Address</label>
          <textarea value={form.business_address} onChange={(e) => setForm({ ...form, business_address: e.target.value })}
            placeholder="123 Market St, Accra"
            rows={2}
            className="w-full px-4 py-3 rounded-xl bg-ps-warm-muted dark:bg-white/5 border border-ps-warm-border dark:border-white/10 text-sm text-[#1A1A1F] dark:text-white placeholder:text-[#6B6B76]/40 outline-none focus:ring-1 focus:ring-ps-orange/50 resize-none" />
        </div>

        <button onClick={handleSave} disabled={saving}
          className={`w-full h-11 rounded-xl font-semibold text-sm transition cursor-pointer ${
            saved ? "bg-green-500 text-white" : "bg-ps-orange text-white hover:bg-ps-orange-dark glow-orange"
          } disabled:opacity-50`}>
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
