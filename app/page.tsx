import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-(--color-ps-warm-white) dark:bg-(--color-ps-dark)">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-ps-dark/90 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="PostShop" width={28} height={28} className="rounded-lg" />
            <span className="font-heading font-bold text-lg text-white">PostShop</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#how" className="text-sm text-white/60 hover:text-white transition hidden sm:block">How it works</a>
            <a href="#pricing" className="text-sm text-white/60 hover:text-white transition hidden sm:block">Pricing</a>
            <Link href="/admin" className="text-sm text-white/60 hover:text-white transition hidden sm:block">Dashboard</Link>
            <a
              href="https://t.me/postshopai_bot"
              className="bg-(--color-ps-orange) text-white text-sm px-5 py-2 rounded-full font-semibold hover:bg-(--color-ps-orange-dark) transition glow-orange"
            >
              Start Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — dark, dramatic */}
      <section className="relative bg-(--color-ps-dark) pt-32 pb-24 overflow-hidden grain">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-ps-orange/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-ps-gold/15 rounded-full blur-[100px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-(--color-ps-gold) text-xs font-semibold px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-(--color-ps-gold) rounded-full animate-pulse" />
                AI-Powered Product Photography
              </span>
            </div>

            <h1 className="animate-fade-up delay-1 font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              Phone photo in.
              <br />
              <span className="bg-linear-to-r from-(--color-ps-orange) to-(--color-ps-gold) bg-clip-text text-transparent animate-shimmer">
                Selling image out.
              </span>
            </h1>

            <p className="animate-fade-up delay-2 text-lg sm:text-xl text-white/50 mt-7 leading-relaxed max-w-xl">
              Send a product photo on WhatsApp or Telegram. Amberlyn, your AI assistant,
              transforms it into a professional lifestyle shot with ad copy — ready to sell.
            </p>

            <div className="animate-fade-up delay-3 flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="https://t.me/postshopai_bot"
                className="group relative bg-(--color-ps-orange) text-white px-8 py-4 rounded-full text-base font-bold hover:bg-(--color-ps-orange-dark) transition-all glow-orange flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.45 3.81-1.6 4.6-1.87 5.12-1.88.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/></svg>
                Start Free on Telegram
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-(--color-ps-dark) animate-pulse" />
              </a>
              <a
                href="#how"
                className="border border-white/15 text-white/80 px-8 py-4 rounded-full text-base font-medium hover:bg-white/5 hover:border-white/25 transition-all flex items-center justify-center gap-2"
              >
                See How It Works
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              </a>
            </div>

            <p className="animate-fade-up delay-4 text-sm text-white/30 mt-5">
              3 free glow-ups. No card required. No downloads.
            </p>
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <div className="bg-(--color-ps-dark) border-t border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 text-sm text-white/30">
          <span>Trusted by sellers across Ghana, Nigeria & Kenya</span>
          <span className="hidden sm:inline">|</span>
          <span>WhatsApp + Telegram</span>
          <span className="hidden sm:inline">|</span>
          <span>MoMo, Card & Bank payments</span>
        </div>
      </div>

      {/* How It Works */}
      <section id="how" className="py-24 bg-(--color-ps-warm-white) dark:bg-(--color-ps-dark)">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-(--color-ps-orange) font-semibold text-sm tracking-wide uppercase">How it works</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#1A1A1F] dark:text-white mt-3 tracking-tight">
              Three steps. Zero skills.
            </h2>
            <p className="text-[#6B6B76] dark:text-white/40 mt-4 max-w-lg mx-auto text-lg">
              No Photoshop. No photographer. Just your phone and Amberlyn.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <StepCard
              num="01"
              title="Send a Photo"
              desc="Snap or forward a product photo to Amberlyn on Telegram or WhatsApp. Any angle, any lighting works."
              gradient="from-ps-orange/10 to-transparent"
            />
            <StepCard
              num="02"
              title="Get a Glow-Up"
              desc="AI transforms your photo into a professional lifestyle shot. Plus ad copy you can forward to customers instantly."
              gradient="from-(--color-ps-gold)/10 to-transparent"
            />
            <StepCard
              num="03"
              title="Sell Automatically"
              desc="Your product goes live on your free shop. Customers pay via MoMo, card, or bank. You get notified instantly."
              gradient="from-green-500/10 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-(--color-ps-warm-muted) dark:bg-(--color-ps-dark-card)">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-(--color-ps-orange) font-semibold text-sm tracking-wide uppercase">Pricing</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#1A1A1F] dark:text-white mt-3 tracking-tight">
              Pay per glow-up
            </h2>
            <p className="text-[#6B6B76] dark:text-white/40 mt-4 text-lg">No subscriptions. No hidden fees. Buy credits, use anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <PriceCard name="Starter" credits={10} price="$7" per="$0.70" />
            <PriceCard name="Pro" credits={30} price="$18" per="$0.60" popular />
            <PriceCard name="Business" credits={100} price="$50" per="$0.50" />
          </div>

          <p className="text-center text-sm text-[#6B6B76] dark:text-white/30 mt-8">
            Your shop is always free. We take 5% only when you make a sale.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-(--color-ps-dark) overflow-hidden grain">
        <div className="absolute inset-0 bg-linear-to-br from-ps-orange/10 via-transparent to-ps-gold/10" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to glow up
            <br />your products?
          </h2>
          <p className="text-white/40 mt-5 text-lg">
            Join sellers turning WhatsApp photos into professional selling machines.
          </p>
          <a
            href="https://t.me/postshopai_bot"
            className="inline-flex items-center gap-2 mt-8 bg-(--color-ps-orange) text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-(--color-ps-orange-dark) transition-all glow-orange"
          >
            Start Free on Telegram
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-(--color-ps-dark) border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="PostShop" width={24} height={24} className="rounded-lg" />
              <span className="font-heading font-bold text-white/80">PostShop</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/30">
              <a href="#how" className="hover:text-white/60 transition">How it works</a>
              <a href="#pricing" className="hover:text-white/60 transition">Pricing</a>
              <Link href="/admin" className="hover:text-white/60 transition">Dashboard</Link>
            </div>
            <span className="text-sm text-white/20">Built with AI. Powered by ambition.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({ num, title, desc, gradient }: { num: string; title: string; desc: string; gradient: string }) {
  return (
    <div className={`relative bg-white dark:bg-(--color-ps-dark-card) rounded-2xl p-8 shadow-warm hover:shadow-warm-lg transition-all duration-300 group border border-(--color-ps-warm-border) dark:border-white/5 overflow-hidden`}>
      <div className={`absolute inset-0 bg-linear-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative">
        <span className="font-heading text-5xl font-extrabold text-(--color-ps-warm-border) dark:text-white/5 block mb-4 group-hover:text-ps-orange/20 transition-colors">{num}</span>
        <h3 className="font-heading text-xl font-bold text-[#1A1A1F] dark:text-white">{title}</h3>
        <p className="text-[#6B6B76] dark:text-white/40 mt-3 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function PriceCard({ name, credits, price, per, popular }: {
  name: string; credits: number; price: string; per: string; popular?: boolean;
}) {
  return (
    <div className={`relative rounded-2xl p-8 transition-all duration-300 ${
      popular
        ? "bg-(--color-ps-dark) dark:bg-white text-white dark:text-[#1A1A1F] ring-2 ring-ps-orange shadow-warm-lg scale-[1.02]"
        : "bg-white dark:bg-(--color-ps-dark-card) border border-(--color-ps-warm-border) dark:border-white/5 shadow-warm hover:shadow-warm-lg"
    }`}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-(--color-ps-orange) text-white text-xs font-bold px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className={`font-heading text-lg font-bold ${popular ? "" : "text-[#1A1A1F] dark:text-white"}`}>{name}</h3>
      <div className={`font-heading text-5xl font-extrabold mt-3 ${popular ? "" : "text-[#1A1A1F] dark:text-white"}`}>{price}</div>
      <p className={`text-sm mt-2 ${popular ? "text-white/50 dark:text-[#6B6B76]" : "text-[#6B6B76] dark:text-white/40"}`}>
        {credits} credits &middot; {per}/image
      </p>
      <a
        href="https://t.me/postshopai_bot"
        className={`mt-6 block py-3 rounded-xl font-semibold text-sm text-center transition-all ${
          popular
            ? "bg-(--color-ps-orange) text-white hover:bg-(--color-ps-orange-dark) glow-orange"
            : "bg-(--color-ps-warm-muted) dark:bg-white/5 text-[#1A1A1F] dark:text-white hover:bg-(--color-ps-warm-border) dark:hover:bg-white/10"
        }`}
      >
        Get Started
      </a>
    </div>
  );
}
