import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="PostShot" width={32} height={32} className="rounded" />
          <span className="font-bold text-lg text-zinc-900">PostShot</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/admin" className="text-sm text-zinc-600 hover:text-zinc-900 transition">Dashboard</a>
          <a
            href="https://wa.me/YOUR_BOT_NUMBER"
            className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Start on WhatsApp
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="max-w-2xl">
          <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
            AI-Powered Product Photography
          </div>
          <h1 className="text-5xl font-bold text-zinc-900 leading-tight">
            Turn phone photos into
            <span className="text-indigo-600"> professional product images</span>
          </h1>
          <p className="text-xl text-zinc-500 mt-6 leading-relaxed">
            Send a photo on WhatsApp. Get back a stunning lifestyle shot + ad copy
            ready to sell. Your free online shop is created automatically.
          </p>
          <div className="flex gap-4 mt-8">
            <a
              href="https://wa.me/YOUR_BOT_NUMBER"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-indigo-700 transition"
            >
              Start Free on WhatsApp
            </a>
            <a
              href="#how"
              className="border border-zinc-200 text-zinc-700 px-6 py-3 rounded-full text-base font-medium hover:bg-zinc-50 transition"
            >
              See How It Works
            </a>
          </div>
          <p className="text-sm text-zinc-400 mt-4">3 free glow-ups to start. No card required.</p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-zinc-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-zinc-900 text-center">How PostShot Works</h2>
          <p className="text-zinc-500 text-center mt-2 mb-12">Three steps. Zero skills required.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <Step num="1" title="Send a Photo" desc="Forward or snap a product photo to Amberlyn on WhatsApp or Telegram. Any angle, any lighting." />
            <Step num="2" title="Get a Glow-Up" desc="AI transforms your photo into a professional lifestyle shot. Plus ad copy you can forward to customers instantly." />
            <Step num="3" title="Sell Automatically" desc="Your product goes live on your free PostShot shop. Customers pay via MoMo, card, or bank. You get notified." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-zinc-900 text-center">Simple Pricing</h2>
          <p className="text-zinc-500 text-center mt-2 mb-12">Pay per glow-up. No subscriptions.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <PriceCard name="Starter" credits={10} price="$7" per="$0.70" />
            <PriceCard name="Pro" credits={30} price="$18" per="$0.60" popular />
            <PriceCard name="Business" credits={100} price="$50" per="$0.50" />
          </div>
          <p className="text-center text-sm text-zinc-400 mt-6">
            Your shop is always free. We take 5% only when you make a sale.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to glow up your products?</h2>
          <p className="text-indigo-200 mt-3">
            Join sellers who are turning WhatsApp photos into professional selling machines.
          </p>
          <a
            href="https://wa.me/YOUR_BOT_NUMBER"
            className="inline-block mt-6 bg-white text-indigo-600 px-8 py-3 rounded-full font-medium hover:bg-zinc-100 transition"
          >
            Start Free on WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="PostShot" width={20} height={20} className="rounded" />
            PostShot
          </div>
          <span>Built with AI. Powered by ambition.</span>
        </div>
      </footer>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mx-auto">
        {num}
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 mt-4">{title}</h3>
      <p className="text-zinc-500 mt-2">{desc}</p>
    </div>
  );
}

function PriceCard({ name, credits, price, per, popular }: {
  name: string; credits: number; price: string; per: string; popular?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-6 text-center ${popular ? "border-indigo-600 ring-2 ring-indigo-100" : "border-zinc-200"}`}>
      {popular && <div className="text-xs font-medium text-indigo-600 mb-2">Most Popular</div>}
      <h3 className="text-lg font-semibold text-zinc-900">{name}</h3>
      <div className="text-3xl font-bold text-zinc-900 mt-2">{price}</div>
      <p className="text-zinc-500 text-sm mt-1">{credits} credits ({per}/image)</p>
      <a
        href="https://wa.me/YOUR_BOT_NUMBER"
        className={`mt-4 block py-2 rounded-full font-medium text-sm transition ${
          popular ? "bg-indigo-600 text-white hover:bg-indigo-700" : "border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
        }`}
      >
        Get Started
      </a>
    </div>
  );
}
