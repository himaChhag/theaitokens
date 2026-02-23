import { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms of Service | The AI Tokens",
  description: "Terms of service for The AI Tokens - rules and guidelines for using our platform.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Independence Disclaimer</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <p className="mb-4">
                <strong>Important:</strong> The AI Tokens is an independent website created out of personal interest 
                and is not affiliated, associated, authorized, endorsed by, or in any way officially 
                connected with OpenAI, Anthropic, Google, Meta, xAI, Cohere, or any other AI provider 
                mentioned on this site.
              </p>
              <p className="mb-4">
                All company names, product names, and logos are trademarks or registered trademarks 
                of their respective owners. This website is maintained as a personal project to help 
                the AI community with token counting and cost calculations.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using The AI Tokens website and services, you accept and agree 
              to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily use The AI Tokens for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <p className="mb-4">Under this license you may not:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes or public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
            <p className="mb-4">
              The AI Tokens provides token counting and cost calculation tools for various AI models. 
              Our services include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Token counting for 45+ AI models</li>
              <li>Cost calculation and pricing comparison</li>
              <li>Educational content about AI tokens and pricing</li>
              <li>Budget planning tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Accuracy Disclaimer</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
              <p className="mb-4">
                <strong>No Guarantee of Accuracy:</strong> While we strive for accuracy in our token counts and pricing information, 
                we cannot guarantee 100% accuracy of any information provided on this website. All data is maintained 
                on a best-efforts basis as a personal project.
              </p>
              <p className="mb-4">
                <strong>Information Updates:</strong> Pricing, model specifications, and availability may change 
                without notice from the respective AI providers. We attempt to keep information current but 
                cannot guarantee real-time accuracy.
              </p>
              <p className="mb-4">
                <strong>Use at Your Own Risk:</strong> Always verify costs, specifications, and availability 
                with the official provider before making significant financial decisions or business commitments.
              </p>
              <p>
                <strong>Best Efforts Only:</strong> This website is maintained as a personal project on a 
                best-efforts basis. We are not responsible for any losses, damages, or issues arising from 
                the use of information provided on this site.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
            <p className="mb-4">You may not use our service:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>For any unlawful purpose or to solicit others to unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall The AI Tokens or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to 
              business interruption) arising out of the use or inability to use the materials 
              on The AI Tokens website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
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