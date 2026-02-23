import { Metadata } from "next";
import Container from "@/components/layout/Container";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | The AI Tokens",
  description:
    "Get in touch with The AI Tokens team. We're here to help with questions about AI token counting, pricing, and our platform.",
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact Us | The AI Tokens",
    description:
      "Get in touch with The AI Tokens team. We're here to help with questions about AI token counting, pricing, and our platform.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="text-xl text-gray-600 mb-8">
              Have questions about AI token counting, pricing, or our platform?
              We'd love to hear from you and help however we can.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <a
                    href="mailto:theaitokens@gmail.com"
                    className="text-blue-600 hover:underline text-lg"
                  >
                    theaitokens@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Response Time</h3>
                  <p className="text-gray-600">
                    We typically respond within 24-48 hours during business
                    days.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                What We Can Help With
              </h2>
              <ul>
                <li className="flex items-start mb-4">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Questions about token counting accuracy</span>
                </li>
                <li className="flex items-start mb-4">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Pricing information and updates</span>
                </li>
                <li className="flex items-start mb-4">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Feature requests and suggestions</span>
                </li>
                <li className="flex items-start mb-4">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Technical support and bug reports</span>
                </li>
                <li className="flex items-start mb-4">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Partnership and collaboration inquiries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Media and press inquiries</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-8">
            <ContactForm />
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">
                  How accurate are your token counts?
                </h3>
                <p className="text-gray-600">
                  We use provider-native tokenizers for maximum accuracy. Our
                  token counts match the official tokenizers used by OpenAI,
                  Anthropic, Google, and other providers.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">
                  How often do you update pricing information?
                </h3>
                <p className="text-gray-600">
                  We monitor provider announcements and update pricing
                  information as soon as changes are announced. Most updates
                  happen within 24-48 hours of official announcements.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">
                  Can you add support for a new AI provider?
                </h3>
                <p className="text-gray-600">
                  Yes! We're always looking to expand our coverage. Send us
                  details about the provider, their models, and pricing, and
                  we'll evaluate adding them to our platform.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-2">
                  Do you store the text I input for token counting?
                </h3>
                <p className="text-gray-600">
                  No, all token counting happens locally in your browser. We
                  never see or store the text you input for analysis.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Email?</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-4">
                We prefer direct communication via email because it allows us
                to:
              </p>
              <ul>
                <li className="flex items-start mb-4">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Provide detailed, personalized responses</span>
                </li>
                <li className="flex items-start mb-4">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Keep a record of our conversation for follow-up</span>
                </li>
                <li className="flex items-start mb-4">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>
                    Share screenshots, code snippets, or detailed explanations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>
                    Ensure your questions get the attention they deserve
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-blue-600 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to Get Started?
            </h2>
            <p className="mb-4">
              Try our free AI token counter and cost calculator to optimize your
              AI usage and budget.
            </p>
            <a
              href="/tools/token-counter"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Counting Tokens
            </a>
          </section>
        </div>
      </div>
    </Container>
  );
}
