import { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | The AI Tokens",
  description: "Privacy policy for The AI Tokens - how we collect, use, and protect your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you use our token calculator, 
              subscribe to our newsletter, or contact us for support.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Usage data and analytics through Google Analytics</li>
              <li>Text input for token counting (processed locally, not stored)</li>
              <li>Email addresses for newsletter subscriptions (optional)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and improve our services</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Respond to your questions and support requests</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information. 
              Token counting is performed client-side in your browser, and we do not store 
              the text you input for analysis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="mb-4">We use the following third-party services:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Google Analytics:</strong> For website analytics and usage tracking</li>
              <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
              <li><strong>Vercel:</strong> For hosting and performance analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience, 
              analyze usage, and serve personalized advertisements through Google AdSense.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-4">
              Email: theaitokens@gmail.com
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}