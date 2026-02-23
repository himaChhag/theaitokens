import { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "About | The AI Tokens",
  description: "Learn about The AI Tokens - your comprehensive resource for AI token counting, cost calculation, and pricing comparison.",
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About | The AI Tokens",
    description: "Learn about The AI Tokens - your comprehensive resource for AI token counting, cost calculation, and pricing comparison.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">About The AI Tokens</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              The AI Tokens is dedicated to providing developers, businesses, and AI enthusiasts 
              with accurate, up-to-date information about AI model pricing and token usage. 
              We believe in transparency and helping users make informed decisions about their AI investments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Token Counter</h3>
                <p>
                  Accurate token counting using provider-native tokenizers for 45+ AI models 
                  from major providers including OpenAI, Anthropic, Google, and more.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Cost Calculator</h3>
                <p>
                  Real-time cost calculations with verified pricing data, helping you 
                  budget and optimize your AI usage across different providers.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Model Comparison</h3>
                <p>
                  Side-by-side comparisons of AI models, their capabilities, pricing, 
                  and performance characteristics to help you choose the right model.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
                <p>
                  Comprehensive guides and tutorials about AI tokens, pricing strategies, 
                  and best practices for cost optimization.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Supported Providers</h2>
            <p className="mb-4">We currently support models from these major AI providers:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <strong>OpenAI</strong>
                <p className="text-sm text-gray-600">GPT-4, GPT-3.5, GPT-4o</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <strong>Anthropic</strong>
                <p className="text-sm text-gray-600">Claude 3.5, Claude 3</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <strong>Google</strong>
                <p className="text-sm text-gray-600">Gemini Pro, Gemini Flash</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <strong>Meta</strong>
                <p className="text-sm text-gray-600">Llama 3.1, Llama 3.2</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <strong>xAI</strong>
                <p className="text-sm text-gray-600">Grok-2, Grok-beta</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <strong>Cohere</strong>
                <p className="text-sm text-gray-600">Command R+, Command R</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose The AI Tokens?</h2>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Accuracy:</strong> We use provider-native tokenizers for precise token counts</li>
              <li><strong>Up-to-date:</strong> Regular updates to pricing and model information</li>
              <li><strong>Comprehensive:</strong> Support for 45+ models across 9 major providers</li>
              <li><strong>Free:</strong> All tools and resources are completely free to use</li>
              <li><strong>Privacy-focused:</strong> Token counting happens in your browser, we don't store your data</li>
              <li><strong>Developer-friendly:</strong> Built by developers, for developers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <p className="mb-4">
              We're committed to maintaining the most accurate and comprehensive AI pricing 
              database available. Our team continuously monitors provider updates, new model 
              releases, and pricing changes to ensure you have the latest information.
            </p>
            <p className="mb-4">
              Whether you're a startup optimizing costs, an enterprise planning AI budgets, 
              or a developer exploring different models, The AI Tokens provides the tools 
              and insights you need to make informed decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              Have questions, suggestions, or found an error? We'd love to hear from you:
            </p>
            <p className="mb-4">
              Email: theaitokens@gmail.com<br />
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}