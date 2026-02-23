import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Anthropic Pricing Calculator | Claude AI Cost Estimator 2026",
  description: "Calculate Anthropic Claude API costs with our free pricing calculator. Compare Claude Opus 4.6, Sonnet 4.6, and Haiku pricing. Get accurate cost estimates.",
  keywords: "Anthropic pricing, Claude pricing calculator, Claude Opus cost, Claude Sonnet pricing, Anthropic API costs",
};

export default function AnthropicPricingCalculatorPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Anthropic Pricing Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Calculate costs for Anthropic's Claude model family including Opus 4.6, Sonnet 4.6, and Haiku models
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-purple-900 mb-2">Claude Model Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Claude Opus 4.6:</strong> $5.00/1M input, $25.00/1M output
              </div>
              <div>
                <strong>Claude Sonnet 4.6:</strong> $3.00/1M input, $15.00/1M output
              </div>
              <div>
                <strong>Claude Haiku 4.5:</strong> $1.00/1M input, $5.00/1M output
              </div>
              <div>
                <strong>Claude Haiku 3.5:</strong> $0.80/1M input, $4.00/1M output
              </div>
            </div>
          </div>
        </div>
        
        <Estimator defaultProvider="anthropic" />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>Anthropic Claude Pricing Guide</h2>
          <p>
            Anthropic's Claude models are renowned for their safety, reasoning capabilities, and Constitutional AI approach. 
            This calculator helps you estimate costs for Claude models based on your specific usage requirements.
          </p>
          
          <h3>Claude Model Comparison</h3>
          <ul>
            <li><strong>Claude Opus 4.6:</strong> Maximum intelligence and reasoning for the most demanding tasks</li>
            <li><strong>Claude Sonnet 4.6:</strong> Balanced performance and cost for most professional applications</li>
            <li><strong>Claude Haiku 4.5:</strong> Fast and cost-effective for high-volume tasks</li>
            <li><strong>Claude Haiku 3.5:</strong> Budget-friendly option for simple applications</li>
          </ul>
          
          <h3>Why Choose Claude?</h3>
          <ul>
            <li>Superior safety and ethical guidelines with Constitutional AI</li>
            <li>Excellent reasoning and analytical capabilities</li>
            <li>200K context window for long document processing</li>
            <li>Transparent about limitations and potential biases</li>
            <li>Strong performance on research and academic tasks</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}