import { Metadata } from "next";
import Estimator from "@/components/estimator/Estimator";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "GPT-5 Pricing Calculator | OpenAI GPT-5 Cost Estimator 2026",
  description: "Calculate GPT-5 API costs with our free pricing calculator. Compare GPT-5.2, GPT-5.1, GPT-5, mini, and nano pricing. Get accurate cost estimates for your AI projects.",
  keywords: "GPT-5 pricing, GPT-5 calculator, OpenAI GPT-5 cost, GPT-5.2 pricing, GPT-5 mini cost, AI pricing calculator",
};

export default function GPT5PricingCalculatorPage() {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GPT-5 Pricing Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Calculate costs for OpenAI's GPT-5 model family including GPT-5.2, GPT-5.1, GPT-5, mini, and nano
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">GPT-5 Series Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>GPT-5.2:</strong> $1.75/1M input, $14.00/1M output
              </div>
              <div>
                <strong>GPT-5.1:</strong> $1.25/1M input, $10.00/1M output
              </div>
              <div>
                <strong>GPT-5:</strong> $1.25/1M input, $10.00/1M output
              </div>
              <div>
                <strong>GPT-5 mini:</strong> $0.25/1M input, $2.00/1M output
              </div>
              <div>
                <strong>GPT-5 nano:</strong> $0.05/1M input, $0.40/1M output
              </div>
            </div>
          </div>
        </div>
        
        <Estimator defaultProvider="openai" />
        
        <div className="mt-12 prose prose-lg max-w-none">
          <h2>GPT-5 Pricing Guide</h2>
          <p>
            OpenAI's GPT-5 series represents a major advancement in AI capabilities with five distinct models 
            optimized for different use cases and budgets. This calculator helps you estimate costs for any 
            GPT-5 model based on your specific usage patterns.
          </p>
          
          <h3>Which GPT-5 Model Should You Choose?</h3>
          <ul>
            <li><strong>GPT-5.2:</strong> Flagship model with the best performance for mission-critical applications</li>
            <li><strong>GPT-5.1:</strong> Balanced premium option offering excellent performance at lower cost</li>
            <li><strong>GPT-5:</strong> General-purpose flagship model for most professional applications</li>
            <li><strong>GPT-5 mini:</strong> Cost-effective option for high-volume applications and chatbots</li>
            <li><strong>GPT-5 nano:</strong> Ultra-efficient model for edge computing and cost-sensitive deployments</li>
          </ul>
          
          <h3>Cost Optimization Tips</h3>
          <ul>
            <li>Start with GPT-5 mini for most applications and upgrade only if needed</li>
            <li>Use GPT-5 nano for simple tasks and high-volume processing</li>
            <li>Consider GPT-5.1 or GPT-5.2 for complex reasoning and premium applications</li>
            <li>Optimize prompts to reduce token usage across all models</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}