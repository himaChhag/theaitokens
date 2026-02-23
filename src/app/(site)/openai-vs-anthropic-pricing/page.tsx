import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "OpenAI vs Anthropic Pricing | GPT vs Claude Cost Comparison 2026",
  description: "Compare OpenAI and Anthropic pricing. GPT-5 vs Claude costs, features, and capabilities. Find the best AI model for your budget and use case.",
  keywords: "OpenAI vs Anthropic pricing, GPT vs Claude cost, AI model comparison, OpenAI pricing, Anthropic pricing",
};

export default function OpenAIvsAnthropicPricingPage() {
  return (
    <Container>
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            OpenAI vs Anthropic Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Complete cost comparison between OpenAI's GPT models and Anthropic's Claude models
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-900 mb-4">OpenAI GPT Models</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">GPT-5.2</span>
                <span className="text-green-700">$1.75 / $14.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">GPT-5.1</span>
                <span className="text-green-700">$1.25 / $10.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">GPT-5</span>
                <span className="text-green-700">$1.25 / $10.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">GPT-5 mini</span>
                <span className="text-green-700">$0.25 / $2.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">GPT-4o</span>
                <span className="text-green-700">$2.50 / $10.00</span>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">Prices per 1M tokens (input / output)</p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">Anthropic Claude Models</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Claude Opus 4.6</span>
                <span className="text-purple-700">$5.00 / $25.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Claude Sonnet 4.6</span>
                <span className="text-purple-700">$3.00 / $15.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Claude Haiku 4.5</span>
                <span className="text-purple-700">$1.00 / $5.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Claude Haiku 3.5</span>
                <span className="text-purple-700">$0.80 / $4.00</span>
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-4">Prices per 1M tokens (input / output)</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Direct Model Comparisons</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tier</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">OpenAI</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Anthropic</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Budget</td>
                  <td className="px-4 py-3 text-sm text-gray-600">GPT-5 mini ($0.25)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Claude Haiku 3.5 ($0.80)</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-medium">OpenAI</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Mid-Range</td>
                  <td className="px-4 py-3 text-sm text-gray-600">GPT-5 ($1.25)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Claude Haiku 4.5 ($1.00)</td>
                  <td className="px-4 py-3 text-sm text-purple-600 font-medium">Anthropic</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Premium</td>
                  <td className="px-4 py-3 text-sm text-gray-600">GPT-5.2 ($1.75)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Claude Sonnet 4.6 ($3.00)</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-medium">OpenAI</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Flagship</td>
                  <td className="px-4 py-3 text-sm text-gray-600">GPT-5.2 ($1.75)</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Claude Opus 4.6 ($5.00)</td>
                  <td className="px-4 py-3 text-sm text-green-600 font-medium">OpenAI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <Estimator />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>OpenAI vs Anthropic: Complete Comparison</h2>
          
          <h3>Pricing Philosophy</h3>
          <ul>
            <li><strong>OpenAI:</strong> Competitive pricing across all tiers, focus on accessibility</li>
            <li><strong>Anthropic:</strong> Premium pricing for superior safety and reasoning</li>
          </ul>
          
          <h3>Model Strengths</h3>
          
          <h4>OpenAI Advantages</h4>
          <ul>
            <li><strong>Cost Efficiency:</strong> Generally lower prices across all model tiers</li>
            <li><strong>Model Variety:</strong> 5 GPT-5 variants from nano to flagship</li>
            <li><strong>Multimodal:</strong> Native vision, audio, and image capabilities</li>
            <li><strong>Ecosystem:</strong> Extensive integrations and developer tools</li>
            <li><strong>Speed:</strong> Generally faster response times</li>
          </ul>
          
          <h4>Anthropic Advantages</h4>
          <ul>
            <li><strong>Safety:</strong> Constitutional AI with superior safety guardrails</li>
            <li><strong>Reasoning:</strong> Better performance on complex analytical tasks</li>
            <li><strong>Context:</strong> 200K context window across all models</li>
            <li><strong>Transparency:</strong> More honest about limitations and uncertainties</li>
            <li><strong>Research Focus:</strong> Strong performance on academic and research tasks</li>
          </ul>
          
          <h3>Use Case Recommendations</h3>
          
          <h4>Choose OpenAI When:</h4>
          <ul>
            <li>Budget is a primary concern</li>
            <li>You need multimodal capabilities (vision, audio)</li>
            <li>Building consumer applications or chatbots</li>
            <li>Speed and response time are critical</li>
            <li>You want extensive ecosystem integrations</li>
          </ul>
          
          <h4>Choose Anthropic When:</h4>
          <ul>
            <li>Safety and ethical AI are priorities</li>
            <li>You need superior reasoning for complex tasks</li>
            <li>Working on research or academic projects</li>
            <li>Processing long documents (200K context)</li>
            <li>Quality is more important than cost</li>
          </ul>
          
          <h3>Cost Analysis by Usage Pattern</h3>
          
          <h4>Light Usage (10K tokens/day)</h4>
          <ul>
            <li><strong>OpenAI GPT-5 mini:</strong> ~$0.75/month</li>
            <li><strong>Anthropic Claude Haiku 3.5:</strong> ~$2.40/month</li>
            <li><strong>Winner:</strong> OpenAI (3x cheaper)</li>
          </ul>
          
          <h4>Medium Usage (100K tokens/day)</h4>
          <ul>
            <li><strong>OpenAI GPT-5:</strong> ~$37.50/month</li>
            <li><strong>Anthropic Claude Haiku 4.5:</strong> ~$30/month</li>
            <li><strong>Winner:</strong> Anthropic (20% cheaper)</li>
          </ul>
          
          <h4>Heavy Usage (1M tokens/day)</h4>
          <ul>
            <li><strong>OpenAI GPT-5.2:</strong> ~$525/month</li>
            <li><strong>Anthropic Claude Sonnet 4.6:</strong> ~$900/month</li>
            <li><strong>Winner:</strong> OpenAI (42% cheaper)</li>
          </ul>
          
          <h3>Hybrid Strategy</h3>
          <p>
            Many organizations use both providers strategically:
          </p>
          <ul>
            <li><strong>High-volume tasks:</strong> OpenAI GPT-5 mini for cost efficiency</li>
            <li><strong>Complex reasoning:</strong> Anthropic Claude Sonnet for quality</li>
            <li><strong>Safety-critical:</strong> Anthropic Claude for ethical applications</li>
            <li><strong>Multimodal needs:</strong> OpenAI GPT-5 series for vision/audio</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}