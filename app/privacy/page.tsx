import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Privacy Policy — PostMall",
  description: "How PostMall collects, uses, and protects your data across our AI-powered commerce platform.",
};

export default function PrivacyPage() {
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
          <h1 className="font-heading text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-white/30 mt-2">Last updated: March 26, 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">1. Overview</h2>
          <p>PostMall (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates an AI-powered agentic commerce platform. This policy explains how we collect, use, store, and protect your personal data when you use our services across Ghana, Nigeria, Kenya, and other countries.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">2. Data We Collect</h2>

          <h3 className="font-semibold text-white/90 mt-4">From Sellers:</h3>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>Messaging identifiers (Telegram user ID, WhatsApp phone number)</li>
            <li>Shop name, display name, and business contact details</li>
            <li>Product photos and descriptions</li>
            <li>Payment information (MoMo number or bank account for receiving payments)</li>
            <li>Voice notes (temporarily processed for transcription, not stored)</li>
            <li>Conversation history with Amberlyn (for context and memory)</li>
            <li>Location data (country, city — if provided voluntarily)</li>
          </ul>

          <h3 className="font-semibold text-white/90 mt-4">From Buyers:</h3>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>Name, email, phone number (provided at checkout)</li>
            <li>Delivery address (if provided)</li>
            <li>Payment information (processed by Paystack — we do not store card details)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">3. How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>To provide and improve our AI commerce services</li>
            <li>To process product photos through AI enhancement (Claude, Gemini)</li>
            <li>To generate ad copy and product descriptions</li>
            <li>To process payments and split revenue between sellers and PostMall</li>
            <li>To send order notifications and invoices</li>
            <li>To maintain Amberlyn&apos;s conversation memory for personalized service</li>
            <li>To detect and prevent fraud</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">4. AI Processing</h2>
          <p>Your product photos and messages are processed by:</p>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li><strong className="text-white/70">Claude (Anthropic)</strong> via AWS Bedrock — for product analysis, ad copy, and conversational AI</li>
            <li><strong className="text-white/70">Gemini (Google)</strong> — for AI image enhancement and voice transcription</li>
          </ul>
          <p>These AI providers process data according to their respective privacy policies and data processing agreements. Product photos are stored in AWS S3 (EU-West-1 region). We do not sell your data to third parties.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">5. Data Storage and Security</h2>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>Database: Neon PostgreSQL (EU region) with encryption at rest</li>
            <li>Images: AWS S3 (EU-West-1) with server-side encryption</li>
            <li>Application: AWS App Runner (EU-West-1) with TLS encryption in transit</li>
            <li>Payments: Processed by Paystack — PCI DSS compliant</li>
            <li>Voice notes: Processed in memory only, not permanently stored</li>
          </ul>
          <p>We implement industry-standard security measures including encryption in transit (TLS), encryption at rest, and access controls.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">6. Data Sharing</h2>
          <p>We share data only with:</p>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li><strong className="text-white/70">Paystack</strong> — for payment processing</li>
            <li><strong className="text-white/70">AWS</strong> — for hosting and AI processing (Bedrock, S3)</li>
            <li><strong className="text-white/70">Google AI</strong> — for image enhancement and voice transcription</li>
            <li><strong className="text-white/70">Telegram / WhatsApp</strong> — for message delivery</li>
            <li><strong className="text-white/70">Vercel</strong> — for web hosting</li>
          </ul>
          <p>We do not sell, rent, or trade your personal data. We may disclose data if required by law.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and associated data</li>
            <li>Export your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          <p>To exercise these rights, message Amberlyn on Telegram or email support@postmall.app.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">8. Data Retention</h2>
          <p>We retain your data for as long as your account is active. After account deletion:</p>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>Personal data is deleted within 30 days</li>
            <li>Transaction records are retained for 7 years (legal compliance)</li>
            <li>AI-generated images are deleted within 90 days</li>
            <li>Conversation logs are deleted within 30 days</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">9. International Data Transfers</h2>
          <p>PostMall operates across multiple African countries. Data may be processed in:</p>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>European Union (AWS EU-West-1, Neon EU) — primary infrastructure</li>
            <li>United States — AI model providers (Anthropic, Google)</li>
          </ul>
          <p>We ensure appropriate safeguards are in place for international transfers in compliance with the Ghana Data Protection Act 2012 and applicable regulations in each operating country.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">10. Cookies</h2>
          <p>Our website uses minimal cookies for authentication (JWT tokens stored in localStorage) and essential functionality. We do not use tracking cookies or third-party analytics.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">11. Children&apos;s Privacy</h2>
          <p>PostMall is not intended for users under 18 years of age. We do not knowingly collect data from minors.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">12. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. Material changes will be communicated via Telegram/WhatsApp notification to active users.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">13. Contact</h2>
          <p>For privacy-related questions or data requests:</p>
          <ul className="list-disc list-inside space-y-1 text-white/50">
            <li>Telegram: @postshotai_bot</li>
            <li>Email: privacy@postmall.app</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-white/5 flex gap-6 text-xs text-white/30">
          <Link href="/terms" className="hover:text-white/60 transition">Terms of Service</Link>
          <Link href="/" className="hover:text-white/60 transition">Back to PostMall</Link>
        </div>
      </main>
    </div>
  );
}
