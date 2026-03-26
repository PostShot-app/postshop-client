import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Terms of Service — PostMall",
  description: "Terms and conditions for using PostMall's agentic commerce platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ps-dark">
      <nav className="border-b border-white/5 py-4 px-6">
        <Link href="/" className="flex items-center gap-2 max-w-4xl mx-auto">
          <Image src="/logo.png" alt="PostMall" width={24} height={24} className="rounded-md" />
          <span className="font-heading font-bold text-white text-sm">PostMall</span>
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 text-white/70 text-sm leading-relaxed space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-white/30 mt-2">Last updated: March 26, 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>By accessing or using PostMall (&quot;the Platform&quot;), including our AI assistant Amberlyn, website, storefronts, and messaging integrations (WhatsApp, Telegram), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">2. Description of Service</h2>
          <p>PostMall is an AI-powered agentic commerce platform that enables sellers to create and manage online storefronts through conversational AI. Services include:</p>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>AI-enhanced product photography and ad copy generation</li>
            <li>Automated storefront creation and management</li>
            <li>Order processing and payment collection via Paystack</li>
            <li>Invoice generation and delivery notifications</li>
            <li>AI agent (Amberlyn) for conversational store management</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">3. Accounts and Registration</h2>
          <p>Accounts are created automatically when you interact with PostMall via WhatsApp or Telegram. You are responsible for maintaining the security of your messaging accounts. Each seller may operate one storefront per account.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">4. Credits and Payments</h2>
          <p>AI product photography requires credits. Credits are purchased via Paystack in Ghanaian Cedis (GHS). Credits are non-refundable once used. Unused credits do not expire. Pricing is subject to change with 30 days notice.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">5. Storefront Commission</h2>
          <p>PostMall charges a 5% commission on all sales made through seller storefronts. Payment is automatically split: 95% goes to the seller&apos;s designated payment method (MoMo, bank account), and 5% is retained by PostMall. Paystack processing fees are deducted from PostMall&apos;s 5% commission.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">6. Seller Responsibilities</h2>
          <p>Sellers are responsible for:</p>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>Accuracy of product listings, prices, and stock levels</li>
            <li>Fulfillment and delivery of orders to buyers</li>
            <li>Compliance with local consumer protection laws</li>
            <li>Not selling prohibited, illegal, or counterfeit goods</li>
            <li>Handling customer disputes and refunds</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">7. AI-Generated Content</h2>
          <p>Product images and ad copy are generated using artificial intelligence (Claude by Anthropic and Gemini by Google). While we strive for accuracy, AI-generated content may occasionally contain errors. Sellers should review all generated content before publishing. PostMall is not liable for inaccuracies in AI-generated descriptions.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">8. Intellectual Property</h2>
          <p>Sellers retain ownership of their original product photos. AI-enhanced images and generated content are licensed to the seller for commercial use on PostMall and their own marketing channels. PostMall retains the right to use anonymized examples for marketing purposes.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">9. Termination</h2>
          <p>PostMall may suspend or terminate accounts that violate these terms, engage in fraudulent activity, or sell prohibited goods. Sellers may close their accounts at any time by contacting Amberlyn. Remaining credit balances at the time of closure are non-refundable.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">10. Limitation of Liability</h2>
          <p>PostMall is provided &quot;as is&quot; without warranties of any kind. We are not liable for lost revenue, failed transactions, AI errors, or service interruptions. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">11. Governing Law</h2>
          <p>These terms are governed by the laws of the Republic of Ghana. Disputes shall be resolved through arbitration in Accra, Ghana. PostMall operates across multiple African countries and complies with applicable local regulations in each jurisdiction.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">12. Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of the Platform after changes constitutes acceptance. Material changes will be communicated via Telegram/WhatsApp notification.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">13. Contact</h2>
          <p>For questions about these terms, contact us via Telegram at @postshotai_bot or email support@postmall.app.</p>
        </section>

        <div className="pt-8 border-t border-white/5 flex gap-6 text-xs text-white/30">
          <Link href="/privacy" className="hover:text-white/60 transition">Privacy Policy</Link>
          <Link href="/" className="hover:text-white/60 transition">Back to PostMall</Link>
        </div>
      </main>
    </div>
  );
}
