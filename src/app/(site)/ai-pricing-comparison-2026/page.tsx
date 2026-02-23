import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "AI Pricing Comparison 2026 | Complete AI Model Cost Analysis",
  description: "Comprehensive AI pricing comparison for 2026. Compare costs across OpenAI, Anthropic, Google, xAI, Meta, and more. Updated pricing for 45+ AI models.",
  keywords: "AI pricing comparison 2026, AI model costs, OpenAI vs Anthropic pricing, GPT-5 vs Claude pricing, AI cost analysis",
};

export default function AIPricingComparison2026Page() {
  return (
    <Container>
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Pricing Comparison 2026
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Complete cost analysis of 45+ AI models across 9 major providers
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Budget Tier Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Model</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Input Cost</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Output Cost</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Context</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">GPT-5 nano</td>
                  <td className="px-4 py-3 text-sm text-green-600">$0.05</td>
                  <td className="px-4 py-3 text-sm text-green-600">$0.40</td>
                  <td className="px-4 py-3 text-sm text-gray-600">64K</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Ultra-high volume</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Gemini 2.0 Flash</td>
                  <td className="px-4 py-3 text-sm text-green-600">$0.10</td>
                  <td className="px-4 py-3 text-sm text-green-600">$0.40</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1M</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Multimodal agents</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">GPT-5 mini</td>
                  <td className="px-4 py-3 text-sm text-green-600">$0.25</td>
                  <td className="px-4 py-3 text-sm text-green-600">$2.00</td>
                  <td className="px-4 py-3 text-sm text-gray-600">128K</td>
                  <td className="px-4 py-3 text-sm text-gray-600">High-volume tasks</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Gemini 2.5 Flash</td>
                  <td className="px-4 py-3 text-sm text-blue-600">$0.30</td>
                  <td className="px-4 py-3 text-sm text-blue-600">$2.50</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1M</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Reasoning + context</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Claude Haiku 4.5</td>
                  <td className="px-4 py-3 text-sm text-blue-600">$1.00</td>
                  <td className="px-4 py-3 text-sm text-blue-600">$5.00</td>
                  <td className="px-4 py-3 text-sm text-gray-600">200K</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Safety + quality</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Tier Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Model</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Input Cost</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Output Cost</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Context</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">GPT-5</td>
                  <td className="px-4 py-3 text-sm text-purple-600">$1.25</td>
                  <td className="px-4 py-3 text-sm text-purple-600">$10.00</td>
                  <td className="px-4 py-3 text-sm text-gray-600">200K</td>
                  <td className="px-4 py-3 text-sm text-gray-600">General flagship</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Gemini 2.5 Pro</td>
                  <td className="px-4 py-3 text-sm text-purple-600">$1.25</td>
                  <td className="px-4 py-3 text-sm text-purple-600">$10.00</td>
                  <td className="px-4 py-3 text-sm text-gray-600">2M</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Large documents</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">GPT-5.2</td>
                  <td className="px-4 py-3 text-sm text-purple-600">$1.75</td>
                  <td className="px-4 py-3 text-sm text-purple-600">$14.00</td>
                  <td className="px-4 py-3 text-sm text-gray-600">200K</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Maximum quality</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Claude Sonnet 4.6</td>
                  <td className="px-4 py-3 text-sm text-red-600">$3.00</td>
                  <td className="px-4 py-3 text-sm text-red-600">$15.00</td>
                  <td className="px-4 py-3 text-sm text-gray-600">200K</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Reasoning + safety</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Claude Opus 4.6</td>
                  <td className="px-4 py-3 text-sm text-red-600">$5.00</td>
                  <td className="px-4 py-3 text-sm text-red-600">$25.00</td>
                  <td className="px-4 py-3 text-sm text-gray-600">200K</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Ultimate quality</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <Estimator />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>2026 AI Pricing Trends</h2>
          <p>
            The AI pricing landscape in 2026 has become more competitive and diverse, with significant 
            developments across all major providers:
          </p>
          
          <h3>Key Pricing Trends</h3>
          <ul>
            <li><strong>Ultra-Budget Options:</strong> New models under $0.25/1M input tokens enable high-volume applications</li>
            <li><strong>Context Window Competition:</strong> Google leads with 2M token windows at competitive pricing</li>
            <li><strong>Specialized Models:</strong> Coding, reasoning, and search-enhanced models at various price points</li>
            <li><strong>Open Source Access:</strong> Together AI and others provide hosted access to open source models</li>
          </ul>
          
          <h3>Provider Positioning</h3>
          <ul>
            <li><strong>OpenAI:</strong> Comprehensive GPT-5 family from ultra-budget to flagship</li>
            <li><strong>Anthropic:</strong> Premium pricing for superior safety and reasoning</li>
            <li><strong>Google:</strong> Competitive pricing with massive context windows</li>
            <li><strong>xAI:</strong> Unique reasoning vs non-reasoning model variants</li>
            <li><strong>Meta:</strong> Open source models with hosted options</li>
          </ul>
          
          <h3>Cost Optimization Strategies</h3>
          <ul>
            <li>Use tiered model architecture: budget models for simple tasks, premium for complex ones</li>
            <li>Leverage large context windows to reduce API calls</li>
            <li>Consider open source models for cost-sensitive applications</li>
            <li>Optimize prompts and use caching where available</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}