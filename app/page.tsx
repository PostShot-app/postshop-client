import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-ps-dark">
      {/* Nav — crisp floating bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
        <div className="grid grid-cols-3 items-center h-12 px-5 rounded-2xl bg-white/3 backdrop-blur-2xl border border-white/6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="PostMall" width={22} height={22} className="rounded-md" />
            <span className="font-heading font-bold text-white text-sm">PostMall</span>
          </div>
          <div className="hidden sm:flex items-center justify-center gap-1">
            <a href="#how" className="text-[13px] text-white/40 hover:text-white px-3 py-1 rounded-lg hover:bg-white/5 transition">Product</a>
            <a href="#pricing" className="text-[13px] text-white/40 hover:text-white px-3 py-1 rounded-lg hover:bg-white/5 transition">Pricing</a>
            <a href="#features" className="text-[13px] text-white/40 hover:text-white px-3 py-1 rounded-lg hover:bg-white/5 transition">Features</a>
          </div>
          <div className="flex items-center justify-end">
            <a href="https://t.me/postshotai_bot"
              className="bg-ps-orange text-white text-xs px-4 py-1.5 rounded-xl font-semibold hover:bg-ps-orange-dark transition">
              Meet Amberlyn
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — fits in viewport with floating social proof */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden grain">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-ps-orange/15 rounded-full blur-[128px]" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-ps-gold/10 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="max-w-xl lg:max-w-2xl">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-ps-gold text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-ps-gold rounded-full animate-pulse" />
                Your AI Store Manager
              </span>
            </div>

            <h1 className="animate-fade-up delay-1 font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
              She runs your shop.
              <br />
              <span className="bg-linear-to-r from-ps-orange to-ps-gold bg-clip-text text-transparent animate-shimmer">
                You run your life.
              </span>
            </h1>

            <p className="animate-fade-up delay-2 text-base sm:text-lg text-white/50 mt-5 leading-relaxed max-w-md">
              Meet Amberlyn — an AI agent that manages your entire online store.
              Products, pricing, orders, invoices, checkout. Just chat.
            </p>

            <div className="animate-fade-up delay-3 flex flex-col sm:flex-row gap-3 mt-7">
              <a
                href="https://t.me/postshotai_bot"
                className="group relative bg-ps-orange text-white px-7 py-3.5 rounded-2xl text-sm font-bold hover:bg-ps-orange-dark transition-all glow-orange flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.45 3.81-1.6 4.6-1.87 5.12-1.88.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/></svg>
                Start Free on Telegram
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-ps-dark animate-pulse" />
              </a>
              <a
                href="#how"
                className="border border-white/10 text-white/70 px-7 py-3.5 rounded-2xl text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                See How It Works
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              </a>
            </div>

            <p className="animate-fade-up delay-4 text-xs text-white/25 mt-4">
              Free shop. Free agent. No downloads. No tech skills needed.
            </p>
          </div>

          {/* iPhone mockup — right side */}
          <div className="hidden lg:block animate-fade-up delay-3 shrink-0">
            <div className="relative">
              <img
                src="/hero-iphone.png"
                alt="Amberlyn AI assistant on iPhone"
                className="w-72 xl:w-80 drop-shadow-2xl"
              />
              {/* Glow behind the phone */}
              <div className="absolute inset-0 -z-10 bg-ps-orange/10 rounded-full blur-[80px] scale-75" />
            </div>
          </div>
        </div>

        {/* Floating social proof bar — embossed, sits at bottom of hero */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-3xl animate-fade-up delay-5">
          <div className="flex items-center justify-center gap-6 sm:gap-10 px-6 py-3 rounded-2xl bg-white/2 border border-white/4 backdrop-blur-sm">
            <span className="text-[11px] sm:text-xs font-medium tracking-wide uppercase" style={{color: 'rgba(255,255,255,0.12)', textShadow: '0 1px 0 rgba(255,255,255,0.05)'}}>
              Ghana &middot; Nigeria &middot; Kenya
            </span>
            <span className="w-px h-3 bg-white/6" />
            <span className="text-[11px] sm:text-xs font-medium tracking-wide uppercase" style={{color: 'rgba(255,255,255,0.12)', textShadow: '0 1px 0 rgba(255,255,255,0.05)'}}>
              WhatsApp + Telegram
            </span>
            <span className="w-px h-3 bg-white/6 hidden sm:block" />
            <span className="text-[11px] sm:text-xs font-medium tracking-wide uppercase hidden sm:block" style={{color: 'rgba(255,255,255,0.12)', textShadow: '0 1px 0 rgba(255,255,255,0.05)'}}>
              MoMo &middot; Card &middot; Bank
            </span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-ps-orange font-semibold text-sm tracking-wide uppercase">How it works</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Chat to sell. That&apos;s it.
            </h2>
            <p className="text-white/40 mt-4 max-w-lg mx-auto text-lg">
              No apps to install. No dashboards to learn. Just message Amberlyn like you would a business partner.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <StepCard
              num="01"
              title="Send Your Products"
              desc="Forward product photos to Amberlyn. She identifies each item, names it, categorizes it, and creates a professional listing — automatically."
            />
            <StepCard
              num="02"
              title="She Builds Your Shop"
              desc="Amberlyn sets up your online store, processes AI-enhanced product images, writes selling copy, and publishes everything. You just set prices."
            />
            <StepCard
              num="03"
              title="Customers Buy. You Get Paid."
              desc="Buyers find your shop, pay with MoMo or card. Amberlyn notifies you instantly, generates invoices, and tracks your stock in real time."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-ps-dark-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-ps-orange font-semibold text-sm tracking-wide uppercase">What Amberlyn does</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">
              An entire team. One chat.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Feature icon="📸" title="Product Photography" desc="AI transforms phone photos into professional lifestyle shots that sell." />
            <Feature icon="✍️" title="Ad Copy Writer" desc="Generates compelling product descriptions sellers can forward to customers instantly." />
            <Feature icon="🏪" title="Free Online Shop" desc="Auto-generated storefront with your branding, logo, and product catalog." />
            <Feature icon="💳" title="Checkout & Payments" desc="MoMo, card, and bank transfer. Money goes straight to your account. 95/5 split." />
            <Feature icon="🧾" title="Invoices & Orders" desc="Auto-generated invoices for every sale. Full order tracking for you and your buyers." />
            <Feature icon="📦" title="Stock Management" desc="Real-time inventory that updates when sales happen. Amberlyn alerts you when stock is low." />
            <Feature icon="🎙️" title="Voice Commands" desc="Send a voice note with pricing instructions. Amberlyn understands and acts." />
            <Feature icon="🧠" title="Super Memory" desc="Remembers your preferences, currency, style, and customers. Gets smarter with every message." />
            <Feature icon="📊" title="Business Dashboard" desc="Web dashboard for deep analytics, product editing, and settings — login via one tap." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-ps-orange font-semibold text-sm tracking-wide uppercase">Pricing</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mt-3 tracking-tight">
              Your shop is free. Forever.
            </h2>
            <p className="text-white/40 mt-4 text-lg">Credits power AI product photography. Your storefront costs nothing.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <PriceCard name="Starter" credits={10} price="GHS 84" per="GHS 8.40" />
            <PriceCard name="Pro" credits={30} price="GHS 216" per="GHS 7.20" popular />
            <PriceCard name="Business" credits={100} price="GHS 600" per="GHS 6.00" />
          </div>

          <p className="text-center text-sm text-white/30 mt-8">
            5% commission on sales only. No monthly fees. No hidden charges.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden grain">
        <div className="absolute inset-0 bg-linear-to-br from-ps-orange/10 via-transparent to-ps-gold/10" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your AI store manager
            <br />is waiting.
          </h2>
          <p className="text-white/40 mt-5 text-lg">
            Send &ldquo;hello&rdquo; to Amberlyn. She&apos;ll have your shop live in under 2 minutes.
          </p>
          <a
            href="https://t.me/postshotai_bot"
            className="inline-flex items-center gap-2 mt-8 bg-ps-orange text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-ps-orange-dark transition-all glow-orange"
          >
            Meet Amberlyn
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="PostMall" width={24} height={24} className="rounded-lg" />
              <span className="font-heading font-bold text-white/80">PostMall</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/30">
              <a href="#how" className="hover:text-white/60 transition">How it works</a>
              <a href="#features" className="hover:text-white/60 transition">Features</a>
              <a href="#pricing" className="hover:text-white/60 transition">Pricing</a>
            </div>
            <span className="text-sm text-white/20">Agentic commerce. Built in Africa.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="relative bg-ps-dark-card rounded-2xl p-8 shadow-warm hover:shadow-warm-lg transition-all duration-300 group border border-white/5 overflow-hidden">
      <div className="relative">
        <span className="font-heading text-5xl font-extrabold text-white/5 block mb-4 group-hover:text-ps-orange/20 transition-colors">{num}</span>
        <h3 className="font-heading text-xl font-bold text-white">{title}</h3>
        <p className="text-white/40 mt-3 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white/3 rounded-2xl p-6 border border-white/5 hover:border-ps-orange/20 transition group">
      <span className="text-2xl">{icon}</span>
      <h3 className="font-heading font-bold text-white mt-3 group-hover:text-ps-orange transition">{title}</h3>
      <p className="text-white/40 text-sm mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}

function PriceCard({ name, credits, price, per, popular }: {
  name: string; credits: number; price: string; per: string; popular?: boolean;
}) {
  return (
    <div className={`relative rounded-2xl p-8 transition-all duration-300 ${
      popular
        ? "bg-white text-ps-dark ring-2 ring-ps-orange shadow-warm-lg scale-[1.02]"
        : "bg-ps-dark-card border border-white/5 shadow-warm hover:shadow-warm-lg"
    }`}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ps-orange text-white text-xs font-bold px-4 py-1 rounded-full">
          Best Value
        </span>
      )}
      <h3 className={`font-heading text-lg font-bold ${popular ? "" : "text-white"}`}>{name}</h3>
      <div className={`font-heading text-4xl font-extrabold mt-3 ${popular ? "" : "text-white"}`}>{price}</div>
      <p className={`text-sm mt-2 ${popular ? "text-ps-dark/50" : "text-white/40"}`}>
        {credits} credits &middot; {per}/image
      </p>
      <a
        href="https://t.me/postshotai_bot"
        className={`mt-6 block py-3 rounded-xl font-semibold text-sm text-center transition-all cursor-pointer ${
          popular
            ? "bg-ps-orange text-white hover:bg-ps-orange-dark glow-orange"
            : "bg-white/5 text-white hover:bg-white/10"
        }`}
      >
        Get Started
      </a>
    </div>
  );
}
